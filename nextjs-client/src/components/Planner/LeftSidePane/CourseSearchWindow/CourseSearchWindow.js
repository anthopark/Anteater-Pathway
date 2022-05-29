import { StyledContainer } from "./styled";
import SearchControl from "./SearchControl";
import SearchBody from "./SearchBody";
import CourseAddCourses from "./CourseAddCourses";
import { useState } from "react";

export const CourseSearchWindow = ({ isSearchOpen, setIsSearchOpen }) => {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <StyledContainer isSearchOpen={isSearchOpen}>
      <div className="header">
        <SearchControl
          isSearchOpen={isSearchOpen}
          setIsSearchOpen={setIsSearchOpen}
          setSearchResults={setSearchResults}
        />
      </div>
      <div className="body">
        <SearchBody searchResults={searchResults} />
      </div>
      <div className="footer">
        <CourseAddCourses />
      </div>
    </StyledContainer>
  );
};
