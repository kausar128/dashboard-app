import { useCallback } from "react";

/**
 * Mock implementation of useAuth to provide an 
 * authentication token for API requests.
 */
export const useAuth = () => {
  // In a real app, this might come from a Context or LocalStorage
  const getToken = useCallback(async (): Promise<string | null> => {
    // Simulate fetching a token (e.g., from Okta or Firebase)
    const token = localStorage.getItem("auth_token");
    
    // For development purposes, returning a dummy string if null
    return token || "dummy_dev_token_12345";
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("auth_token");
    window.location.href = "/login";
  }, []);

  return {
    getToken,
    logout,
    isAuthenticated: !!localStorage.getItem("auth_token"),
  };
};