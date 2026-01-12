import { AxiosInstance } from "axios";

export const setupInterceptors = (
  client: AxiosInstance,
  apiState: { startRequest: () => void; endRequest: () => void }
) => {
  client.interceptors.request.use((config) => {
    apiState.startRequest();
    return config;
  });

  client.interceptors.response.use(
    (res) => {
      apiState.endRequest();
      return res;
    },
    (err) => {
      apiState.endRequest();
      return Promise.reject(err);
    }
  );
};
