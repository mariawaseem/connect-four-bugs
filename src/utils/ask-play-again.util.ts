import { prompt } from 'inquirer';
import { config } from '../config';
import { PlayAgainAnswer, PlayAgain } from '../types';

/**
 * Prompts if player wants to play again.
 */
export async function askPlayAgain(): Promise<boolean> {
  const { playAgain } = await prompt<PlayAgainAnswer>(config.playAgainQuestion);

  return playAgain === PlayAgain.Yes;
}
