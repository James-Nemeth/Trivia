import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GameState {
  difficulty: string | null;
  questions: any[];
  currentQuestionIndex: number;
  score: number;
  gameOver: boolean;
}

const initialState: GameState = {
  difficulty: null,
  questions: [],
  currentQuestionIndex: 0,
  score: 0,
  gameOver: false,
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
    resetGame(state) {
      state.difficulty = null;
      state.questions = [];
      state.currentQuestionIndex = 0;
      state.score = 0;
      state.gameOver = false;
    },
  },
});

export const {
  setDifficulty,
  setQuestions,
  setCurrentQuestionIndex,
  setScore,
  setGameOver,
  resetGame,
} = gameSlice.actions;

export default gameSlice.reducer;
