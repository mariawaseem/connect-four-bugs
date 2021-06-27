import { prompt } from 'inquirer';
import { config } from '../config';
import { Disk, PlayerNameAnswer } from '../types';

/**
 * Prompts for a player name.
 */
export async function getPlayerName(disk: Disk): Promise<string> {
  const { playerName } = await prompt<PlayerNameAnswer>(
    config.playerNameQuestion(disk)
  );

  return playerName;
}
