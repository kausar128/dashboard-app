import { createContext, useContext, useEffect } from "react";
import apiClient from "./apiClient";
import { setupInterceptors } from "./setupInterceptors";
import { useApiState } from "../state/api/ApiStateContext";

const ApiClientContext = createContext(apiClient);

export const ApiClientProvider = ({ children }: { children: React.ReactNode }) => {
  const apiState = useApiState();

  useEffect(() => {
    setupInterceptors(apiClient, apiState);
  }, []);

  return (
    <ApiClientContext.Provider value={apiClient}>
      {children}
    </ApiClientContext.Provider>
  );
};

export const useApiClient = () => useContext(ApiClientContext);
