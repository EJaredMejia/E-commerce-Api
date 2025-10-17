import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: { isLoading: false, loginMessage: "" },
  reducers: {
    setIsLoading: (state, action: { payload: boolean }) => {
      state.isLoading = action.payload;
    },
    setIsMessage: (state, action: { payload: string }) => {
      state.loginMessage = action.payload;
    },
  },
});

export const { setIsLoading, setIsMessage } = appSlice.actions;

export default appSlice.reducer;
