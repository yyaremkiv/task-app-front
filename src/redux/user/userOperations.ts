import { createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "../../services/UserService";

class UserOperations {
  static getUser = createAsyncThunk<any, void, { rejectValue: string }>(
    "user/getUser",
    async (_, { rejectWithValue }) => {
      try {
        const { data }: any = await UserService.getUser();
        return data;
      } catch (err: any) {
        return rejectWithValue(
          err?.response?.data?.message || "An error occurred with the network"
        );
      }
    }
  );
}

export default UserOperations;
