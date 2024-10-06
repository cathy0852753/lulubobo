import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const Provider = ({ children }) => {
  const [user, setUser] = useState(null);


  const login = (userInfo) => {
    setUser(userInfo);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  return useContext(AuthContext);
};
