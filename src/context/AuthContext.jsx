import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    // Perform authentication logic (e.g., API call)
    // Update user state if authentication is successful
    setUser(userData);
  };

  const logout = () => {
    // Perform logout logic (e.g., clear localStorage)
    // Update user state to null
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
