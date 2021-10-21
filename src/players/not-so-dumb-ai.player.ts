import { Player } from './player';
import { Disk, PlayerType } from '../types';
import { config } from '../config';

export class NotSoDumbAIPlayer extends Player {
  readonly type = PlayerType.AI;
  readonly name = 'Not-so-dumb AI';
  private moves: number[] = [];

  /**
   * Makes a move based on available columns.
   */
  async move(board: Disk[][], availableColumns: number[]): Promise<number> {
    // Generate a random column index.
    const randomIndex = Math.floor(Math.random() * availableColumns.length);

    // Grab the last move.
    const lastMove = this.moves[this.moves.length - 1];

    // Define `move` variable.
    let move: number;

    // Scenarios:
    // If this is the first move or the last chosen column is not available.
    if (this.moves.length === 0 || !availableColumns.includes(lastMove)) {
      // Pick a random column.
      move = availableColumns[randomIndex];
    }
    // If there is at least 4 empty slots
    else if (board[lastMove].filter(disk => disk === Disk.Empty).length > 3) {
      // Pick the last picked column.
      move = lastMove;
    }
    // Handle every other scenario.
    else {
      // Pick a random column.
      move = availableColumns[randomIndex];
    }

    // Register the move.
    this.moves.push(move);

    return new Promise((resolve, _reject) =>
      setTimeout(() => resolve(move), config.aiMoveDelay)
    );
  }
}
