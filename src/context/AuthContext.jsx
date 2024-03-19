import { createContext, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ token, user, children }) => {
  return <AuthContext.Provider value={{ token, user }}>{children}</AuthContext.Provider>;
};
