import { prompt } from 'inquirer';
import { config } from '../config';
import { GameModeAnswer, Mode } from '../types';

/**
 * Prompts for a game mode.
 */
export async function chooseGameMode(): Promise<Mode> {
  // Clear the console.
  console.clear();

  const { mode } = await prompt<GameModeAnswer>(config.gameModeQuestion);

  return +Mode[mode as any];
}
