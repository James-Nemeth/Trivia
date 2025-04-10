import { useEffect } from "react";
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
} from "../features/game/gameSlice";

const useGameLogic = () => {
  const dispatch = useDispatch();
  const { difficulty, questions, currentQuestionIndex, score, gameOver } =
    useSelector((state: RootState) => state.game);
  const username = useSelector((state: RootState) => state.user.username);

  useEffect(() => {
    if (difficulty) {
      const fetchTriviaQuestions = async () => {
        const questions = await fetchQuestions(difficulty);
        if (questions.length === 0) {
        } else {
          dispatch(setQuestions(questions));
        }
      };
      fetchTriviaQuestions();
    }
  }, [difficulty, dispatch]);

  const handleAnswer = (answer: string) => {
    const currentQ = questions[currentQuestionIndex];
    const isCorrect = currentQ.correct_answer === answer;

    if (isCorrect) {
      dispatch(setScore(score + 1));
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
    handleAnswer,
    handleTimeout,
    handlePlayAgain,
    setDifficulty: (difficulty: string) => dispatch(setDifficulty(difficulty)),
  };
};

export default useGameLogic;
