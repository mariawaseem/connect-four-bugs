import chalk from 'chalk';
import { Printer } from './printer';
import { transpose } from '../utils';
import { Disk } from '../types';

export class ColorPrinter extends Printer {
  /**
   * Prints a start screen.
   */
  printStartScreen(playerRed: string, playerYellow: string): void {
    // Clear the console.
    console.clear();

    // Print welcome message.
    const gameName = `${chalk.yellow('Connect')} ${chalk.red(4)}`;
    console.log(`\nWelcome to ${gameName}`);
    console.log('Connect four disks to win!\n');

    // Print player names.
    console.log(
      `${this.colorName(playerRed, Disk.Red)} vs ${this.colorName(
        playerYellow,
        Disk.Yellow
      )}\n`
    );
  }

  /**
   * Prints current state of the game board.
   */
  printBoard(board: Disk[][]): void {
    // Print a new line.
    console.log();

    // Transpose and reverse the board to make it graphically readable.
    const transposedAndReversedBoard = transpose(board).reverse();

    // Print a board.
    transposedAndReversedBoard.forEach(row => {
      // Print an offset from the left.
      process.stdout.write('    ');

      // Iterate over each row and color every disk
      row.forEach(disk => {
        const coloredDisk =
          disk === Disk.Red
            ? chalk.red(disk)
            : disk === Disk.Yellow
            ? chalk.yellow(disk)
            : chalk.dim(disk);
        // Print a colored disk.
        process.stdout.write(` ${coloredDisk}`);
      });

      // Print a new line.
      console.log();
    });

    // Print a new line.
    console.log();
  }

  /**
   * Prints current player's turn.
   */
  printCurrentTurn(playerName: string, disk: Disk): void {
    console.log(`${this.colorName(playerName, disk)}'s turn`);
  }

  /**
   * Prints available columns.
   */
  printAvailableColumns(columns: number[]): void {
    console.log(`Available columns: ${columns.join(', ')}`);
  }

  /**
   * Prints columns picked by a player.
   */
  printPickedColumn(playerName: string, disk: Disk, column: number): void {
    console.log(
      `${this.colorName(
        playerName,
        disk
      )} inserts the disk into column ${column}`
    );
  }

  /**
   * Prints the winner.
   */
  printWinner(playerName: string, disk: Disk) {
    console.log(
      `Congratulations! ${this.colorName(playerName, disk)} is the winner!\n`
    );
  }

  /**
   * Applies a color to the player name string based on the provided disk.
   */
  private colorName(playerName: string, disk: Disk): string {
    return disk === Disk.Red ? chalk.red(playerName) : chalk.yellow(playerName);
  }
}
