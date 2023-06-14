import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  const setUser = (user) => {
    setSelectedUser(user);
  };

  return (
    <UserContext.Provider value={{ selectedUser, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
