import { DistinctQuestion } from 'inquirer';
import { Mode } from '../types';

/**
 * Contains all the game settings.
 */
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

  readonly gameModeQuestion: DistinctQuestion = {
    name: 'mode',
    type: 'list',
    // Build the choice array and filter just the mode descriptions.
    choices: Object.keys(Mode).filter(key => key.length > 1),
    message: 'Game mode',
  };

  readonly columnNumberQuestion: DistinctQuestion = {
    name: 'column',
    type: 'list',
    message: 'Throw disk into column',
  };
}

export const config = new Config();
