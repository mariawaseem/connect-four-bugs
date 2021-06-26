import { prompt } from 'inquirer';
import { config } from '../config';
import { IPlayAgainAnswer, PlayAgain } from '../types';

/**
 * Prompts if player wants to play again.
 */
export async function askPlayAgain(): Promise<boolean> {
  const { playAgain } = await prompt<IPlayAgainAnswer>(
    config.playAgainQuestion
  );

  return playAgain === PlayAgain.Yes;
}
