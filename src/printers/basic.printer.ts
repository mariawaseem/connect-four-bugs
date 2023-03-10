import { Printer } from './printer';
import { Disk } from '../types';

export class BasicPrinter extends Printer {
  /** Prints a start screen */
  printStartScreen(playerRed: string, playerYellow: string): void {
    console.log('Welcome to Connect4');
    console.log(`Player 1: ${playerRed} (${this.getDiskColor(Disk.Red)}) `);
    console.log(`Player 2: ${playerYellow} (${this.getDiskColor(Disk.Yellow)}) `);
  }

  /** Prints current state of the game board */
  printBoard(board: Disk[][]): void {
    // Print a new line.
    console.log();

    // Print the board.
    console.log('Current board (horizontally - columns, vertically - rows):\n');
    console.dir(board);

    // Print a new line.
    console.log();
  }

  /** Prints current player's turn */
  printCurrentTurn(playerName: string, disk: Disk): void {
    console.log(`${playerName}' turn (${this.getDiskColor(disk)})`);
  }

  /** Prints available columns */
  printAvailableColumns(columns: number[]): void {
    console.log(`Available columns: ${columns}`);
  }

  /** Prints columns picked by a player */
  printPickedColumn(playerName: string, disk: Disk, column: number): void {
    console.log(
      `${playerName} (${this.getDiskColor(disk)}) picks column number ${column}`
    );
  }

  /** Prints the winner */
  printWinner(playerName: string, disk: Disk) {
    console.log(`${playerName} (${this.getDiskColor(disk)}) is the winner!`);
  }

  /** Prints 'red' or 'yellow' based on the provided disk */
  private getDiskColor(disk: Disk): string {
    return disk === Disk.Red ? 'red' : 'yellow';
  }
}
