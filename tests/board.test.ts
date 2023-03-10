import { config } from '../src/config';
import { Disk } from '../src/types';
import { game } from './jest.setup';

/** Test everything related to the game board */
describe('when creates a new, empty board', () => {
  it('board is 7x6', () => {
    // Test if the column dimensions are correct.
    expect(game._board.length).toBe(config.columns);
    expect(game._board[0].length).toBe(config.rows);
  });

  it('board is empty', () => {
    // Flatten the board array and check if empty.
    const isEmpty = game._board.flat().every(disk => disk === Disk.Empty);

    expect(isEmpty).toBe(true);
  });

  /** Test for a winner horizontally */
  describe('and when a board has 4 red disks in a row horizontally', () => {
    it('detects a winner', () => {
      // Populate the board with 4 reds in a row.
      for (let i = 0; i < 4; i++) {
        game._board[i][0] = Disk.Red;
      }

      const winner = game._checkWinner(game._board);

      expect(winner).toEqual(Disk.Red);
    });
  });

  /** Test for a winner vertically */
  describe('and when a board has 4 red disks in a row vertically', () => {
    it('detects a winner', () => {
      // Populate the board with 4 reds in a row.
      for (let i = 0; i < 4; i++) {
        game._board[0][i] = Disk.Red;
      }

      const winner = game._checkWinner(game._board);

      expect(winner).toEqual(Disk.Red);
    });
  });

  /** Test for a winner diagonally */
  describe('and when a board has 4 red disks in a row diagonally', () => {
    it('detects a winner', () => {
      // Populate the board with 4 reds in a row.
      for (let i = 0; i < 4; i++) {
        game._board[i][i] = Disk.Red;
      }

      const winner = game._checkWinner(game._board);

      expect(winner).toEqual(Disk.Red);
    });
  });

  /** Test if the picked column gets populated correctly */
  const pickedColumn = 5;

  describe(`and when a red disk is thrown into column ${pickedColumn}`, () => {
    it('correctly updates the board', () => {
      // Insert a disk.
      game._insertDisk(pickedColumn);

      expect(game._board[pickedColumn][0]).toEqual(game._turn);
    });
  });

  /** Test the case when some columns are not available */
  const columnsNotAvailable = [1, 5];

  describe(`and when columns ${columnsNotAvailable} are not available`, () => {
    it('correctly lists available columns', () => {
      game._board = game._board.map((column, columnIndex) =>
        column.map(row => (columnsNotAvailable.includes(columnIndex) ? Disk.Red : row))
      );

      expect(game._listAvailableColumns(game._board).length).toEqual(
        config.columns - columnsNotAvailable.length
      );

      const allColumns = Array(config.columns)
        .fill(null)
        .map((_column, i) => i);

      expect(game._listAvailableColumns(game._board)).toEqual(
        allColumns.filter(column => !columnsNotAvailable.includes(column))
      );
    });
  });
});
