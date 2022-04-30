import { StyledContainer } from "./styled";
import SearchControl from "./SearchControl";

export const CourseSearchWindow = ({ isSearchOpen }) => {
  return (
    <StyledContainer isSearchOpen={isSearchOpen}>
      <div className="header">
        <SearchControl />
      </div>
      <div className="body"></div>
      <div className="footer"></div>
    </StyledContainer>
  );
};
