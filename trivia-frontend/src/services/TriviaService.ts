const API_URL = "https://opentdb.com/api.php";

interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export const fetchQuestions = async (
  difficulty: string,
  retries = 3
): Promise<Question[]> => {
  try {
    const response = await fetch(
      `${API_URL}?amount=10&difficulty=${difficulty}&type=multiple`
    );
    if (response.status === 429 && retries > 0) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return fetchQuestions(difficulty, retries - 1);
    }
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Failed to fetch questions:", error);
    return [];
  }
};
