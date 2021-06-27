import { Answers } from 'inquirer';
import { Mode } from '../enums/mode.enum';
import { PlayAgain } from '../enums/play-again.enum';

export interface ColumnAnswer extends Answers {
  column: number;
}

export interface PlayerNameAnswer extends Answers {
  playerName: string;
}

export interface GameModeAnswer extends Answers {
  mode: Mode;
}

export interface PlayAgainAnswer extends Answers {
  playAgain: PlayAgain;
}
