import { createContext, useContext, useRef, useState, useCallback, useMemo, ReactNode } from "react";

interface ApiStateContextType {
  loading: boolean;
  startRequest: () => void;
  endRequest: () => void;
}

const SLA_MS = Number(import.meta.env.API_SLA_MS) || 5000;

const ApiStateContext = createContext<ApiStateContextType | null>(null);

export const ApiStateProvider = ({ children }: { children: ReactNode }) => {
  const [requestCount, setRequestCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startRequest = useCallback(() => {
    setRequestCount((prev) => {
      if (prev === 0) {
        setLoading(true);
        // Clear any existing timer just in case
        if (timer.current) clearTimeout(timer.current);
        
        timer.current = setTimeout(() => {
          console.warn("API SLA exceeded: disabling loading state");
          setLoading(false);
        }, SLA_MS);
      }
      return prev + 1;
    });
  }, []);

  const endRequest = useCallback(() => {
    setRequestCount((prev) => {
      const next = Math.max(0, prev - 1);
      if (next === 0) {
        if (timer.current) {
          clearTimeout(timer.current);
          timer.current = null;
        }
        setLoading(false);
      }
      return next;
    });
  }, []);

  // Memoize the value to prevent unnecessary re-renders of consumers
  const value = useMemo(() => ({
    loading,
    startRequest,
    endRequest
  }), [loading, startRequest, endRequest]);

  return (
    <ApiStateContext.Provider value={value}>
      {children}
    </ApiStateContext.Provider>
  );
};

export const useApiState = () => {
  const context = useContext(ApiStateContext);
  if (!context) {
    throw new Error("useApiState must be used within an ApiStateProvider");
  }
  return context;
};