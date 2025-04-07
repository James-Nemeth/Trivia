import React from "react";
import DifficultySelector from "../components/DifficultySelector";
import QuestionCard from "../components/QuestionCard";
import GameOver from "../components/GameOver";
import { shuffleAnswers } from "../utils/utilities";
import useGameLogic from "../hooks/useGameLogic";

const Game: React.FC = () => {
  const {
    username,
    difficulty,
    questions,
    currentQuestionIndex,
    score,
    gameOver,
    handleAnswer,
    handleTimeout,
    handlePlayAgain,
    setDifficulty,
  } = useGameLogic();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl text-purple-800 font-bold text-center mb-4">
        {username ? `Welcome back, ${username}` : "Welcome"}
      </h1>
      {!difficulty && (
        <DifficultySelector
          onSelectDifficulty={(difficulty) => setDifficulty(difficulty)}
        />
      )}
      {difficulty && !gameOver && questions.length > 0 && (
        <QuestionCard
          question={questions[currentQuestionIndex].question}
          answers={shuffleAnswers([
            ...questions[currentQuestionIndex].incorrect_answers,
            questions[currentQuestionIndex].correct_answer,
          ])}
          onAnswer={handleAnswer}
          onTimeout={handleTimeout}
        />
      )}
      {gameOver && <GameOver score={score} onPlayAgain={handlePlayAgain} />}
    </div>
  );
};

export default Game;
