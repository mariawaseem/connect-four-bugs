import { prompt } from 'inquirer';
import { config } from '../config';
import { IGameModeAnswer, Mode } from '../types';

/**
 * Prompts for a player name.
 */
export async function chooseGameMode(): Promise<Mode> {
  // Clear the console.
  console.clear();

  // Prompt for the name and destructure the data.
  const { mode } = await prompt<IGameModeAnswer>(config.gameModeQuestion);

  return +Mode[mode as any];
}
