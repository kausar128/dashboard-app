import { createContext, useContext, useRef, useState } from "react";

const SLA_MS = 60000;

const ApiStateContext = createContext<any>(null);

export const ApiStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const timer = useRef<any>(null);

  const startRequest = () => {
    setCount((c) => {
      if (c === 0) {
        setLoading(true);
        timer.current = setTimeout(() => setLoading(false), SLA_MS);
      }
      return c + 1;
    });
  };

  const endRequest = () => {
    setCount((c) => {
      const next = Math.max(0, c - 1);
      if (next === 0) {
        clearTimeout(timer.current);
        setLoading(false);
      }
      return next;
    });
  };

  return (
    <ApiStateContext.Provider value={{ loading, startRequest, endRequest }}>
      {children}
    </ApiStateContext.Provider>
  );
};

export const useApiState = () => useContext(ApiStateContext);
