import type React from "react";
import { createContext, useState, useCallback, useRef } from "react";
import { authService } from "../services/auth.service";

export interface User {
  id: string;
  username: string;
  role: "admin";
  email?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  loading: false,
  login: async () => false,
  logout: async () => {},
  checkAuth: async () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // Prevent multiple simultaneous auth checks
  const isCheckingRef = useRef<boolean>(false);
  const hasCheckedRef = useRef<boolean>(false);

  const checkAuth = useCallback(async () => {
    // Prevent multiple simultaneous checks
    if (isCheckingRef.current) {
      console.log("Auth check already in progress, skipping...");
      return;
    }

    // If we've already checked and user is authenticated, don't check again
    if (hasCheckedRef.current && isAuthenticated) {
      console.log("Already authenticated, skipping auth check");
      return;
    }

    try {
      isCheckingRef.current = true;
      setLoading(true);
      console.log("Checking authentication status...");

      const response = await authService.getCurrentUser();
      console.log("Auth check response:", response);

      if (response.success && response.user) {
        setUser(response.user as User);
        setIsAuthenticated(true);
        console.log("User is authenticated:", response.user);
      } else {
        setUser(null);
        setIsAuthenticated(false);
        console.log("User is not authenticated");
      }

      hasCheckedRef.current = true;
    } catch (error) {
      console.error("Auth check failed:", error);
      setUser(null);
      setIsAuthenticated(false);
      hasCheckedRef.current = true;
    } finally {
      setLoading(false);
      isCheckingRef.current = false;
    }
  }, [isAuthenticated]); // Only depend on isAuthenticated

  const login = useCallback(
    async (username: string, password: string): Promise<boolean> => {
      try {
        setLoading(true);
        console.log("Sending login request...");
        const response = await authService.login({ username, password });
        console.log("Login response:", response);

        // Handle your backend's response format: { tokenUser: { username, role, userId, pfp_url } }
        if (response && response.tokenUser) {
          const userData = {
            id: response.tokenUser.userId,
            username: response.tokenUser.username,
            role: response.tokenUser.role as "admin",
          };

          setUser(userData);
          setIsAuthenticated(true);
          hasCheckedRef.current = true; // Mark as checked after successful login
          console.log("Login successful, user set:", userData);
          return true;
        }

        // If we get here, login failed
        console.log("Login failed - no tokenUser in response");
        setUser(null);
        setIsAuthenticated(false);
        return false;
      } catch (error) {
        console.error("Login failed with error:", error);
        setUser(null);
        setIsAuthenticated(false);
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      hasCheckedRef.current = false; // Reset check status on logout
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
