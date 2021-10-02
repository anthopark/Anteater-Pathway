import { ThemeProvider } from "styled-components";
import { Helmet } from "react-helmet";
import { StyledContainer } from "./styled";
import LeftSideBar from "../LeftSideBar";

export const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={{}}>
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="Anteater Pathway"
          content="Drag N Drop UC Irvine Degree Planner"
        />
      </Helmet>
      <StyledContainer>
        <LeftSideBar />
        {children}
      </StyledContainer>
    </ThemeProvider>
  );
};
