import { Disk } from '../types';

/**
 * Base class for every Printer to extend.
 */
export abstract class BasePrinter {
  abstract printStartScreen(playerRed: string, playerYellow: string): void;
  abstract printBoard(board: Disk[][]): void;
  abstract printCurrentTurn(playerName: string, disk: Disk): void;
  abstract printAvailableColumns(columns: number[]): void;
  abstract printPickedColumn(
    playerName: string,
    disk: Disk,
    column: number
  ): void;
  abstract printWinner(playerName: string, disk: Disk): void;
}
