import { config } from '../src/config';
import { Disk } from '../src/types';
import { game } from './jest.setup';

/**
 * Test everything related to the game board.
 */
describe('when creates a new, empty board', () => {
  // Create a new board.
  game._board = game._createBoard();

  // Flatten the board array and check if empty.
  const isEmpty = game._board.flat().every(disk => disk === Disk.Empty);
  expect(isEmpty).toBe(true);

  it('board is 7x6', () => {
    // Test if the column dimensions are correct.
    expect(game._board.length).toBe(config.columns);
    expect(game._board[0].length).toBe(config.rows);
  });

  describe('and when a board has 4 red disks in a row horizontally', () => {
    // Populate the board with 4 reds in a row.
    for (let i = 0; i < 4; i++) {
      game._board[i][0] = Disk.Red;
    }

    it('detects a winner', () => {
      const winner = game._checkWinner(game._board);

      expect(winner).toEqual(Disk.Red);
    });
  });

  describe('and when a board has 4 red disks in a row vertically', () => {
    // Populate the board with 4 reds in a row.
    for (let i = 0; i < 4; i++) {
      game._board[0][i] = Disk.Red;
    }

    it('detects a winner', () => {
      const winner = game._checkWinner(game._board);

      expect(winner).toEqual(Disk.Red);
    });
  });

  describe('and when a board has 4 red disks in a row diagonally', () => {
    // Populate the board with 4 reds in a row.
    for (let i = 0; i < 4; i++) {
      game._board[i][i] = Disk.Red;
    }

    it('detects a winner', () => {
      const winner = game._checkWinner(game._board);

      expect(winner).toEqual(Disk.Red);
    });
  });

  let pickedColumn = 3;
  describe(`and when a red disk is thrown into column ${pickedColumn}`, () => {
    game._insertDisk(pickedColumn);

    it('correctly updates the board', () => {
      expect(game._board[pickedColumn][0]).toEqual(game._turn);
    });
  });

  let columnsNotAvailable = [1, 5];
  describe(`and when columns ${columnsNotAvailable} are not available`, () => {
    let updatedBoard = game._board.map((column, columnIndex) =>
      column.map(row =>
        columnsNotAvailable.includes(columnIndex) ? Disk.Red : row
      )
    );

    it('correctly lists available columns', () => {
      expect(game._listAvailableColumns(updatedBoard).length).toEqual(
        config.columns - columnsNotAvailable.length
      );

      const allColumns = Array(config.columns)
        .fill(null)
        .map((column, i) => i);
      expect(game._listAvailableColumns(updatedBoard)).toEqual(
        allColumns.filter(column => !columnsNotAvailable.includes(column))
      );
    });
  });
});
