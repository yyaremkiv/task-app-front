import axios from "axios";

const API = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_BASE_URL,
});

API.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem("token")
    ? `Bearer ${localStorage.getItem("token")}`
    : " ";

  return config;
});

export default API;
