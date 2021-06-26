import { DistinctQuestion } from 'inquirer';
import { Disk, Mode, PlayAgain } from '../types';

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
  readonly gameModeQuestion: DistinctQuestion = {
    name: 'mode',
    type: 'list',
    // Build the choice array and filter just the mode descriptions.
    choices: Object.keys(Mode).filter(key => key.length > 1),
    message: 'Game mode',
  };

  readonly playAgainQuestion: DistinctQuestion = {
    name: 'playAgain',
    type: 'list',
    choices: Object.values(PlayAgain),
    message: 'Play again?',
  };

  public playerNameQuestion(playerNumber: Disk): DistinctQuestion {
    return {
      name: 'playerName',
      type: 'input',
      message: 'What is your name?',
      default: `Player ${playerNumber}`,
    };
  }

  public columnNumberQuestion(availableColumns: number[]): DistinctQuestion {
    return {
      name: 'column',
      type: 'list',
      // Build an array of string for the answer choices.
      choices: availableColumns.map(column => `${column}`),
      message: 'Insert disk into column',
    };
  }
}

export const config = new Config();
