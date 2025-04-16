import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "../../types/types";

const initialState: UserState = {
  username: localStorage.getItem("username"),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsername(state, action: PayloadAction<string | null>) {
      state.username = action.payload;
      if (action.payload) {
        localStorage.setItem("username", action.payload);
      } else {
        localStorage.removeItem("username");
      }
    },
  },
});

export const { setUsername } = userSlice.actions;

export default userSlice.reducer;
