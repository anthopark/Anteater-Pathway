import { StyledContainer } from "./styled";
import SearchControl from "./SearchControl";
import SearchBody from "./SearchBody";
import CourseAddCourses from "./CourseAddCourses";

export const CourseSearchWindow = ({ isSearchOpen }) => {
  return (
    <StyledContainer isSearchOpen={isSearchOpen}>
      <div className="header">
        <SearchControl />
      </div>
      <div className="body">
        <SearchBody />
      </div>
      <div className="footer">
        <CourseAddCourses/>
      </div>
    </StyledContainer>
  );
};
