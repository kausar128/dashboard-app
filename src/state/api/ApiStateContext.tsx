import { createContext, useContext, useRef, useState, useCallback, useMemo, ReactNode, useEffect } from "react";

interface ApiStateContextType {
  loading: boolean;
  isTimedOut: boolean;
  startRequest: () => void;
  endRequest: () => void;
  resetApiState: () => void;
  requestCount: number;
}

// Timeout duration from environment variables or default to 5s
const SLA_MS = Number(import.meta.env.API_SLA_MS) || 5000;

const ApiStateContext = createContext<ApiStateContextType | null>(null);

export const ApiStateProvider = ({ children }: { children: ReactNode }) => {
  // requestCount tracks how many APIs are currently in-flight
  const [requestCount, setRequestCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isTimedOut, setIsTimedOut] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clears the safety timer to prevent it from firing unnecessarily
  const clearSlaTimer = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  }, []);

  // Cleanup: Ensures no timers are left running if the app/component unmounts
  useEffect(() => {
    return () => clearSlaTimer();
  }, [clearSlaTimer]);

  const startRequest = useCallback(() => {
    // 'prev' is the current number of active requests before this update
    setRequestCount((prev) => {
      // If prev is 0, this is the first request starting, so show the loader
      if (prev === 0) {
        setLoading(true);
        setIsTimedOut(false); // Reset timeout state when a new batch starts
        clearSlaTimer();
        
        // start timer for SLA on very first request, hides loader if API takes too long
        timer.current = setTimeout(() => {
          console.warn("API SLA exceeded: disabling loading state");
          setLoading(false);
          setIsTimedOut(true);
        }, SLA_MS);
      }
      return prev + 1;
    });
  }, [clearSlaTimer]);

  const endRequest = useCallback(() => {
    // 'prev' is the number of active requests before one finishes
    setRequestCount((prev) => {
      // 'next' calculates the new count, ensuring it never goes below 0
      const next = Math.max(0, prev - 1);
      
      // If next is 0, all active requests have finished; hide the loader
      if (next === 0) {
        clearSlaTimer();
        setLoading(false);
        setIsTimedOut(false);
      }
      // Update the state to the new count
      return next;
    });
  }, [clearSlaTimer]);

  const resetApiState = useCallback(() => {
    setRequestCount(0);
    setLoading(false);
    setIsTimedOut(false);
    clearSlaTimer();
  }, [clearSlaTimer]);

  const value = useMemo(() => ({
    loading,
    requestCount,
    isTimedOut,
    startRequest,
    endRequest,
    resetApiState
  }), [loading, requestCount, isTimedOut, startRequest, endRequest, resetApiState]);

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