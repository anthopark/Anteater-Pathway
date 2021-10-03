import { createContext } from "react";
import { useDarkMode } from "src/hooks/useDarkMode";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const { theme, themeToggler } = useDarkMode();

  return (
    <GlobalContext.Provider
      value={{
        theme,
        themeToggler,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
