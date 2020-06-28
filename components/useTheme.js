import React, { createContext, useContext } from 'react';

const Context = createContext({});

export function ThemeProvider({ children, theme }) {
  return (
    <Context.Provider value={theme}>
      {children}
    </Context.Provider>
  );
}

export default function useTheme() {
  return useContext(Context);
}
