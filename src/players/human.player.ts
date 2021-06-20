import { prompt, QuestionCollection } from 'inquirer';
import { BasePlayer } from './';
import { PlayerType } from '../types';
import { config } from '../config';
import { IColumnAnswer } from '../types';

export class HumanPlayer extends BasePlayer {
  readonly type = PlayerType.Human;
  readonly name = 'Human Player';

  public async move(availableColumns: number[]): Promise<number> {
    // Prompt for a column number.
    const { column } = await prompt<IColumnAnswer>({
      ...config.columnNumberQuestion,
      choices: availableColumns.map(column => `${column}`),
    } as QuestionCollection<IColumnAnswer>);
    return column;
  }
}
