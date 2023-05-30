import { createSlice } from "@reduxjs/toolkit";
import UserOperations from "./userOperations";

const initialState = {
  data: {},
  isLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(UserOperations.getUserById.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(UserOperations.getUserById.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(UserOperations.getUserById.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
  },
});

export default userSlice.reducer;
