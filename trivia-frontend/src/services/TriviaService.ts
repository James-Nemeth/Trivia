import axios from "axios";

const API_BASE_URL = "http://localhost:8080/trivia";
const API_URL = "https://opentdb.com/api.php";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const setAuthToken = (token: string | null) => {
  if (token) {
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common["Authorization"];
  }
};

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

export const TriviaService = {
  signup: async (
    username: string,
    password: string,
    role: string = "PLAYER"
  ) => {
    const response = await apiClient.post("/signup", {
      username,
      password,
      role,
    });
    return response.data;
  },

  login: async (username: string, password: string) => {
    try {
      const response = await apiClient.post("/login", {
        username,
        password,
      });
      const { token, username: loggedInUsername } = response.data;

      localStorage.setItem("jwtToken", token);

      setAuthToken(token);

      return { token, username: loggedInUsername };
    } catch (error: any) {
      if (error.response && error.response.data) {
        throw new Error(
          error.response.data.message || "Invalid username or password."
        );
      } else {
        throw new Error(
          "Unable to connect to the server. Please try again later."
        );
      }
    }
  },

  getScores: async (username: string) => {
    const response = await apiClient.get(`/scores/${username}`);
    return response.data;
  },

  saveScore: async (username: string, score: number) => {
    const response = await apiClient.post("/scores", { username, score });
    return response.data;
  },
};

const token = localStorage.getItem("jwtToken");
setAuthToken(token);
