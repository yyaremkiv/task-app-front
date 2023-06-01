import { createSlice } from "@reduxjs/toolkit";
import TaskOperations from "./taskOperations";

const initialState = {
  data: [],
  totalBoards: 1,
  isLoading: false,
  error: null,
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(TaskOperations.getBoards.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(TaskOperations.getBoards.fulfilled, (state, action) => {
      state.data = action.payload.boards;
      state.totalBords = action.payload.totalBoards;
      state.isLoading = false;
    });
    builder.addCase(TaskOperations.getBoards.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    builder.addCase(TaskOperations.addBoard.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(TaskOperations.addBoard.fulfilled, (state, action) => {
      state.data = action.payload.boards;
      state.totalBords = action.payload.totalBoards;
      state.isLoading = false;
    });
    builder.addCase(TaskOperations.addBoard.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    builder.addCase(TaskOperations.removeBoard.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(TaskOperations.removeBoard.fulfilled, (state, action) => {
      state.data = action.payload.boards;
      state.totalBords = action.payload.totalBoards;
      state.isLoading = false;
    });
    builder.addCase(TaskOperations.removeBoard.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    builder.addCase(TaskOperations.updateBoard.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(TaskOperations.updateBoard.fulfilled, (state, action) => {
      state.data = action.payload.boards;
      state.totalBords = action.payload.totalBoards;
      state.isLoading = false;
    });
    builder.addCase(TaskOperations.updateBoard.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
  },
});

export default taskSlice.reducer;
