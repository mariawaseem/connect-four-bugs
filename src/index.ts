import { Game } from './game';
import { DumbAIPlayer, HumanPlayer } from './players';
import { NotSoDumbAIPlayer } from './players/not-so-dumb-ai.player';
import { ColorPrinter, BasicPrinter } from './printers';
import { chooseGameMode } from './utils';

async function main(): Promise<void> {
  // Prompt for the game mode.
  const mode = await chooseGameMode();

  // Create a human player.
  const humanPlayer = new HumanPlayer();

  // Create an AI player. DumbAI Player is really dumb.
  const dumbAiPlayer = new DumbAIPlayer();
  const notSoDumbAIPlayer = new NotSoDumbAIPlayer();

  // Create a printer. Use the one you like (colorPrinter is much nicer).
  const basicPrinter = new BasicPrinter();
  const colorPrinter = new ColorPrinter();

  // Create a game, passing players, game mode, and a printer.
  const game = new Game({
    humanPlayer,
    aiPlayer: notSoDumbAIPlayer,
    mode,
    printer: colorPrinter,
  });

  // Start the game.
  game.start();
}

main();
