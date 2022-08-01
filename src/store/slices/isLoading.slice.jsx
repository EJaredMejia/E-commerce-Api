import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: { isLoading: false, loginMessage: "" },
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsMessage: (state, action) =>{
      state.loginMessage = action.payload;
    }
  },
});

export const { setIsLoading, setIsMessage } = appSlice.actions;

export default appSlice.reducer;
