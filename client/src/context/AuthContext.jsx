import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(localStorage.getItem("portfolio_token") || "");

  const value = useMemo(
    () => ({
      token,
      isAuthed: Boolean(token),
      setToken: (newToken) => {
        setTokenState(newToken);
        localStorage.setItem("portfolio_token", newToken);
      },
      logout: () => {
        setTokenState("");
        localStorage.removeItem("portfolio_token");
      }
    }),
    [token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}