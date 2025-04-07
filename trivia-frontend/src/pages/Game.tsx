import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import DifficultySelector from "../components/DifficultySelector";
import QuestionCard from "../components/QuestionCard";
import GameOver from "../components/GameOver";
import { fetchQuestions } from "../services/TriviaService";
import { shuffleAnswers } from "../utils/utilites";
import {
  setDifficulty,
  setQuestions,
  setCurrentQuestionIndex,
  setScore,
  setGameOver,
  resetGame,
} from "../features/game/gameSlice";

const Game: React.FC = () => {
  const dispatch = useDispatch();
  const { difficulty, questions, currentQuestionIndex, score, gameOver } =
    useSelector((state: RootState) => state.game);
  const username = useSelector((state: RootState) => state.user.username);

  useEffect(() => {
    if (difficulty) {
      const fetchTriviaQuestions = async () => {
        const questions = await fetchQuestions(difficulty);
        if (questions.length === 0) {
          // Handle error
        } else {
          dispatch(setQuestions(questions));
        }
      };
      fetchTriviaQuestions();
    }
  }, [difficulty, dispatch]);

  const handleAnswer = (answer: string) => {
    if (questions[currentQuestionIndex].correct_answer === answer) {
      dispatch(setScore(score + 1));
      const nextQuestionIndex = currentQuestionIndex + 1;
      if (nextQuestionIndex < questions.length) {
        dispatch(setCurrentQuestionIndex(nextQuestionIndex));
      } else {
        dispatch(setGameOver(true));
      }
    } else {
      dispatch(setGameOver(true));
    }
  };

  const handleTimeout = () => {
    dispatch(setGameOver(true));
  };

  const handlePlayAgain = () => {
    dispatch(resetGame());
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl text-purple-800 font-bold text-center mb-4">
        {username ? `Welcome back, ${username}` : "Welcome"}
      </h1>
      {!difficulty && (
        <DifficultySelector
          onSelectDifficulty={(difficulty) =>
            dispatch(setDifficulty(difficulty))
          }
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
