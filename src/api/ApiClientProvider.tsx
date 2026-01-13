import type { AxiosInstance } from "axios";
import { createContext, useContext, useEffect } from "react";
import { useAuth } from "../auth/useAuth";
import { useGlobalSnackbar } from "../utils/GlobalStackbar";
import apiClient, { setupInterceptors } from "./apiClient";
import { useApiState } from "../state/api/ApiStateContext";

const ApiClientContext = createContext<AxiosInstance | null>(null);

export const ApiClientProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const { getToken } = useAuth();
  const { showMessage } = useGlobalSnackbar();
  const { startRequest, endRequest } = useApiState();

  useEffect(() => {
    setupInterceptors(getToken, showMessage, { startRequest, endRequest });
  }, [getToken, showMessage, startRequest, endRequest]);

  return (
    <ApiClientContext.Provider value={apiClient}>
      {children}
    </ApiClientContext.Provider>
  );
};

export const useApiClient = (): AxiosInstance => {
  const context = useContext(ApiClientContext);
  if (!context) {
    throw new Error("useApiClient must be used within ApiClientProvider");
  }
  return context;
};