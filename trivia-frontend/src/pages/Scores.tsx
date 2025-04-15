import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TriviaService } from "../services/TriviaService";

interface Score {
  id: number;
  score: number;
  timestamp: string;
}

const Scores: React.FC = () => {
  const [scores, setScores] = useState<Score[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const username = localStorage.getItem("username");
        if (!username) {
          setError("No username found.");
          return;
        }
        const data = await TriviaService.getScores(username);
        setScores(data);
      } catch (err) {
        console.error("Failed to fetch scores:", err);
        setError("Failed to fetch scores.");
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl text-purple-800 font-bold text-center mb-4">
        Your Scores
      </h1>
      <div className="bg-white shadow rounded-lg p-4">
        {scores.length === 0 ? (
          <p>No scores available.</p>
        ) : (
          <ul>
            {scores.map((score) => (
              <li key={score.id} className="mb-2">
                <p>Score: {score.score}</p>
                <p>Date: {new Date(score.timestamp).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
      <button
        className="bg-gray-400 text-white px-4 py-2 rounded-lg mt-4"
        onClick={() => navigate("/game")}
      >
        Back to Game
      </button>
    </div>
  );
};

export default Scores;
