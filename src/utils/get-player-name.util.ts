import { prompt } from 'inquirer';
import { config } from '../config';
import { Disk, IPlayerNameAnswer } from '../types';

export async function getPlayerName(disk: Disk): Promise<string> {
  // Clear the console.
  console.clear();

  // Prompt for the name and destructure the data.
  const { playerName } = await prompt<IPlayerNameAnswer>({
    ...config.playerNameQuestion,
    default: `Player ${disk}`,
  });

  return playerName;
}
