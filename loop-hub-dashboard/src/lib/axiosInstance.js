import axios from "axios";
export const axiosInstance = axios.create({
  baseURL:import.meta.env.VITE_API_BASE_URL, // no need to repeat in store
  withCredentials: true, // if using cookies/JWT with credentials
});
