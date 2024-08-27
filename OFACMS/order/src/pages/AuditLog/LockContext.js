// LockContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const LockContext = createContext();

export const LockProvider = ({ children }) => {
  const [lockedStates, setLockedStates] = useState({});

  // useEffect(() => {
  //   // Load the state from sessionStorage when the component mounts
  //   const savedState = sessionStorage.getItem('lockedStates');
  //   if (savedState) {
  //     setLockedStates(JSON.parse(savedState));
  //   }
  // }, []);

  // useEffect(() => {
  //   // Save the state to sessionStorage whenever it changes
  //   sessionStorage.setItem('lockedStates', JSON.stringify(lockedStates));
  // }, [lockedStates]);

  return (
    <LockContext.Provider value={{ lockedStates, setLockedStates }}>
      {children}
    </LockContext.Provider>
  );
};

export const useLockContext = () => useContext(LockContext);
