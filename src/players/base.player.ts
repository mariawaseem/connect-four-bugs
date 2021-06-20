import { PlayerType } from '../types';

export abstract class BasePlayer {
  abstract type: PlayerType;
  abstract name: string;

  abstract move(availableColumns: number[]): Promise<number>;
}
