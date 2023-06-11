import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import UserOperations from "./userOperations";

export interface IUserState {
  data: any;
  isLoading: boolean;
  error: string | null;
}

const initialState: IUserState = {
  data: {},
  isLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(UserOperations.getUser.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(UserOperations.getUser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(
      UserOperations.getUser.rejected,
      (state: IUserState, action: PayloadAction<any>) => {
        state.error = action.payload;
        state.isLoading = false;
      }
    );
  },
  reducers: {},
});

export default userSlice.reducer;
