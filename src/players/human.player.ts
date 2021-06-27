import { prompt } from 'inquirer';
import { Player } from './player';
import { config } from '../config';
import { PlayerType, ColumnAnswer } from '../types';

export class HumanPlayer extends Player {
  readonly type = PlayerType.Human;
  readonly name = 'Human Player';

  /**
   * Makes a move based on available columns.
   */
  public async move(availableColumns: number[]): Promise<number> {
    // Prompt for a column number.
    const { column } = await prompt<ColumnAnswer>(
      config.columnNumberQuestion(availableColumns)
    );
    return column;
  }
}
