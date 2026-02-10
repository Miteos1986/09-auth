import axios from "axios";

const baseURL = "/api";

export const API = axios.create({
  baseURL,
  withCredentials: true,
});
