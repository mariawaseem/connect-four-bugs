import { prompt } from 'inquirer';
import { BasePlayer } from './';
import { PlayerType } from '../types';
import { config } from '../config';
import { IColumnAnswer } from '../types';

export class HumanPlayer extends BasePlayer {
  readonly type = PlayerType.Human;

  constructor(readonly name: string) {
    super();
  }

  public async move(): Promise<number> {
    // Prompt for a column number.
    const { column } = await prompt<IColumnAnswer>(config.columnNumberQuestion);

    return +column;
  }
}
