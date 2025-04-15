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
      <div className="p-10 bg-white rounded-xl shadow-xl w-full max-w-xl md:max-w-2xl">
        <h2 className="text-4xl md:text-3xl text-center font-bold text-purple-800 mb-12">
          {decodeHTML(question)}
        </h2>

        <div className="text-center mb-6">
          <p className="text-red-600 text-lg font-bold">
            Time Remaining: {timer} seconds
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {answers.map((answer, index) => (
            <button
              key={index}
              className="bg-purple-100 text-purple-800 px-5 py-4 text-lg font-semibold rounded-lg hover:bg-purple-200 transition duration-200 cursor-pointer"
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
