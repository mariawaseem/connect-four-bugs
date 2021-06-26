import { prompt } from 'inquirer';
import { config } from '../config';
import { IPlayAgainAnswer, Mode } from '../types';

/**
 * Prompts for a game mode.
 */
export async function askPlayAgain(): Promise<boolean> {
  const { playAgain } = await prompt<IPlayAgainAnswer>(
    config.playAgainQuestion
  );

  return playAgain === 'yes' ? true : false;
}
