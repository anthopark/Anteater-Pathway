import { useGlobalValues } from "@components/GlobalContextProvider";
import { ThemeProvider } from "styled-components";
import { Helmet } from "react-helmet";
import { StyledContainer } from "./styled";
import LeftSideBar from "../LeftSideBar";
import { lightTheme, darkTheme } from "@styles/theme";
import { useDarkMode } from "src/hooks/useDarkMode";

export const PageLayout = ({ children }) => {
  const { theme } = useGlobalValues();
  const { isComponentMounted } = useDarkMode();
  const themeStyles = theme === "light" ? lightTheme : darkTheme;

  if (!isComponentMounted) return null;

  return (
    <ThemeProvider theme={themeStyles}>
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="Anteater Pathway"
          content="Drag N Drop UC Irvine Degree Planner"
        />
        <link rel="icon" type="image/svg" href="/favicon.svg" size="16x16" />
      </Helmet>
      <StyledContainer>
        <LeftSideBar />
        {children}
      </StyledContainer>
    </ThemeProvider>
  );
};
