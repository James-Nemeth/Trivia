import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import gameReducer from "../features/game/gameSlice";
import toastReducer from "../features/toast/toastSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    game: gameReducer,
    toast: toastReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
