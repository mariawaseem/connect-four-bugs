import { PlayerType } from '../types';

export abstract class BasePlayer {
  abstract type: PlayerType;
  abstract name: string;

  abstract move(): Promise<number>;
}
