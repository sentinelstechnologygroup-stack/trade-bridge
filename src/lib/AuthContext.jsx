import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);
const SESSION_KEY = "tradebridge.prototypeSession";

function readSession() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeSession(session) {
  if (typeof window === "undefined") return;
  if (!session) {
    window.localStorage.removeItem(SESSION_KEY);
    return;
  }
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  useEffect(() => {
    setSession(readSession());
    setIsLoadingAuth(false);
  }, []);

  const checkUserAuth = useCallback(() => {
    const nextSession = readSession();
    setSession(nextSession);
    return nextSession;
  }, []);

  const loginAsPrototype = useCallback((email) => {
    const nextSession = {
      email: email || "operator@tradeconnect.us",
      role: "Prototype Operator",
      loggedInAt: new Date().toISOString(),
      prototypeOnly: true,
    };
    writeSession(nextSession);
    setSession(nextSession);
    return nextSession;
  }, []);

  const logout = useCallback(() => {
    writeSession(null);
    setSession(null);
  }, []);

  const navigateToLogin = useCallback(() => {
    if (typeof window !== "undefined") {
      window.location.assign("/portal/login");
    }
  }, []);

  const value = useMemo(() => ({
    user: session,
    isAuthenticated: Boolean(session),
    isLoadingAuth,
    isLoadingPublicSettings: false,
    authError: null,
    appPublicSettings: {
      prototypeOnly: true,
      authMode: "local-placeholder",
    },
    authChecked: !isLoadingAuth,
    loginAsPrototype,
    logout,
    navigateToLogin,
    checkUserAuth,
    checkAppState: checkUserAuth,
  }), [session, isLoadingAuth, loginAsPrototype, logout, navigateToLogin, checkUserAuth]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
