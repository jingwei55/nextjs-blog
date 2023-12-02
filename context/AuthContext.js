// context/AuthContext.js
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [userID, setUserID] = useState(""); // Add userID state

  const login = (userRole, userID) => {
    setIsLoggedIn(true);
    setRole(userRole);
    setUserID(userID); // Set the userID when logging in
  };

  const logout = () => {
    setIsLoggedIn(false);
    setRole("");
    setUserID("");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, role, userID }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
