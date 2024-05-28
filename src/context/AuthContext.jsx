import { createContext, useState, useContext, useCallback } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = useCallback((userData) => {
    // Perform authentication logic (e.g., API call)
    // Update user state if authentication is successful
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    // Perform logout logic (e.g., clear localStorage)
    // Update user state to null
    setUser(null);
    localStorage.removeItem('token');
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
