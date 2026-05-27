import axios, { type AxiosInstance } from "axios";

const API_URL = import.meta.env.VITE_API_HOST;

export const API = axios.create({
  baseURL: API_URL,
});
export class HttpAPI {
  private static instance: AxiosInstance;

  public static axios(): AxiosInstance {
    if (!HttpAPI.instance) {
      HttpAPI.instance = axios.create({
        baseURL: API_URL,
        headers: { "Content-Type": "application/json" },
      });

      HttpAPI.instance.interceptors.request.use((config) => {
        const token = sessionStorage.getItem("access_token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      });
    }

    return HttpAPI.instance;
  }
}
