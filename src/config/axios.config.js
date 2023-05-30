import axios from "axios";
import AuthOperations from "../redux/auth/AuthOperations";
import TaskOperations from "../redux/task/taskOperations";
import { resetRefreshAttempts } from "../redux/auth/authSlice";

let store;
export const injectStore = (_store) => {
  store = _store;
};

const API = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_BASE_URL,
});

API.interceptors.request.use((config) => {
  const accessToken = store.getState().auth.accessToken;
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

API.interceptors.response.use(
  (config) => config,

  async (err) => {
    const originalRequest = err.config;

    if (err?.response?.status === 401 && err.config && !err.config._isRetry) {
      originalRequest._isRetry = true;
      try {
        const refreshAttempts = store.getState().auth.refreshAttempts;

        if (refreshAttempts < 1) {
          store.dispatch({ type: "auth/incrementRefreshAttempts" });

          await store.dispatch(AuthOperations.refresh());
          await store.dispatch(TaskOperations.getBoards());

          return API(originalRequest);
        } else {
          store.dispatch(resetRefreshAttempts());
          throw new Error("Authentication error");
        }
      } catch (error) {
        store.dispatch(resetRefreshAttempts());
        throw new Error("Authentication error");
      }
    }
    return Promise.reject(err);
  }
);

export default API;
