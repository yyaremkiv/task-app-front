import { createAsyncThunk } from "@reduxjs/toolkit";
import { IAddBoard, IUpdateBoard } from "../../interfaces/DataTypes";
import TaskService from "../../services/TaskService";

interface IParams {
  params: {
    page: number;
    limit: number;
  };
}

class TaskOperations {
  static getBoards = createAsyncThunk(
    "task/getBoards",
    async ({ params }: IParams, { rejectWithValue }) => {
      try {
        const { data } = await TaskService.getBoards({ params });
        return data;
      } catch (err: any) {
        return rejectWithValue(
          err?.response?.data?.message || "An error occurred with the network"
        );
      }
    }
  );

  static addBoard = createAsyncThunk(
    "task/addBoard",
    async ({ title, cards, labels, color }: IAddBoard, { rejectWithValue }) => {
      try {
        const { data } = await TaskService.addBoard({
          body: {
            title,
            cards,
            labels,
            color,
          },
        });
        return data;
      } catch (err: any) {
        return rejectWithValue(
          err?.response?.data?.message || "An error occurred with the network"
        );
      }
    }
  );

  static updateBoard = createAsyncThunk(
    "task/updateBoard",
    async ({ boardId, board }: IUpdateBoard, { rejectWithValue }) => {
      try {
        const { data } = await TaskService.updateBoard({ boardId, board });
        return data;
      } catch (err: any) {
        return rejectWithValue(
          err?.response?.data?.message || "An error occurred with the network"
        );
      }
    }
  );

  static removeBoard = createAsyncThunk(
    "task/removeBoard",
    async ({ boardId }: { boardId: string }, { rejectWithValue }) => {
      try {
        const { data } = await TaskService.removeBoard({ boardId });
        return data;
      } catch (err: any) {
        return rejectWithValue(
          err?.response?.data?.message || "An error occurred with the network"
        );
      }
    }
  );
}

export default TaskOperations;
