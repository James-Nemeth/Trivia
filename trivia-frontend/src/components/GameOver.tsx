import { useEffect } from "react";
import { useSelector } from "react-redux";
import { TriviaService } from "../services/TriviaService";
import { RootState } from "../redux/store";
import { decodeHTML } from "../utils/utilities";

interface GameOverProps {
  score: number;
  onPlayAgain: () => void;
  lastQuestion?: {
    question: string;
    correctAnswer: string;
  };
}

const GameOver: React.FC<GameOverProps> = ({
  score,
  onPlayAgain,
  lastQuestion,
}) => {
  const username = useSelector((state: RootState) => state.user.username);

  useEffect(() => {
    const saveScore = async () => {
      if (username) {
        try {
          await TriviaService.saveScore(username, score);
          console.log("Score saved successfully");
        } catch (error) {
          console.error("Error saving score:", error);
        }
      }
    };

    saveScore();
  }, [username, score]);

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="flex flex-col items-center text-center p-6 md:p-10 bg-white rounded-2xl shadow-2xl max-w-md w-full animate-fade-in">
        <h2 className="text-3xl md:text-4xl font-extrabold text-red-600 mb-4">
          Game Over 💀
        </h2>
        {lastQuestion && (
          <div className="mt-6 bg-red-50 border border-red-200 p-2 mb-4 rounded-lg text-red-800 text-center text-lg">
            <p className="font-semibold">Last Question:</p>
            <p className="mb-2">{decodeHTML(lastQuestion.question)}</p>
            <p className="font-semibold">Correct Answer:</p>
            <p>{decodeHTML(lastQuestion.correctAnswer)}</p>
          </div>
        )}

        <p className="text-xl md:text-2xl mb-6">
          Your final score: <span className="font-bold">{score}</span>
        </p>
        <button
          className="bg-purple-600 text-white px-6 py-3 text-lg rounded-full shadow-md mb-4 cursor-pointer hover:bg-purple-500 transition-transform transform hover:scale-105"
          onClick={onPlayAgain}
        >
          🔁 Play Again
        </button>
      </div>
    </div>
  );
};

export default GameOver;
