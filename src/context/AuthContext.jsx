import { createContext, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const token = localStorage.getItem("token");
  let user = localStorage.getItem("user");

  if (user) {
    user = JSON.parse(user);
  }
  return <AuthContext.Provider value={{ token, user }}>{children}</AuthContext.Provider>;
};
