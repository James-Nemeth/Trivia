import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GameState {
  difficulty: string | null;
  questions: any[];
  currentQuestionIndex: number;
  score: number;
  gameOver: boolean;
  lastQuestion?: {
    question: string;
    correctAnswer: string;
  };
  timer: number; // Add a timer property
}

const initialState: GameState = {
  difficulty: null,
  questions: [],
  currentQuestionIndex: 0,
  score: 0,
  gameOver: false,
  lastQuestion: undefined,
  timer: 20, // Initialize timer to 20 seconds
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setDifficulty(state, action: PayloadAction<string | null>) {
      state.difficulty = action.payload;
    },
    setQuestions(state, action: PayloadAction<any[]>) {
      state.questions = action.payload;
    },
    setCurrentQuestionIndex(state, action: PayloadAction<number>) {
      state.currentQuestionIndex = action.payload;
    },
    setScore(state, action: PayloadAction<number>) {
      state.score = action.payload;
    },
    setGameOver(state, action: PayloadAction<boolean>) {
      state.gameOver = action.payload;
    },
    setLastQuestion(
      state,
      action: PayloadAction<{ question: string; correctAnswer: string }>
    ) {
      state.lastQuestion = action.payload;
    },
    resetGame(state) {
      state.difficulty = null;
      state.questions = [];
      state.currentQuestionIndex = 0;
      state.score = 0;
      state.gameOver = false;
      state.timer = 20; // Reset timer
    },
    setTimer(state, action: PayloadAction<number>) {
      state.timer = action.payload;
    },
  },
});

export const {
  setDifficulty,
  setQuestions,
  setCurrentQuestionIndex,
  setScore,
  setGameOver,
  setLastQuestion,
  resetGame,
  setTimer,
} = gameSlice.actions;

export default gameSlice.reducer;
