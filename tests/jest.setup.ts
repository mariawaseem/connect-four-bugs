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

  set _board(value: Disk[][]) {
    this.board = value;
  }

  get _turn(): Disk {
    return this.turn;
  }

  // public _board: Disk[][] = this.board;
  // public _turn: Disk = this.turn;

  public _listAvailableColumns(board: Disk[][]): number[] {
    return this.listAvailableColumns(board);
  }

  public _createBoard(): Disk[][] {
    return this.createBoard();
  }

  public _checkWinner(board: Disk[][]): Disk {
    return this.checkWinner(board);
  }

  public _insertDisk(column: number): void {
    this.insertDisk(column);
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

// export function copyBoard(board: Disk[][]): Disk[][] {
//   return board.map(column => column.map(row => row));
// }
