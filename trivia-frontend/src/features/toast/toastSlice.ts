import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ToastState {
  message: string | null;
  type: "success" | "error" | null;
  visible: boolean;
}

const initialState: ToastState = {
  message: null,
  type: null,
  visible: false,
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast(
      state,
      action: PayloadAction<{ message: string; type: "success" | "error" }>
    ) {
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.visible = true;
    },
    hideToast(state) {
      state.message = null;
      state.type = null;
      state.visible = false;
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;

export default toastSlice.reducer;
