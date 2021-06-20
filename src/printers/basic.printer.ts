import { BasePrinter } from './';
import { Disk } from '../types';

export class BasicPrinter extends BasePrinter {
  public printStartScreen(playerRed: string, playerYellow: string): void {
    console.log('Welcome to Connect4');
    console.log(`Player 1: ${playerRed} (${this.getDiskColor(Disk.Red)}) `);
    console.log(
      `Player 2: ${playerYellow} (${this.getDiskColor(Disk.Yellow)}) `
    );
  }

  public printBoard(board: Disk[][]): void {
    // Print a new line.
    console.log();

    // Print the board.
    console.log('Current board (horizontally - columns, vertically - rows):\n');
    console.dir(board);

    // Print a new line.
    console.log();
  }

  public printCurrentTurn(playerName: string, disk: Disk): void {
    console.log(`${playerName}' turn (${this.getDiskColor(disk)})`);
  }

  public printAvailableColumns(columns: number[]): void {
    console.log(`Available columns: ${columns}`);
  }

  public printPickedColumn(
    playerName: string,
    disk: Disk,
    column: number
  ): void {
    console.log(
      `${playerName} (${this.getDiskColor(disk)}) picks column number ${column}`
    );
  }

  public printWinner(playerName: string, disk: Disk) {
    console.log(`${playerName} (${this.getDiskColor(disk)}) is a winner!`);
  }

  private getDiskColor(disk: Disk): string {
    return disk === Disk.Red ? 'red' : 'yellow';
  }
}
