import { createContext, useContext } from "react";
import { useAppUser } from "src/hooks/useAppUser";
import { useDarkMode } from "src/hooks/useDarkMode";

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const { theme, themeToggler } = useDarkMode();
  const { appUser, setAppUser } = useAppUser();
  return (
    <GlobalContext.Provider
      value={{
        theme,
        themeToggler,
        appUser,
        setAppUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalObjects = () => useContext(GlobalContext);
