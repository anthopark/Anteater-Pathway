import { createContext, useContext } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, chakraTheme } from "@styles/theme";
import { useAppUser } from "src/hooks/useAppUser";
import { useDarkMode } from "src/hooks/useDarkMode";

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const { themeMode, themeToggler, isComponentMounted } = useDarkMode();
  const { appUser, setAppUser } = useAppUser();

  const themeStyles = themeMode === "light" ? lightTheme : darkTheme;

  if (!isComponentMounted) return null;

  return (
    <GlobalContext.Provider
      value={{
        themeMode,
        themeToggler,
        appUser,
        setAppUser,
      }}
    >
      <ChakraProvider theme={chakraTheme}>
        <ThemeProvider theme={themeStyles}>{children}</ThemeProvider>
      </ChakraProvider>
    </GlobalContext.Provider>
  );
};

export const useGlobalObjects = () => useContext(GlobalContext);
