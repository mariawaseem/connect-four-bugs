import { PlayerType } from '../types';
import { BasePlayer } from '.';

export class DumbAIPlayer extends BasePlayer {
  readonly type = PlayerType.AI;
  readonly name = 'Dumb AI';

  public async move(availableColumns: number[]): Promise<number> {
    // Pick a random column.
    const randomIndex = Math.floor(Math.random() * availableColumns.length);
    const column = availableColumns[randomIndex];

    return new Promise((resolve, _reject) => resolve(column));
  }
}
