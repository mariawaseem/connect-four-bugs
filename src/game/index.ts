import { Player } from '../players';
import { Printer } from '../printers';
import { askPlayAgain, getPlayerName } from '../utils';
import { config } from '../config';
import { Disk, Mode, PlayerType } from '../types';

/**
 * Main Game class that holds the core logic of the game.
 */
export class Game {
  /**
   * Game board.
   */
  protected board: Disk[][] = this.createBoard();

  /**
   * Current disk's turn. Initialized randomly as `Disk.Red` or `Disk.Yellow`.
   */
  protected turn: Disk.Red | Disk.Yellow =
    Math.random() > 0.5 ? Disk.Red : Disk.Yellow;

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
  private get currentPlayer(): Player {
    return this.turn === Disk.Red ? this.playerRed : this.playerYellow;
  }

  constructor(
    humanPlayer: Player,
    aiPlayer: Player,
    mode: Mode,
    private printer: Printer
  ) {
    // Initialize the red and yellow players based on the game mode.
    switch (mode) {
      case Mode.TwoPlayers:
        this.playerRed = Object.create(humanPlayer);
        this.playerYellow = Object.create(humanPlayer);
        break;
      case Mode.OnlyAI:
        this.playerRed = Object.create(aiPlayer);
        this.playerYellow = Object.create(aiPlayer);
        break;
      default:
        this.playerRed = Object.create(humanPlayer);
        this.playerYellow = Object.create(aiPlayer);
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

    // Define the `playAgain` variable.
    let playAgain: boolean;

    // Repeat the game until the player doesn't want to play again.
    do {
      // Take turns until the winner is found.
      while (!this.winner) {
        await this.doTurn();
      }

      // Print out the winner.
      this.printer.printWinner(this.winner.name, this.turn);

      // Ask if the player wants to play again.
      playAgain = await askPlayAgain();

      if (playAgain) {
        // Reset the game.
        this.resetGame();
      }
    } while (playAgain);
  }

  /**
   * Execute the turn.
   */
  private async doTurn(): Promise<void> {
    // Check available columns
    const availableColumns = this.listAvailableColumns(this.board);

    // Print out current turn and available columns.
    this.printer.printCurrentTurn(this.currentPlayer.name, this.turn);
    this.printer.printAvailableColumns(availableColumns);

    // Define a column variable.
    let pickedColumn: number;

    // Make a move until it is valid.
    do {
      // Move depending on the turn.
      pickedColumn = await this.currentPlayer.move(availableColumns);
    } while (!this.isValidMove(pickedColumn, this.board));

    // Print the players choice.
    this.printer.printPickedColumn(
      this.currentPlayer.name,
      this.turn,
      pickedColumn
    );

    // Update the board.
    this.insertDisk(pickedColumn);

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

  private resetGame(): void {
    // Clear the console.
    console.clear();

    // Create a new board.
    this.board = this.createBoard();

    // Remove the winner.
    this.winner = null;
  }

  /**
   * Lists all available columns.
   */
  protected listAvailableColumns(board: Disk[][]): number[] {
    return board.reduce(
      (availableColumns, _column, columnIndex) =>
        this.isValidMove(columnIndex, board)
          ? [...availableColumns, columnIndex]
          : availableColumns,
      [] as number[]
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
    if (column < 0 || column >= config.columns) {
      return false;
    } else {
      // Check if the move is valid based on the board.
      return board[column]?.some(row => row === Disk.Empty);
    }
  }

  /**
   * Prompts for player names.
   */
  private async promptPlayerNames(): Promise<void> {
    if (this.playerRed.type === PlayerType.Human) {
      this.playerRed.name = await getPlayerName(Disk.Red);
    }
    if (this.playerYellow.type === PlayerType.Human) {
      this.playerYellow.name = await getPlayerName(Disk.Yellow);
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
        // Check every disk in the board.
        const disk = board[c][r];

        // Don't check empty disks.
        if (disk === Disk.Empty) {
          continue;
        }

        if (
          r + 3 < height &&
          disk === board[c][r + 1] && // Look up.
          disk === board[c][r + 2] &&
          disk === board[c][r + 3]
        )
          return disk;
        if (c + 3 < width) {
          if (
            disk === board[c + 1][r] && // Look right.
            disk === board[c + 2][r] &&
            disk === board[c + 3][r]
          )
            return disk;
          if (
            r + 3 < height &&
            disk === board[c + 1][r + 1] && // Look up & right.
            disk === board[c + 2][r + 2] &&
            disk === board[c + 3][r + 3]
          )
            return disk;
          if (
            r - 3 >= 0 &&
            disk === board[c + 1][r - 1] && // Look up & left.
            disk === board[c + 2][r - 2] &&
            disk === board[c + 3][r - 3]
          )
            return disk;
        }
      }
    }

    // No winner found.
    return Disk.Empty;
  }
}
