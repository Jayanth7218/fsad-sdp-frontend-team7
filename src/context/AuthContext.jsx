import { createContext, useContext, useState, useEffect } from "react";
import { getAuthData, logoutUser } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: null,
    role: null,
    userId: null,
    username: null,
  });

  useEffect(() => {
    const data = getAuthData();
    setAuth(data);
  }, []);

  const logout = () => {
    logoutUser();
    setAuth({
      token: null,
      role: null,
      userId: null,
      username: null,
    });
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);