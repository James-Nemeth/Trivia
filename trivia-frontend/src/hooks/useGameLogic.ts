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
import { shuffleAnswers } from "../utils/utilities";

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

  // Fetch questions when difficulty is set
  useEffect(() => {
    if (difficulty) {
      const fetchTriviaQuestions = async () => {
        const questions = await fetchQuestions(difficulty);
        if (questions.length === 0) {
          console.error("No questions found for the selected difficulty");
        } else {
          dispatch(setQuestions(questions));
        }
      };
      fetchTriviaQuestions();
    }
  }, [difficulty, dispatch]);

  // Shuffle answers whenever the current question changes
  useEffect(() => {
    if (questions.length > 0) {
      const currentQ = questions[currentQuestionIndex];
      const answers = [...currentQ.incorrect_answers, currentQ.correct_answer];
      setShuffledAnswers(shuffleAnswers(answers));
    }
  }, [questions, currentQuestionIndex]);

  // Timer logic
  useEffect(() => {
    if (!gameOver) {
      const timerInterval = setInterval(() => {
        if (timer > 0) {
          dispatch(setTimer(timer - 1));
        } else {
          dispatch(setGameOver(true)); // End game if timer reaches 0
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
      dispatch(setTimer(20)); // Reset timer to 20 seconds

      const nextQuestionIndex = currentQuestionIndex + 1;
      if (nextQuestionIndex < questions.length) {
        dispatch(setCurrentQuestionIndex(nextQuestionIndex));
      } else {
        dispatch(setGameOver(true));
      }
    } else {
      dispatch(
        setLastQuestion({
          question: currentQ.question,
          correctAnswer: currentQ.correct_answer,
        })
      );
      dispatch(setGameOver(true));
    }
  };

  const handleTimeout = () => {
    dispatch(setGameOver(true));
  };

  const handlePlayAgain = () => {
    dispatch(resetGame());
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
    setDifficulty: (difficulty: string) => dispatch(setDifficulty(difficulty)),
  };
};

export default useGameLogic;
