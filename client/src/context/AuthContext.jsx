import { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storeUser = Cookies.get("token");
    return storeUser ? storeUser : null;
  });

  useEffect(() => {
    console.log("User Updated:", user);
  }, [user]);

  const login = ({ userData, userdetails }) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userdetails));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
