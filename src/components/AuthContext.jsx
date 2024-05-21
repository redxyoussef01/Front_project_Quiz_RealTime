// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);


  const setAuthenticatedUserId = (id) => {
    setUserId(id);
  };

 

  return (
    <AuthContext.Provider value={{ userId, setAuthenticatedUserId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
