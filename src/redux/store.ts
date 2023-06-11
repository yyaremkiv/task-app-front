import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { persistReducer } from "redux-persist";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import storage from "redux-persist/lib/storage";
import authSlice, { IAuthState } from "./auth/authSlice";
import themeSlice, { IThemeState } from "./theme/themeSlice";
import userSlice, { IUserState } from "./user/userSlice";
import taskSlice, { ITaskState } from "./task/taskSlice";

const persistAuthConfig = {
  key: "auth",
  storage,
  whitelist: ["accessToken", "isLogged", "user"],
};

const persistThemeConfig = {
  key: "mode",
  storage,
};

export interface RootState {
  auth: IAuthState;
  theme: IThemeState;
  user: IUserState;
  task: ITaskState;
}

export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;

export const store = configureStore({
  reducer: {
    auth: persistReducer<IAuthState>(persistAuthConfig, authSlice),
    theme: persistReducer<IThemeState>(persistThemeConfig, themeSlice),
    user: userSlice,
    task: taskSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
