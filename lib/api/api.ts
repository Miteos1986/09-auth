import axios from "axios";

/*const baseURL = process.env.NEXT_PUBLIC_API_URL + "/api";*/
const baseURL = "/api";

export const API = axios.create({
  baseURL,
  withCredentials: true,
});
