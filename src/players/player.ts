import { PlayerType } from '../types';

/**
 * Base class for every Player to extend.
 */
export abstract class Player {
  abstract type: PlayerType;
  abstract name: string;
  abstract move(availableColumns: number[]): Promise<number>;
}
