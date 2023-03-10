import { Game } from '../src/game';
import { DumbAIPlayer, HumanPlayer } from '../src/players';
import { ColorPrinter } from '../src/printers';
import { Disk, Mode } from '../src/types';

/**
 * TestGame class that exposes all the necessary
 * properties and methods required for testing.
 */
class TestGame extends Game {
  get _board(): Disk[][] {
    return this.board;
  }

  set _board(board: Disk[][]) {
    this.board = board;
  }

  get _turn(): Disk {
    return this.turn;
  }

  _listAvailableColumns(board: Disk[][]): number[] {
    return this.listAvailableColumns(board);
  }

  _createBoard(): Disk[][] {
    return this.createBoard();
  }

  _checkWinner(board: Disk[][]): Disk {
    return this.checkWinner(board);
  }

  _insertDisk(column: number): void {
    this.insertDisk(column);
  }
}

// Create and export a new test game.
const humanPlayer = new HumanPlayer();
const aiPlayer = new DumbAIPlayer();
const colorPrinter = new ColorPrinter();

export const game = new TestGame({
  humanPlayer,
  aiPlayer,
  mode: Mode.OnePlayer,
  printer: colorPrinter,
});

/** Setup all the necessary actions before and after tests */
beforeEach(() => {
  // Reset the game board before every test.
  game._board = game._createBoard();
});
