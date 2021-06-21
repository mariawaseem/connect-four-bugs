import { Disk } from '../src/types';
import { copyBoard, game } from './jest.setup';

describe('when creates a new board', () => {
  // Create a fresh copy.
  const board = copyBoard(game._board);

  it('board is 7x6', () => {
    expect(board.length).toBe(7);
    expect(board[0].length).toBe(6);
  });

  it('board is empty', () => {
    const isEmpty = board.flat().every(disk => disk === Disk.Empty);
    expect(isEmpty).toBe(true);
  });

  describe('and when a board has 4 red disks in a row horizontally', () => {
    // Create a copy
    let winBoard = copyBoard(game._board);

    // Populate the board with 4 reds in a row.
    for (let i = 0; i < 4; i++) {
      winBoard[i][0] = Disk.Red;
    }

    it('detects a winner', () => {
      const winner = game._checkWinner(winBoard);

      expect(winner).toEqual(Disk.Red);
    });
  });

  describe('and when a board has 4 red disks in a row vertically', () => {
    let winBoard = copyBoard(game._board);

    // Populate the board with 4 reds in a row.
    for (let i = 0; i < 4; i++) {
      winBoard[0][i] = Disk.Red;
    }

    it('detects a winner', () => {
      const winner = game._checkWinner(winBoard);

      expect(winner).toEqual(Disk.Red);
    });
  });

  describe('and when a board has 4 red disks in a row diagonally', () => {
    // Populate the board with 4 reds in a row.
    let winBoard = copyBoard(game._board);

    for (let i = 0; i < 4; i++) {
      winBoard[i][i] = Disk.Red;
    }

    it('detects a winner', () => {
      const winner = game._checkWinner(winBoard);

      expect(winner).toEqual(Disk.Red);
    });
  });

  let pickedColumn = 3;
  describe(`and when a red disk is thrown into column ${pickedColumn}`, () => {
    game._insertDisk(pickedColumn);
    let updatedBoard = copyBoard(game._board);

    it('correctly updates the board', () => {
      expect(updatedBoard[pickedColumn][0]).toEqual(game._turn);
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
      expect(game._availableColumns(updatedBoard).length).toEqual(5);
      expect(game._availableColumns(updatedBoard)).toEqual([0, 2, 3, 4, 6]);
    });
  });
});
