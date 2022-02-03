import { Helmet } from "react-helmet";
import { StyledContainer } from "./styled";
import LeftSideBar from "../LeftSideBar";

export const PageLayout = ({ children }) => {
  return (
    <>
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
    </>
  );
};
