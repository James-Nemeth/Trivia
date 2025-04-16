import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showToast } from "../features/toast/toastSlice";
import { TriviaService } from "../services/TriviaService";
import { paginate, handleNext, handlePrev } from "../utils/utilities";

interface Score {
  id: number;
  score: number;
  timestamp: string;
}

const Scores: React.FC = () => {
  const [scores, setScores] = useState<Score[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usernameExists, setUsernameExists] = useState(true);
  const itemsPerPage = 5;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const username = localStorage.getItem("username");
        if (!username) {
          setUsernameExists(false);
          return;
        }

        const data = await TriviaService.getScores(username);
        setScores(data);
        dispatch(
          showToast({
            message: "Scores loaded successfully!",
            type: "success",
          })
        );
      } catch (err) {
        const errorMessage = "Failed to fetch scores.";
        console.error(errorMessage, err);
        setError(errorMessage);
        dispatch(
          showToast({
            message: errorMessage,
            type: "error",
          })
        );
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, [dispatch]);

  const totalPages = Math.ceil(scores.length / itemsPerPage);
  const currentScores = paginate(scores, currentPage, itemsPerPage);

  const onNextSuccess = () => {
    dispatch(
      showToast({
        message: "Moved to the next page.",
        type: "success",
      })
    );
  };

  const onPrevSuccess = () => {
    dispatch(
      showToast({
        message: "Moved to the previous page.",
        type: "success",
      })
    );
  };

  if (!usernameExists) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-800 px-4">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white text-center mb-8">
          You must be logged in to see your scores.
        </h1>
        <button
          className="bg-purple-500 text-white px-10 py-4 text-2xl font-semibold rounded-full shadow-lg hover:bg-purple-800 transition-transform transform hover:scale-105 cursor-pointer"
          onClick={() => navigate("/game")}
        >
          Back to Game
        </button>
      </div>
    );
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-4xl text-purple-800 font-bold text-center mb-10">
          Your Scores
        </h1>
        {scores.length === 0 ? (
          <p className="text-gray-600 text-center">No scores available.</p>
        ) : (
          <>
            <ul className="space-y-4">
              {currentScores.map((score) => (
                <li
                  key={score.id}
                  className="bg-gray-100 rounded-xl p-4 flex justify-between items-center shadow-sm"
                >
                  <div>
                    <p className="text-xl font-bold text-purple-700">
                      Score: {score.score}
                    </p>
                    <p className="text-md font-bold text-black">
                      Date: {new Date(score.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-white text-sm font-bold ${
                      score.score >= 10
                        ? "bg-green-500"
                        : score.score >= 5
                        ? "bg-yellow-400"
                        : "bg-red-400"
                    }`}
                  >
                    {score.score >= 10
                      ? " Great!"
                      : score.score >= 5
                      ? " Good"
                      : " Keep Going"}
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={() =>
                  handlePrev(currentPage, setCurrentPage, onPrevSuccess)
                }
                disabled={currentPage === 1}
                className={`px-4 py-2 text-lg font-semibold rounded-lg ${
                  currentPage === 1
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-purple-500 text-white hover:bg-purple-700 cursor-pointer"
                }`}
              >
                Prev
              </button>
              <span className="text-lg font-medium text-purple-700 mt-2">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  handleNext(
                    currentPage,
                    totalPages,
                    setCurrentPage,
                    onNextSuccess
                  )
                }
                disabled={currentPage === totalPages}
                className={`px-4 py-2 text-lg font-semibold rounded-lg ${
                  currentPage === totalPages
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-purple-500 text-white hover:bg-purple-700 cursor-pointer"
                }`}
              >
                Next
              </button>
            </div>
          </>
        )}

        <div className="flex justify-center mt-10">
          <button
            className="bg-purple-500 text-white px-10 py-4 text-2xl font-semibold rounded-full shadow-lg hover:bg-purple-800 transition-transform transform hover:scale-105 cursor-pointer"
            onClick={() => {
              navigate("/game");
              dispatch(
                showToast({
                  message: "Returning to the game.",
                  type: "success",
                })
              );
            }}
          >
            Back to Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default Scores;
