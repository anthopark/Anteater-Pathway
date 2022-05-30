import { StyledContainer, CompactUIContainer } from "./styled";
import { Box } from "@chakra-ui/react"; // Divider
import { useGlobalObjects } from "@components/GlobalContextProvider";

const shortenText = (maxCharacters, input) => {
  if (typeof input === "string" && input.length > maxCharacters) {
    return input.slice(0, maxCharacters - 1) + "...";
  }
  return input;
};

export const SearchBody = ({ searchResults/*, courseNumber*/ }) => {
  const {} = useGlobalObjects();

  return (
    <StyledContainer>
      {/* RESULT BOX */}
      <resultScrollbar>
        <div className="result-container">
          Results
          {searchResults.length === 0 ? (
            <Box
              bg="#E7E7E7"
              p={4}
              color="5C5C5C"
              borderRadius={"10px"}
              height="241px"
              width="363px"
            >
              Please Select Department first to begin searching for courses
            </Box>
          ) : 
          // Dynamically loaded class information
          <CompactUIContainer
          //onClick={() => showCourseInfo()}
          >
            <div className="course-code-box">
              <div className="department">
                {shortenText(7, searchResults[0].dept_code)}
              </div>
              <div className="number">{shortenText(5, searchResults[0].num)}</div>
            </div>
          </CompactUIContainer>}
        </div>
      </resultScrollbar>

      <div className="course-container">
        Course Info
        
          <Box
          bg="#F2F9FF"
          p={4}
          color="5C5C5C"
          borderRadius={"12px"}
          height="241px"
          width="400px"
          >
            <div>
              <p>Course Name Course Units</p>
              <span>Offering history</span>
              <hr />
              Insert function to populate available quarters
              <br />
              <br />
              <span>Prerequisite</span>
              <hr />
              <br />
              Insert function to populate available classes
              <br />+ More info
            </div>
          </Box>
      </div>
    </StyledContainer>
  );
};
