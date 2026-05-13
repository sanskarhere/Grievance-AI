import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { authClient } from "../lib/auth";

interface User {
  id: string;
  email: string;
  name: string;
  emailVerified: boolean;
  image?: string | null;
  createdAt: string;
  updatedAt: string;
}

interface Session {
  id: string;
  userId: string;
  token: string;
  expiresAt: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (data: { name: string; email: string; password: string }) => Promise<{ error?: string }>;
  signIn: (data: { email: string; password: string }) => Promise<{ error?: string }>;
  signInWithGoogle: () => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshSession = useCallback(async () => {
    try {
      const result = await authClient.getSession();
      if (result.data?.session && result.data?.user) {
        setSession(result.data.session as unknown as Session);
        setUser(result.data.user as unknown as User);
      } else {
        setSession(null);
        setUser(null);
      }
    } catch {
      setSession(null);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    refreshSession().finally(() => setLoading(false));
  }, [refreshSession]);

  const signUp = useCallback(async (data: { name: string; email: string; password: string }) => {
    try {
      const result = await authClient.signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (result.error) {
        return { error: (result.error as any).message || "Sign up failed" };
      }

      // After signup, refresh the session
      await refreshSession();
      return {};
    } catch (err: any) {
      return { error: err?.message || "Sign up failed" };
    }
  }, [refreshSession]);

  const signIn = useCallback(async (data: { email: string; password: string }) => {
    try {
      const result = await authClient.signIn.email({
        email: data.email,
        password: data.password,
      });

      if (result.error) {
        return { error: (result.error as any).message || "Sign in failed" };
      }

      await refreshSession();
      return {};
    } catch (err: any) {
      return { error: err?.message || "Sign in failed" };
    }
  }, [refreshSession]);

  const signInWithGoogle = useCallback(async () => {
    try {
      const result = await authClient.signIn.social({
        provider: "google"
      });
      if (result.error) {
        return { error: (result.error as any).message || "Google sign in failed" };
      }
      return {};
    } catch (err: any) {
      return { error: err?.message || "Google sign in failed" };
    }
  }, []);

  const handleSignOut = useCallback(async () => {
    await authClient.signOut();
    setSession(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      session,
      loading,
      signUp,
      signIn,
      signInWithGoogle,
      signOut: handleSignOut,
      refreshSession,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
