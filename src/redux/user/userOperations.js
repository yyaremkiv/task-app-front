import { createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "../../services/UserService";

class UserOperations {
  static getUserById = createAsyncThunk(
    "user/getUserById",
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await UserService.getUserById();
        return data;
      } catch (err) {
        return rejectWithValue(
          err?.response?.data?.message || "An error occurred with the network"
        );
      }
    }
  );
}

export default UserOperations;
