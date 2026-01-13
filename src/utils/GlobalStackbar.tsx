import { createContext, useContext, useState, useCallback, ReactNode } from "react";

type Severity = 'error' | 'warning' | 'info' | 'success';

interface SnackbarContextType {
  showMessage: (msg: string, severity?: Severity) => void;
}

const GlobalSnackbarContext = createContext<SnackbarContextType | null>(null);

export const GlobalSnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<Severity>("info");

  const showMessage = useCallback((msg: string, sev: Severity = "info") => {
    setMessage(msg);
    setSeverity(sev);
    setOpen(true);
    
    // Auto-hide after 5 seconds
    setTimeout(() => setOpen(false), 5000);
  }, []);

  return (
    <GlobalSnackbarContext.Provider value={{ showMessage }}>
      {children}
      {/* Simple absolute positioned UI for the snackbar */}
      {open && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          padding: '12px 24px',
          backgroundColor: severity === 'error' ? '#d32f2f' : '#2e7d32',
          color: 'white',
          borderRadius: '4px',
          boxShadow: '0px 3px 5px rgba(0,0,0,0.2)',
          zIndex: 9999
        }}>
          {message}
        </div>
      )}
    </GlobalSnackbarContext.Provider>
  );
};

export const useGlobalSnackbar = () => {
  const context = useContext(GlobalSnackbarContext);
  if (!context) {
    throw new Error("useGlobalSnackbar must be used within a GlobalSnackbarProvider");
  }
  return context;
};