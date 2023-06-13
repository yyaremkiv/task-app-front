import { createAsyncThunk } from "@reduxjs/toolkit";
import { ISigninArg, ISignupArg } from "../../Interfaces/dataTypes";
import AuthService from "../../services/AuthService";

class AuthOperations {
  static signin = createAsyncThunk(
    "auth/signin",
    async ({ email, password }: ISigninArg, { rejectWithValue }) => {
      try {
        const { data } = await AuthService.signin({ email, password });
        return data;
      } catch (err: any) {
        return rejectWithValue(
          err?.response?.data?.message || "An error occurred with the network"
        );
      }
    }
  );

  static signup = createAsyncThunk(
    "auth/signup ",
    async ({ username, email, password }: ISignupArg, { rejectWithValue }) => {
      try {
        const { data } = await AuthService.signup({
          username,
          email,
          password,
        });
        return data;
      } catch (err: any) {
        return rejectWithValue(
          err?.response?.data?.message || "An error occurred with the network"
        );
      }
    }
  );

  static logout = createAsyncThunk(
    "auth/logout",
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await AuthService.logout();
        return data;
      } catch (err: any) {
        return rejectWithValue(
          err?.response?.data?.message || "An error occurred with the network"
        );
      }
    }
  );

  static refresh = createAsyncThunk(
    "auth/refresh",
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await AuthService.refresh();
        return data;
      } catch (err: any) {
        return rejectWithValue(
          err?.response?.data?.message || "An error occurred with the network"
        );
      }
    }
  );
}

export default AuthOperations;
