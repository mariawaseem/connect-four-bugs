import { DistinctQuestion } from 'inquirer';

class Config {
  /**
   * Board size.
   */
  readonly maxColumns = 7;
  readonly maxRows = 6;

  /**
   * CLI questions.
   */
  readonly playerNameQuestion: DistinctQuestion = {
    name: 'playerName',
    type: 'input',
    message: 'What is your name?',
  };

  readonly columnNumberQuestion: DistinctQuestion = {
    name: 'column',
    type: 'list',
    choices: Array(this.maxColumns)
      .fill(null)
      .map((_column, columnIndex) => columnIndex.toString()),
    message: 'Which column would you like to throw your disk into?',
  };
}

export const config = new Config();
