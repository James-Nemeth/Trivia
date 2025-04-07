interface GameOverProps {
  score: number;
  onPlayAgain: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ score, onPlayAgain }) => {
  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="flex flex-col items-center text-center p-6 md:p-10 bg-white rounded-2xl shadow-2xl max-w-md w-full animate-fade-in">
        <h2 className="text-3xl md:text-4xl font-extrabold text-red-600 mb-4">
          Game Over 💀
        </h2>
        <p className="text-xl md:text-2xl mb-6">
          Your final score: <span className="font-bold">{score}</span>
        </p>
        <button
          className="bg-purple-600 text-white px-6 py-3 text-lg rounded-full shadow-md cursor-pointer hover:bg-purple-500 transition-transform transform hover:scale-105"
          onClick={onPlayAgain}
        >
          🔁 Play Again
        </button>
      </div>
    </div>
  );
};

export default GameOver;
