import chalk from 'chalk';
import { BasePrinter } from './';
import { Disk } from '../types';
import { transpose } from '../utils';

export class ColorPrinter extends BasePrinter {
  public printStartScreen(playerRed: string, playerYellow: string): void {
    // Clear the console.
    // console.clear();

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

  public printBoard(board: Disk[][]): void {
    // Print a new line.
    console.log('\n');
    // // Print a message about the game state.
    // console.log('Current state of the game:\n');

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
        // Print a colored
        process.stdout.write(` ${coloredDisk}`);
      });

      // Print a new line.
      console.log();
    });

    // Print a new line.
    console.log();
  }

  public printCurrentTurn(playerName: string, disk: Disk): void {
    console.log(`${this.colorName(playerName, disk)}'s turn`);
  }

  public printAvailableColumns(columns: number[]): void {
    console.log(`Available columns: ${columns.join(', ')}`);
  }

  public printPickedColumn(
    playerName: string,
    disk: Disk,
    column: number
  ): void {
    // Log the players choice.
    console.log(
      `${this.colorName(playerName, disk)} picks column number ${column}`
    );
  }

  public printWinner(playerName: string, disk: Disk) {
    console.log(
      `Congratulations! ${this.colorName(playerName, disk)} is a winner!`
    );
  }

  private colorName(playerName: string, disk: Disk): string {
    return disk === Disk.Red ? chalk.red(playerName) : chalk.yellow(playerName);
  }
}
