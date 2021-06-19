import { Game } from './game';
import { DumbAIPlayer, HumanPlayer } from './players';
import { ColorPrinter, BasicPrinter } from './printers';
import { Disk } from './types';
import { getPlayerName } from './utils/get-player-name.util';

async function main(): Promise<void> {
  // Prompt for the player name.
  const playerName1 = await getPlayerName(Disk.Red);

  // Create players.
  const player1 = new HumanPlayer(playerName1);
  const player2 = new DumbAIPlayer();

  // Create a printer. Use the one you like (colorPrinter is much nicer).
  const basicPrinter = new BasicPrinter();
  const colorPrinter = new ColorPrinter();

  // Create a game.
  const game = new Game(player1, player2, basicPrinter);

  // Start the game.
  game.start();
}

main();
