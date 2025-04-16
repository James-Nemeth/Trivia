export interface GameState {
  difficulty: string | null;
  questions: any[];
  currentQuestionIndex: number;
  score: number;
  gameOver: boolean;
  lastQuestion?: {
    question: string;
    correctAnswer: string;
  };
  timer: number;
}

export interface UserState {
  username: string | null;
}

export interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface LastQuestion {
  question: string;
  correctAnswer: string;
}

export type Difficulty = "easy" | "medium" | "hard" | null;
