import "./App.css";
import { getRandomWord } from "./utils";
import { useState } from "react";

function App() {
  const [currWord, setCurrentWord] = useState("react"); // hard-coded for testing
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [input, setInput] = useState("");
  const [remainingGuesses, setRemainingGuesses] = useState(10);
  const [gameStatus, setGameStatus] = useState("playing"); // "playing" | "won" | "lost"
  const [roundsWon, setRoundsWon] = useState(0);
  const [roundsPlayed, setRoundsPlayed] = useState(0);

  const generateWordDisplay = () => {
    return currWord
      .split("")
      .map((letter) => (guessedLetters.includes(letter) ? letter : "_"))
      .join(" ");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input || input.length !== 1 || gameStatus !== "playing") return;

    const guess = input.toLowerCase();

    if (guessedLetters.includes(guess)) {
      setInput("");
      return;
    }

    setGuessedLetters([...guessedLetters, guess]);

    if (!currWord.includes(guess)) {
      setRemainingGuesses((prev) => prev - 1);
    }

    setInput("");
  };

  const allLettersGuessed = currWord
    .split("")
    .every((letter) => guessedLetters.includes(letter));

  if (gameStatus === "playing") {
    if (allLettersGuessed) {
      setGameStatus("won");
      setRoundsWon((prev) => prev + 1);
      setRoundsPlayed((prev) => prev + 1);
    } else if (remainingGuesses <= 0) {
      setGameStatus("lost");
      setRoundsPlayed((prev) => prev + 1);
    }
  }

  const handlePlayAgain = () => {
    setCurrentWord(getRandomWord());
    setGuessedLetters([]);
    setRemainingGuesses(10);
    setGameStatus("playing");
    setInput("");
  };

  return (
    <div className="card">
      <h1>Guess The Word</h1>

      <h3>Word Display</h3>
      <p>{generateWordDisplay()}</p>

      <h3>Guessed Letters</h3>
      <p>{guessedLetters.length > 0 ? guessedLetters.join(", ") : "-"}</p>

      <h3>Guesses Remaining</h3>
      <p>{remainingGuesses}</p>

      {gameStatus === "playing" && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            maxLength="1"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">Guess</button>
        </form>
      )}

      {gameStatus === "won" && (
        <div>
          <h2>🎉 You Won!</h2>
          <button onClick={handlePlayAgain}>Play Again</button>
        </div>
      )}

      {gameStatus === "lost" && (
        <div>
          <h2>😢 You Lost! The word was "{currWord}"</h2>
          <button onClick={handlePlayAgain}>Play Again</button>
        </div>
      )}

      <h3>Scoreboard</h3>
      <p>
        Wins: {roundsWon} / Rounds Played: {roundsPlayed}
      </p>
    </div>
  );
}

export default App;
