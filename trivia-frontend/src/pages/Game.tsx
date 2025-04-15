import DifficultySelector from "../components/DifficultySelector";
import QuestionCard from "../components/QuestionCard";
import GameOver from "../components/GameOver";
import useGameLogic from "../hooks/useGameLogic";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Game: React.FC = () => {
  const {
    username,
    difficulty,
    questions,
    currentQuestionIndex,
    score,
    gameOver,
    handleAnswer,
    handlePlayAgain,
    setDifficulty,
    timer,
    shuffledAnswers,
  } = useGameLogic();

  const lastQuestion = useSelector(
    (state: RootState) => state.game.lastQuestion
  );

  return (
    <div className="container mx-auto h-screen flex flex-col overflow-hidden">
      <h1 className="text-3xl text-white font-bold text-center my-4 shrink-0">
        {username ? `Welcome back, ${username}` : "Welcome Guest"}
      </h1>

      <div className="flex-1 overflow-hidden">
        {!difficulty && (
          <DifficultySelector
            onSelectDifficulty={(difficulty) => setDifficulty(difficulty)}
          />
        )}
        {difficulty && !gameOver && questions.length > 0 && (
          <QuestionCard
            question={questions[currentQuestionIndex].question}
            answers={shuffledAnswers}
            onAnswer={handleAnswer}
            timer={timer}
          />
        )}
        {gameOver && (
          <GameOver
            score={score}
            onPlayAgain={handlePlayAgain}
            lastQuestion={lastQuestion}
          />
        )}
      </div>
    </div>
  );
};

export default Game;
