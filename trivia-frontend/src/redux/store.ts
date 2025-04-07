import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import gameReducer from "../features/game/gameSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    game: gameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
