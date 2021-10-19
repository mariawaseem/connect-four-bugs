import { Player } from './player';
import { PlayerType } from '../types';
import { config } from '../config';

export class DumbAIPlayer extends Player {
  readonly type = PlayerType.AI;
  readonly name = 'Dumb AI';

  /**
   * Makes a move based on available columns.
   */
  async move(availableColumns: number[]): Promise<number> {
    // Pick a random column.
    const randomIndex = Math.floor(Math.random() * availableColumns.length);
    const column = availableColumns[randomIndex];

    return new Promise((resolve, _reject) =>
      setTimeout(() => resolve(column), config.aiMoveDelay)
    );
  }
}
