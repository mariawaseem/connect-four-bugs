import { Player } from '../players';
import { Printer } from '../printers';
import { getPlayerName } from '../utils';
import { config } from '../config';
import { Disk, Mode } from '../types';

/**
 * Main Game class that holds the core logic of the game.
 */
export class Game {
  /**
   * Game board.
   */
  protected board: Disk[][] = this.createBoard();

  /**
   * Current disk's turn. Initialized randomly `Disk.Red` or `Disk.Yellow`.
   */
  protected turn = Math.random() > 0.5 ? Disk.Red : Disk.Yellow;

  /**
   * Players. Initialized in the constructor based on the game mode.
   */
  private playerRed: Player;
  private playerYellow: Player;

  /**
   * Winner. Initially `null`.
   */
  private winner: Player | null = null;

  /**
   * Dynamically retrieves the current player based on the current turn.
   */
  private get currentPlayer() {
    return this.turn === Disk.Red ? this.playerRed : this.playerYellow;
  }

  constructor(
    private humanPlayer: Player,
    private aiPlayer: Player,
    private mode: Mode,
    private printer: Printer
  ) {
    // Initialize the red and yellow players based on the game mode.
    switch (this.mode) {
      case Mode.TwoPlayers:
        this.playerRed = Object.create(this.humanPlayer);
        this.playerYellow = Object.create(this.humanPlayer);
        break;
      case Mode.OnlyAI:
        this.playerRed = Object.create(this.aiPlayer);
        this.playerYellow = Object.create(this.aiPlayer);
        break;
      default:
        this.playerRed = Object.create(this.humanPlayer);
        this.playerYellow = Object.create(this.aiPlayer);
        break;
    }
  }

  /**
   * Starts the game.
   */
  public async start(): Promise<void> {
    // Prompt for player names.
    await this.promptPlayerNames();

    // Print a start screen.
    this.printer.printStartScreen(this.playerRed.name, this.playerYellow.name);

    // Take turns until the winner is found.
    while (!this.winner) {
      await this.doTurn();
    }

    // Print out the winner.
    this.printer.printWinner(this.winner.name, this.turn);
  }

  /**
   * Execute the turn.
   */
  private async doTurn(): Promise<void> {
    // Print out current turn and available columns.
    this.printer.printCurrentTurn(this.currentPlayer.name, this.turn);
    this.printer.printAvailableColumns(this.availableColumns(this.board));

    // Define a column variable.
    let column: number;

    // Make a move until it is valid.
    do {
      // Check available columns
      const availableColumns = this.availableColumns(this.board);

      // Move depending on the turn.
      column = await this.currentPlayer.move(availableColumns);
    } while (!this.isValidMove(column, this.board));

    // Print the players choice.
    this.printer.printPickedColumn(this.currentPlayer.name, this.turn, column);

    // Update the board.
    this.insertDisk(column);

    // Display the board.
    this.printer.printBoard(this.board);

    // Check if there is a winner.
    const winnerDisk = this.checkWinner(this.board);

    // If there is a winner...
    if (winnerDisk !== Disk.Empty) {
      // Set the winner property to the current player.
      this.winner = this.currentPlayer;
    } else {
      // Change turn.
      this.turn = this.turn === Disk.Red ? Disk.Yellow : Disk.Red;
    }
  }

  /**
   * Lists all available columns.
   */
  protected availableColumns(board: Disk[][]): number[] {
    return board.reduce(
      (availableColumns, _column, columnIndex) =>
        this.isValidMove(columnIndex, board)
          ? [...availableColumns, columnIndex]
          : availableColumns,
      []
    );
  }

  /**
   * Inserts the disk into the board.
   */
  protected insertDisk(column: number): void {
    // Find the index of the row to update.
    const row = this.board[column].findIndex(row => row === Disk.Empty);

    // Update the row.
    this.board[column][row] = this.turn;
  }

  /**
   * Checks if the chosen column is valid.
   */
  private isValidMove(column: number, board: Disk[][]): boolean {
    // Check the if the number is in the column range.
    if (column < 0 || column > config.columns) {
      return false;
    } else {
      // Check if the move is valid based on the board.
      return board[column].some(row => row === Disk.Empty);
    }
  }

  /**
   * Prompts for player names.
   */
  private async promptPlayerNames(): Promise<void> {
    switch (this.mode) {
      case Mode.OnePlayer:
        this.playerRed.name = await getPlayerName(Disk.Red);
        break;
      case Mode.TwoPlayers:
        this.playerRed.name = await getPlayerName(Disk.Red);
        this.playerYellow.name = await getPlayerName(Disk.Yellow);
        break;
      default:
        break;
    }
  }

  /**
   * Creates a new board.
   */
  protected createBoard(): Disk[][] {
    // Initialize a new board.
    let board: Disk[][] = [];

    for (let column = 0; column < config.columns; column++) {
      // Initialize each column as an empty array.
      board[column] = [];

      for (let row = 0; row < config.rows; row++) {
        // Populate every field with an empty disk.
        board[column][row] = Disk.Empty;
      }
    }

    return board;
  }

  /**
   * Checks if there is a winner.
   */
  protected checkWinner(board: Disk[][]): Disk {
    const width = board.length;
    const height = board[0].length;

    // Iterate over columns, left to right.
    for (let c = 0; c < width; c++) {
      // Iterate over rows, bottom to top.
      for (let r = 0; r < height; r++) {
        const player = board[c][r];

        // Don't check empty slots.
        if (player === Disk.Empty) {
          continue;
        }

        if (
          r + 3 < height &&
          player === board[c][r + 1] && // Look up.
          player === board[c][r + 2] &&
          player === board[c][r + 3]
        )
          return player;
        if (c + 3 < width) {
          if (
            player === board[c + 1][r] && // Look right.
            player === board[c + 2][r] &&
            player === board[c + 3][r]
          )
            return player;
          if (
            r + 3 < height &&
            player == board[c + 1][r + 1] && // Look up & right.
            player == board[c + 2][r + 2] &&
            player == board[c + 3][r + 3]
          )
            return player;
          if (
            r - 3 >= 0 &&
            player === board[c + 1][r - 1] && // Look up & left.
            player === board[c + 2][r - 2] &&
            player === board[c + 3][r - 3]
          )
            return player;
        }
      }
    }

    // No winner found.
    return Disk.Empty;
  }
}
