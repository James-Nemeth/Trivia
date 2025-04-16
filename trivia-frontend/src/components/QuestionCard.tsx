import { decodeHTML } from "../utils/utilities";

interface QuestionCardProps {
  question: string;
  answers: string[];
  onAnswer: (answer: string) => void;
  timer: number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  answers,
  onAnswer,
  timer,
}) => {
  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="p-6 md:p-10 bg-white rounded-xl shadow-xl w-full max-w-md md:max-w-3xl">
        <h2 className="text-2xl md:text-3xl text-center font-bold text-purple-800 mb-8 md:mb-12">
          {decodeHTML(question)}
        </h2>

        <div className="text-center mb-6">
          <p className="text-red-600 text-lg md:text-xl font-bold">
            Time Remaining: {timer} seconds
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {answers.map((answer, index) => (
            <button
              key={index}
              className="bg-purple-100 text-purple-800 px-4 md:px-5 py-3 md:py-4 text-sm md:text-lg font-semibold rounded-lg hover:bg-purple-200 transition duration-200 cursor-pointer"
              onClick={() => onAnswer(answer)}
            >
              {decodeHTML(answer)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
