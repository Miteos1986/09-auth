import axios from "axios";

/*const baseURL = "/api";

export const API = axios.create({
  baseURL,
  withCredentials: true,
});*/

export const API = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  withCredentials: true,
});
