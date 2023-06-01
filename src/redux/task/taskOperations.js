import { createAsyncThunk } from "@reduxjs/toolkit";
import TaskService from "../../services/TaskService";

class TaskOperations {
  static getBoards = createAsyncThunk(
    "task/getBoards",
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await TaskService.getBoards();
        return data;
      } catch (err) {
        return rejectWithValue(
          err?.response?.data?.message || "An error occurred with the network"
        );
      }
    }
  );

  static addBoard = createAsyncThunk(
    "task/addBoard",
    async ({ title, cards, labels, color }, { rejectWithValue }) => {
      try {
        const { data } = await TaskService.addBoard({
          title,
          cards,
          labels,
          color,
        });
        return data;
      } catch (err) {
        return rejectWithValue(
          err?.response?.data?.message || "An error occurred with the network"
        );
      }
    }
  );

  static updateBoard = createAsyncThunk(
    "task/updateBoard",
    async ({ boardId, board }, { rejectWithValue }) => {
      try {
        const { data } = await TaskService.updateBoard({ boardId, board });
        return data;
      } catch (err) {
        return rejectWithValue(
          err?.response?.data?.message || "An error occurred with the network"
        );
      }
    }
  );

  static removeBoard = createAsyncThunk(
    "task/removeBoard",
    async ({ boardId }, { rejectWithValue }) => {
      try {
        const { data } = await TaskService.removeBoard({ boardId });
        return data;
      } catch (err) {
        return rejectWithValue(
          err?.response?.data?.message || "An error occurred with the network"
        );
      }
    }
  );
}

export default TaskOperations;
