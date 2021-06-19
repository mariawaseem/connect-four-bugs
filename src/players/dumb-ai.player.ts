import { config } from '../config';
import { PlayerType } from '../types';
import { BasePlayer } from '.';

export class DumbAIPlayer extends BasePlayer {
  readonly type = PlayerType.AI;
  readonly name = 'Dumb AI';

  public async move(): Promise<number> {
    // Pick a random column.
    const column = Math.floor(Math.random() * config.maxColumns);
    return new Promise((resolve, _reject) => resolve(column));
  }
}
