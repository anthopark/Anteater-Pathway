import { createContext, useContext } from "react";
import { useAppUser } from "src/hooks/useAppUser";
import { useDarkMode } from "src/hooks/useDarkMode";

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const { themeMode, themeToggler } = useDarkMode();
  const { appUser, setAppUser } = useAppUser();
  return (
    <GlobalContext.Provider
      value={{
        themeMode,
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
