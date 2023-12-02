// context/AuthContext.js
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(""); // Add role state

  const login = (userRole) => {
    setIsLoggedIn(true);
    setRole(userRole); // Set the role when logging in
  };

  const logout = () => {
    setIsLoggedIn(false);
    setRole(""); // Clear the role when logging out
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, role }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
