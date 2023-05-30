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
import storage from "redux-persist/lib/storage";
import authSlice from "./auth/authSlice";
import userSlice from "./user/userSlice";
import taskSlice from "./task/taskSlice";

const persistAuthConfig = {
  key: "auth",
  storage,
  whitelist: ["accessToken", "isLogged", "user"],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(persistAuthConfig, authSlice),
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
