import { prompt } from 'inquirer';
import { Player } from './player';
import { config } from '../config';
import { PlayerType, ColumnAnswer, Disk } from '../types';

export class HumanPlayer extends Player {
  readonly type = PlayerType.Human;
  readonly name = 'Human Player';

  /** Makes a move based on available columns */
  async move(_board: Disk[][], availableColumns: number[]): Promise<number> {
    // Prompt for a column number.
    const { column } = await prompt<ColumnAnswer>(
      config.columnNumberQuestion(availableColumns)
    );
    return column;
  }
}
