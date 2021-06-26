import { DistinctQuestion } from 'inquirer';
import { Mode } from '../types';

/**
 * Config class that contains all the game settings.
 */
class Config {
  /**
   * Board size.
   */
  readonly columns = 7;
  readonly rows = 6;

  /**
   * CLI questions.
   */

  readonly playAgainQuestion: DistinctQuestion = {
    name: 'playAgain',
    type: 'list',
    choices: ['yes', 'no'],
    message: 'Play again?',
  };

  readonly gameModeQuestion: DistinctQuestion = {
    name: 'mode',
    type: 'list',
    // Build the choice array and filter just the mode descriptions.
    choices: Object.keys(Mode).filter(key => key.length > 1),
    message: 'Game mode',
  };

  public playerNameQuestion(playerNumber: number): DistinctQuestion {
    return {
      name: 'playerName',
      type: 'input',
      message: 'What is your name?',
      default: `Player ${playerNumber}`,
    };
  }

  public columnNumberQuestion(availableColumns: number[]): DistinctQuestion {
    // Build an array of string for the answer choices.
    const choices = availableColumns.map(column => `${column}`);

    return {
      name: 'column',
      type: 'list',
      choices,
      message: 'Insert disk into column',
    };
  }
}

export const config = new Config();
