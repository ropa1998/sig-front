import React, { useContext, useState, createContext, useEffect } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    }
  }, []);

  const getUserInfo = () => isLoggedIn;

  const isUserLoggedIn = () => {
    return localStorage.getItem("token");
  };

  const logOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
  };

  const setUserInfo = (response) => {
    setIsLoggedIn(true);
    localStorage.setItem("token", response.headers.token);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, logOut, getUserInfo, setUserInfo, isUserLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
}
