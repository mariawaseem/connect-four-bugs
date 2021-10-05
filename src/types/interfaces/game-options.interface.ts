import { Player } from '../../players';
import { Printer } from '../../printers';
import { Mode } from '../enums/mode.enum';

export interface GameOptions {
  humanPlayer: Player;
  aiPlayer: Player;
  mode: Mode;
  printer: Printer;
}
