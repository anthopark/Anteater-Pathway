import AcademicYearDisplay from "./AcademicYearDisplay";
import CourseSearchWindow from "./CourseSearchWindow";
import { StyledContainer } from "./styled";

export const LeftSidePane = ({ isSearchOpen, setIsSearchOpen }) => {
  return (
    <StyledContainer>
      <CourseSearchWindow
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen}
      />
      <AcademicYearDisplay />
    </StyledContainer>
  );
};
