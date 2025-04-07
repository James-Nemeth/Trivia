interface DifficultySelectorProps {
  onSelectDifficulty: (difficulty: string) => void;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  onSelectDifficulty,
}) => {
  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="flex flex-col items-center text-center p-6 md:p-10 bg-white rounded-2xl shadow-xl max-w-lg w-full">
        <h2 className="text-3xl md:text-4xl font-bold text-purple-800 mb-10">
          Select Your Challenge
        </h2>
        <div className="flex flex-col md:flex-row gap-4 w-full justify-center">
          <button
            className="bg-green-300 text-green-900 text-lg font-semibold px-7 py-3 rounded-full hover:bg-green-400 transition cursor-pointer"
            onClick={() => onSelectDifficulty("easy")}
          >
            Easy
          </button>
          <button
            className="bg-yellow-300 text-yellow-900 text-lg font-semibold px-7 py-3 rounded-full hover:bg-yellow-400 transition cursor-pointer"
            onClick={() => onSelectDifficulty("medium")}
          >
            Medium
          </button>
          <button
            className="bg-red-400 text-red-900 text-lg font-semibold px-7 py-3 rounded-full hover:bg-red-500 transition cursor-pointer"
            onClick={() => onSelectDifficulty("hard")}
          >
            Hard
          </button>
        </div>
      </div>
    </div>
  );
};

export default DifficultySelector;
