# Connect Four

## Description

Text console-based Connect Four game. First player to connect four disks of the same color wins. Disks can be connected horizontally, vertically or diagonally.

There are three game modes available:

- Human vs Human
- Human vs AI
- AI vs AI

## Usage

To start the game run:

```bash
 npm run dev
```

To execute tests and start the game after run:

```bash
npm run all
```

## Tests

To execute tests run:

```bash
npm run test
```

## !! Bug !!


This fork contains an intentionally inserted bug.


Expected behavior: The player should be able to play the game again after selecting the play again option after the current game ends.


Buggy behavior: The game does not start over when the play again option is selected.
