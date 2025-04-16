import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { fetchQuestions } from "../services/TriviaService";
import {
  setDifficulty,
  setQuestions,
  setCurrentQuestionIndex,
  setScore,
  setGameOver,
  resetGame,
  setLastQuestion,
  setTimer,
} from "../features/game/gameSlice";
import { showToast } from "../features/toast/toastSlice";
import { shuffleAnswers } from "../utils/utilities";
import { Difficulty } from "../types/types";

const useGameLogic = () => {
  const dispatch = useDispatch();
  const {
    difficulty,
    questions,
    currentQuestionIndex,
    score,
    gameOver,
    timer,
  } = useSelector((state: RootState) => state.game);
  const username = useSelector((state: RootState) => state.user.username);
  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);

  useEffect(() => {
    if (difficulty) {
      const fetchTriviaQuestions = async () => {
        const questions = await fetchQuestions(difficulty as string);
        if (questions.length === 0) {
          dispatch(
            showToast({
              message: "No questions found for the selected difficulty.",
              type: "error",
            })
          );
        } else {
          dispatch(
            showToast({
              message: "Questions loaded successfully!",
              type: "success",
            })
          );
          dispatch(setQuestions(questions));
        }
      };
      fetchTriviaQuestions();
    }
  }, [difficulty, dispatch]);

  useEffect(() => {
    if (questions.length > 0) {
      const currentQ = questions[currentQuestionIndex];
      const answers = [...currentQ.incorrect_answers, currentQ.correct_answer];
      setShuffledAnswers(shuffleAnswers(answers));
    }
  }, [questions, currentQuestionIndex]);

  useEffect(() => {
    if (!gameOver) {
      const timerInterval = setInterval(() => {
        if (timer > 0) {
          dispatch(setTimer(timer - 1));
        } else {
          dispatch(setGameOver(true));
          dispatch(
            showToast({
              message: "Time's up! Game over.",
              type: "error",
            })
          );
          clearInterval(timerInterval);
        }
      }, 1000);

      return () => clearInterval(timerInterval);
    }
  }, [timer, gameOver, dispatch]);

  const handleAnswer = (answer: string) => {
    const currentQ = questions[currentQuestionIndex];
    const isCorrect = currentQ.correct_answer === answer;

    if (isCorrect) {
      dispatch(setScore(score + 1));
      dispatch(setTimer(20));
      dispatch(
        showToast({
          message: "Correct answer! Great job!",
          type: "success",
        })
      );

      const nextQuestionIndex = currentQuestionIndex + 1;
      if (nextQuestionIndex < questions.length) {
        dispatch(setCurrentQuestionIndex(nextQuestionIndex));
      } else {
        dispatch(setGameOver(true));
        dispatch(
          showToast({
            message: "Congratulations! You completed the game!",
            type: "success",
          })
        );
      }
    } else {
      dispatch(
        setLastQuestion({
          question: currentQ.question,
          correctAnswer: currentQ.correct_answer,
        })
      );
      dispatch(setGameOver(true));
      dispatch(
        showToast({
          message: "Wrong answer! Game over.",
          type: "error",
        })
      );
    }
  };

  const handleTimeout = () => {
    dispatch(setGameOver(true));
    dispatch(
      showToast({
        message: "Time's up! Game over.",
        type: "error",
      })
    );
  };

  const handlePlayAgain = () => {
    dispatch(resetGame());
    dispatch(
      showToast({
        message: "Game reset! Good luck.",
        type: "success",
      })
    );
  };

  return {
    username,
    difficulty,
    questions,
    currentQuestionIndex,
    score,
    gameOver,
    timer,
    shuffledAnswers,
    handleAnswer,
    handleTimeout,
    handlePlayAgain,
    setDifficulty: (difficulty: Difficulty) =>
      dispatch(setDifficulty(difficulty)),
  };
};

export default useGameLogic;
