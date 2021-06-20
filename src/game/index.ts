import { config } from '../config';
import { BasePlayer } from '../players';
import { BasePrinter } from '../printers';
import { Disk } from '../types';

export class Game {
  private board: Disk[][] = [];
  private maxRows = config.maxRows;
  private maxColumns = config.maxColumns;
  private turn = Math.random() > 0.5 ? Disk.Red : Disk.Yellow;
  private gameOver = false;
  private winner: BasePlayer | null = null;

  private get playerTurn() {
    return this.turn === Disk.Red
      ? this.playerRed.name
      : this.playerYellow.name;
  }

  /**
   * Lists all available columns.
   */
  private get listAvailableColumns(): number[] {
    return this.board.reduce(
      (availableColumns, _column, columnIndex) =>
        this.isValidMove(columnIndex)
          ? [...availableColumns, columnIndex]
          : availableColumns,
      []
    );
  }

  constructor(
    private playerRed: BasePlayer,
    private playerYellow: BasePlayer,
    private printer: BasePrinter
  ) {}

  /**
   * Starts the game.
   */
  public async start(): Promise<void> {
    // Setup the board.
    this.resetBoard();

    // Print player names.
    this.printer.printStartScreen(this.playerRed.name, this.playerYellow.name);

    // Take turns until the game is over.
    while (!this.gameOver) {
      await this.doTurn();
    }

    // Print out the winner.
    if (this.winner) {
      this.printer.printWinner(this.winner.name, this.turn);
    }
  }

  private async doTurn(): Promise<void> {
    // Print out turn.
    this.printer.printCurrentTurn(this.playerTurn, this.turn);

    // Print available columns.
    this.printer.printAvailableColumns(this.listAvailableColumns);

    // Create a column variable.
    let column: number;

    // Make a move until it is valid.
    do {
      // Move depending on the turn.
      switch (this.turn) {
        case Disk.Red:
          column = await this.playerRed.move();
          break;
        case Disk.Yellow:
          column = await this.playerYellow.move();
          break;
        default:
          column = -1;
          break;
      }
    } while (!this.isValidMove(column));

    // Update the board.
    this.throwInDisk(column);

    // Display the board.
    this.printer.printBoard(this.board);

    // Check if there is a winner.

    // If there is a winner, finish the game.
    if (this.winner) {
      this.gameOver = true;
    } else {
      // Change turn.
      this.turn = this.turn === Disk.Red ? Disk.Yellow : Disk.Red;
    }
  }

  /**
   * Updates the board.
   */
  private throwInDisk(column: number): void {
    // Find the index of the row to update.
    const row = this.board[column].findIndex(row => row === Disk.Empty);

    // Log the players choice.
    console.log(`${this.playerTurn} picks column number ${column}`);

    // Update the row.
    this.board[column][row] = this.turn;
  }

  private checkWinner(): void {}

  /**
   * Checks if the chosen column is valid.
   */
  private isValidMove(column: number): boolean {
    // Check the if the number is in the column range.
    if (column < 0 || column > this.maxColumns) {
      return false;
    } else {
      // Check if the move is valid based on the board.
      const isValid = this.board[column].some(row => row === Disk.Empty);

      if (!isValid) {
        console.log(`Column number ${column} is not available`);
      }

      return isValid;
    }
  }

  /**
   * Resets the board.
   */
  private resetBoard(): void {
    for (let column = 0; column < this.maxColumns; column++) {
      // Initialize each column.
      this.board[column] = [];

      for (let row = 0; row < this.maxRows; row++) {
        // Set every field to an empty disk.
        this.board[column][row] = Disk.Empty;
      }
    }
  }
}
