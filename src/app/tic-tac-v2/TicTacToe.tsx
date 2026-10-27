"use client";

import { useState } from "react";

type Player = "X" | "O";
type SquareValue = Player | null;

const winningLines: [number, number, number][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function getWinningLine(squares: SquareValue[]) {
  for (const [first, second, third] of winningLines) {
    const value = squares[first];
    if (value && value === squares[second] && value === squares[third]) {
      return { player: value, positions: [first, second, third] };
    }
  }

  return null;
}

export default function TicTacToe() {
  const [squares, setSquares] = useState<SquareValue[]>(
    Array<SquareValue>(9).fill(null),
  );
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");

  const winningLine = getWinningLine(squares);
  const winner = winningLine?.player ?? null;
  const isDraw = !winner && squares.every((square) => square !== null);
  const gameIsOver = winner !== null || isDraw;

  function playSquare(index: number) {
    if (squares[index] || gameIsOver) {
      return;
    }

    setSquares((currentSquares) =>
      currentSquares.map((square, squareIndex) =>
        squareIndex === index ? currentPlayer : square,
      ),
    );
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  }

  function resetGame() {
    setSquares(Array<SquareValue>(9).fill(null));
    setCurrentPlayer("X");
  }

  const status = winner ? `Player ${winner} wins!` : isDraw ? "It's a draw!" : "Your turn";

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-[#f7f5f2] px-4 py-10 font-sans text-[#242321] sm:px-6">
      <div
        className="pointer-events-none absolute -left-32 -top-40 h-96 w-96 rounded-full bg-orange-200/40 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-48 -right-32 h-96 w-96 rounded-full bg-emerald-200/30 blur-3xl"
        aria-hidden="true"
      />

      <section
        className="relative w-full max-w-[460px] rounded-[30px] border border-black/[0.06] bg-white/90 p-6 shadow-[0_28px_90px_-35px_rgba(54,44,33,0.28)] backdrop-blur sm:p-9"
        aria-labelledby="game-title"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">
            <span className="h-2 w-2 rounded-full bg-orange-500" aria-hidden="true" />
            Two player game
          </div>
          <span className="rounded-full border border-stone-200 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-stone-400">
            3 × 3
          </span>
        </div>

        <div className="mt-7 text-center">
          <h1
            className="font-serif text-4xl font-semibold tracking-[-0.06em] sm:text-5xl"
            id="game-title"
          >
            Tic Tac Toe
          </h1>
          <p className="mt-2 text-sm text-stone-500">
            A little friendly competition.
          </p>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-3" aria-label="Players">
          {(["X", "O"] as const).map((player) => {
            const isActive = !gameIsOver && currentPlayer === player;
            const isWinner = winner === player;

            return (
              <div
                className={`flex items-center gap-3 rounded-2xl border px-3.5 py-3 transition-colors ${
                  isWinner
                    ? "border-emerald-200 bg-emerald-50"
                    : isActive
                      ? "border-orange-200 bg-orange-50"
                      : "border-stone-100 bg-stone-50/80"
                }`}
                key={player}
              >
                <span
                  className={`grid h-9 w-9 place-items-center rounded-xl text-sm font-black ${
                    player === "X"
                      ? "bg-orange-100 text-orange-700"
                      : "bg-emerald-100 text-emerald-700"
                  }`}
                  aria-hidden="true"
                >
                  {player}
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-bold text-stone-700">
                    Player {player}
                  </span>
                  <span className="mt-0.5 block text-[10px] text-stone-400">
                    {isWinner ? "Winner" : isActive ? "Playing now" : "Waiting"}
                  </span>
                </span>
                {isActive && (
                  <span
                    className="ml-auto h-2 w-2 rounded-full bg-orange-500"
                    aria-hidden="true"
                  />
                )}
              </div>
            );
          })}
        </div>

        <div
          className="mt-5 flex min-h-12 items-center justify-center gap-2.5 rounded-2xl bg-stone-100/80 px-4 text-sm font-semibold text-stone-700"
          aria-live="polite"
          aria-atomic="true"
        >
          <span
            className={`grid h-7 w-7 place-items-center rounded-lg text-xs font-black ${
              winner
                ? "bg-emerald-100 text-emerald-700"
                : isDraw
                  ? "bg-stone-200 text-stone-500"
                  : currentPlayer === "X"
                    ? "bg-orange-100 text-orange-700"
                    : "bg-emerald-100 text-emerald-700"
            }`}
            aria-hidden="true"
          >
            {winner ?? (isDraw ? "=" : currentPlayer)}
          </span>
          <span>{status}</span>
        </div>

        <div
          className="mx-auto mt-4 grid w-full max-w-[360px] grid-cols-3 gap-2.5 sm:gap-3"
          role="group"
          aria-label="Tic Tac Toe board"
        >
          {squares.map((square, index) => (
            <button
              className={`group relative grid aspect-square place-items-center overflow-hidden rounded-2xl border text-5xl font-bold transition duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-300/70 focus-visible:ring-offset-2 sm:rounded-[20px] sm:text-6xl ${
                winningLine?.positions.includes(index)
                  ? "scale-[1.03] border-emerald-300 bg-emerald-50 shadow-[0_8px_24px_-12px_rgba(16,120,75,0.5)]"
                  : square === "X"
                    ? "border-orange-100 bg-orange-50/70"
                    : square === "O"
                      ? "border-emerald-100 bg-emerald-50/70"
                      : "border-stone-200/80 bg-[#fbfaf8] hover:-translate-y-0.5 hover:border-orange-200 hover:bg-orange-50/60 hover:shadow-md"
              } ${!square && !gameIsOver ? "cursor-pointer" : "cursor-default"}`}
              type="button"
              key={index}
              onClick={() => playSquare(index)}
              disabled={Boolean(square) || gameIsOver}
              aria-label={`Square ${index + 1}${
                square ? `, ${square}` : ", empty"
              }`}
            >
              {square === "X" ? (
                <span
                  className="relative h-9 w-9 sm:h-11 sm:w-11"
                  aria-hidden="true"
                >
                  <span className="absolute left-1/2 top-1/2 h-1 w-10 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full bg-orange-600 sm:h-[5px] sm:w-12" />
                  <span className="absolute left-1/2 top-1/2 h-1 w-10 -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded-full bg-orange-600 sm:h-[5px] sm:w-12" />
                </span>
              ) : square === "O" ? (
                <span
                  className="h-9 w-9 rounded-full border-[5px] border-emerald-600 sm:h-11 sm:w-11 sm:border-[6px]"
                  aria-hidden="true"
                />
              ) : (
                <span className="sr-only">Empty</span>
              )}
            </button>
          ))}
        </div>

        <button
          className="mx-auto mt-6 flex items-center justify-center gap-2 rounded-full bg-[#242321] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-stone-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-stone-300"
          type="button"
          onClick={resetGame}
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M20 7v5h-5M4 17v-5h5" />
            <path d="M5.6 9a7 7 0 0 1 11.6-2L20 12M4 12l2.8 5a7 7 0 0 0 11.6-2" />
          </svg>
          New game
        </button>

        <p className="mt-5 text-center text-xs text-stone-400">
          Get three in a row to win. X plays first.
        </p>
      </section>
    </main>
  );
}
