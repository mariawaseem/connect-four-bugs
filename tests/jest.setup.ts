import { Game } from '../src/game';
import { DumbAIPlayer, HumanPlayer } from '../src/players';
import { ColorPrinter } from '../src/printers';
import { Disk, Mode } from '../src/types';

/**
 * TestGame class that exposes all the necessary
 * properties and methods required for testing.
 */
class TestGame extends Game {
  public _board: Disk[][] = this.board;
  public _turn: Disk = this.turn;

  public _availableColumns(board: Disk[][]): number[] {
    // console.log(this.board);
    // console.log(this._board);
    return this.availableColumns(board);
  }

  public _resetBoard(): void {
    this.resetBoard();
  }

  public _checkWinner(board: Disk[][]): Disk {
    return this.checkWinner(board);
  }

  public _throwInDisk(column: number): void {
    this.throwInDisk(column);
  }
}

// Create and export a new test game.
const humanPlayer = new HumanPlayer();
const aiPlayer = new DumbAIPlayer();
const colorPrinter = new ColorPrinter();
export const game = new TestGame(
  humanPlayer,
  aiPlayer,
  Mode.OnePlayer,
  colorPrinter
);

export function copyBoard(board: Disk[][]): Disk[][] {
  return board.map(column => column.map(row => row));
}
