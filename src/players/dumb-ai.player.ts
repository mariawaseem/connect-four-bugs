import { Player } from './player';
import { Disk, PlayerType } from '../types';
import { config } from '../config';

export class DumbAIPlayer extends Player {
  readonly type = PlayerType.AI;
  readonly name = 'Dumb AI';

  /** Makes a move based on available columns */
  async move(_board: Disk[][], availableColumns: number[]): Promise<number> {
    // Pick a random column.
    const randomIndex = Math.floor(Math.random() * availableColumns.length);
    const column = availableColumns[randomIndex];

    return new Promise((resolve, _reject) =>
      setTimeout(() => resolve(column), config.aiMoveDelay)
    );
  }
}
