import { ThemeProvider } from "styled-components";
import GlobalStyles from "../styles/GlobalStyles";
import { StyledLayout } from "./styled";

export const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={{}}>
      <GlobalStyles />
      <StyledLayout>{children}</StyledLayout>
    </ThemeProvider>
  );
};
