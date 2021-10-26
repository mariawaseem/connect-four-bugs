import { Player } from './player';
import { Disk, PlayerType } from '../types';
import { config } from '../config';

export class NotSoDumbAIPlayer extends Player {
  readonly type = PlayerType.AI;
  readonly name = 'Not-so-dumb AI';

  // Properties registering previous moves.
  private moves: number[] = [];
  private lastColumn = -1;
  private lastRow = -1;

  /**
   * Makes a move based on available columns.
   */
  async move(board: Disk[][], availableColumns: number[]): Promise<number> {
    // If the board is empty, reset registered moves.
    const emptyBoard =
      board.flat(2).filter(disk => disk === Disk.Empty).length >=
      config.columns * config.rows - 1;

    // Reset registered moves.
    if (emptyBoard) {
      this.moves = [];
      this.lastColumn = -1;
      this.lastRow = -1;
    }

    // Generate a random column index.
    const randomIndex = Math.floor(Math.random() * availableColumns.length);

    // Define `move` variable.
    let move: number;

    // Scenarios:
    // If this is the first move or the last chosen column is not available.
    if (
      this.moves.length === 0 ||
      !availableColumns.includes(this.lastColumn)
    ) {
      // Pick a random column.
      move = availableColumns[randomIndex];
    }
    // If the opponent has chosen a different column.
    else if (board[this.lastColumn][this.lastRow + 1] === Disk.Empty) {
      // Pick the last picked column.
      move = this.lastColumn;
    }
    // Handle every other scenario.
    else {
      // Pick a random column.
      move = availableColumns[randomIndex];
    }

    // Register the move.
    this.moves.push(move);
    this.lastColumn = move;
    this.lastRow = board[move].indexOf(Disk.Empty);

    return new Promise((resolve, _reject) =>
      setTimeout(() => resolve(move), config.aiMoveDelay)
    );
  }
}
