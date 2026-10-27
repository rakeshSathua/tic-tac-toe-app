# Tic Tac Toe

A two-player Tic Tac Toe game built with React and the Next.js 14 App Router.

## Route

Visit `/tic-tac` while the development server is running.

## How to play

- Players take turns selecting an empty square; X goes first.
- The first player to place three marks in a row, column, or diagonal wins.
- If all nine squares are filled without a winner, the game ends in a draw.
- Select **New game** to reset the board.

## Implementation

- `page.tsx` renders the route's `TicTacToe` component.
- `TicTacToe.tsx` contains the interactive game and game-state logic.
- Tailwind CSS utility classes style the responsive board, player indicators, and win state.
