import { StyledContainer } from "./styled";
import SearchControl from "./SearchControl";
import SearchBody from "./SearchBody";
import { useState } from "react";

export const CourseSearchWindow = ({ isSearchOpen, setIsSearchOpen }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [courseNumber, setCourseNumber] = useState([]);

  return (
    <StyledContainer isSearchOpen={isSearchOpen}>
      <div className="header">
        <SearchControl
          isSearchOpen={isSearchOpen}
          setIsSearchOpen={setIsSearchOpen}
          setSearchResults={setSearchResults}
          setCourseNumber={setCourseNumber}
        />
      </div>
      <div className="body">
        <SearchBody searchResults={searchResults} courseNumber={courseNumber} />
      </div>
      <div className="footer"></div>
    </StyledContainer>
  );
};
