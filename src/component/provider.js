import React, { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const Provider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if ((storedUser !== 'undefined') && storedUser) {
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, []);


  const login = (userInfo) => {
    console.log(userInfo);
    setUser(userInfo);
    setIsLoggedIn(true);
    localStorage.setItem('user', JSON.stringify(userInfo.userName));
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  return useContext(AuthContext);
};
