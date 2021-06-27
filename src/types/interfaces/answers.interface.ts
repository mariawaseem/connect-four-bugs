import { Answers } from 'inquirer';

export interface ColumnAnswer extends Answers {
  column: number;
}

export interface PlayerNameAnswer extends Answers {
  playerName: string;
}

export interface GameModeAnswer extends Answers {
  mode: string;
}

export interface PlayAgainAnswer extends Answers {
  playAgain: string;
}
