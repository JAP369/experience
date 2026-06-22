"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

// =============================================================================
// TYPES
// =============================================================================

export interface User {
  id: string;
  email: string;
  full_name: string;
  company?: string;
  phone?: string;
  role: "user" | "admin" | "venue_manager";
  avatar_url?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  devLogin: () => void;
  logout: () => void;
}

// =============================================================================
// DEV USER (Bypass Auth)
// =============================================================================

const DEV_USER: User = {
  id: "dev-user-001",
  email: "dev@experience.hk",
  full_name: "Developer User",
  company: "Experience HK",
  phone: "+852 1234 5678",
  role: "admin",
  avatar_url: undefined,
};

// =============================================================================
// CONTEXT
// =============================================================================

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// =============================================================================
// PROVIDER
// =============================================================================

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(DEV_USER); // Auto-login as dev user
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // For demo, accept any valid email/password combination
    if (email && password.length >= 6) {
      setUser({
        id: "user-" + Date.now(),
        email,
        full_name: email.split("@")[0].replace(/[._]/g, " "),
        role: "user",
      });
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  }, []);

  const devLogin = useCallback(() => {
    setUser(DEV_USER);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        devLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// =============================================================================
// HOOK
// =============================================================================

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
