import { Answers } from 'inquirer';

export interface IColumnAnswer extends Answers {
  column: number;
}

export interface IPlayerNameAnswer extends Answers {
  playerName: string;
}

export interface IGameModeAnswer extends Answers {
  mode: string;
}

export interface IPlayAgainAnswer extends Answers {
  playAgain: string;
}
