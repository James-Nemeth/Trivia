import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  username: string | null;
}

const initialState: UserState = {
  username: localStorage.getItem("loggedInUser"),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsername(state, action: PayloadAction<string | null>) {
      state.username = action.payload;
      if (action.payload) {
        localStorage.setItem("loggedInUser", action.payload);
      } else {
        localStorage.removeItem("loggedInUser");
      }
    },
  },
});

export const { setUsername } = userSlice.actions;

export default userSlice.reducer;
