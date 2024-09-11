import React, { useState, createContext, useEffect } from 'react';

export const StoreContext = createContext(null);

const StoreProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null); // Load token from localStorage
  const [userDetails, setUserDetails] = useState(() => {
    // Retrieve user details from localStorage if available
    const storedUser = localStorage.getItem('userDetails');
    return storedUser ? JSON.parse(storedUser) : {};
  });

  useEffect(() => {
    // Update localStorage whenever userDetails changes
    if (userDetails) {
      localStorage.setItem('userDetails', JSON.stringify(userDetails));
    }
  }, [userDetails]);

  const contextValue = {
    token,
    setToken, 
    setUserDetails,
    userDetails
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
