import type { AxiosInstance, AxiosResponse } from "axios";
import axios from "axios";
import { setupMockApi } from "./mockApi";

export type ShowMessageFn = (msg: string, severity?: 'error' | 'warning' | 'info' | 'success') => void;
export type GetTokenFn = () => string | Promise<string> | null | undefined;

let requestInterceptorId: number | null = null;
let responseInterceptorId: number | null = null;

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: import.meta.env.VITE_API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

if (import.meta.env.VITE_USE_MOCK_API === 'true') {
  setupMockApi(apiClient);
  console.info("Mock API Enabled");
}

export const setupInterceptors = (
  getToken: GetTokenFn, 
  showMessage: ShowMessageFn,
  actions: { startRequest: () => void; endRequest: () => void }
) => {
  if (requestInterceptorId !== null) {
    apiClient.interceptors.request.eject(requestInterceptorId);
  }
  if (responseInterceptorId !== null) {
    apiClient.interceptors.response.eject(responseInterceptorId);
  }

  requestInterceptorId = apiClient.interceptors.request.use(async (config) => {
    actions.startRequest(); // Trigger global loading
    try {
      const token = await getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (err) {
      console.error("Failed to attach token", err);
      showMessage("Failed to attach token", "error");
    }
    return config;
  });

  responseInterceptorId = apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
      actions.endRequest(); // End global loading
      return response;
    },
    (error) => {
      actions.endRequest(); // End global loading on error
      if (error.response) {
        const status = error.response.status;
        const msg = error.response.data?.message || "Something went wrong/ Internal server error";
        showMessage(msg, 'error');
        if (status === 401) {
          console.warn("Unauthorized! Redirecting to Login.");
        }
      } else if (error.request) {
        showMessage("No response from server. Check your network.", "error");
      } else {
        showMessage(error.message, "error");
      }
      return Promise.reject(error);
    }
  );
};

export default apiClient;