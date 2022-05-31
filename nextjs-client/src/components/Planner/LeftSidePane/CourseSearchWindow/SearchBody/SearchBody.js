import {
  StyledContainer,
  CompactUIContainer,
  CourseInfoContainer,
  ResultScrollbar
} from "./styled";
import { Box } from "@chakra-ui/react";
import { useGlobalObjects } from "@components/GlobalContextProvider";

const shortenText = (maxCharacters, input) => {
  if (typeof input === "string" && input.length > maxCharacters) {
    return input.slice(0, maxCharacters - 1) + "...";
  }
  return input;
};

const ColoredLine = ({ color, length }) => (
  <lineSpec>
    <hr
      style={{
        color: color,
        backgroundColor: color,
        height: "1px",
        width: length,
        margin: "1px",
      }}
    />
  </lineSpec>
);

export const SearchBody = ({ searchResults }) => {
  const {} = useGlobalObjects();

  const returnAllClasses = searchResults.map((data, idx) => (
    <CompactUIContainer key={idx}>
      <div className="course-code-box">
        <div className="department">{shortenText(7, data.dept_code)}</div>
        <div className="number">{shortenText(5, data.num)}</div>
      </div>
    </CompactUIContainer>
  ));

  return (
    <StyledContainer>
      <ResultScrollbar>
        <div className="result-container">
          Results:
          {searchResults.length === 0 ? (
            <Box
              className="boxy"
              bg="#E7E7E7"
              p={4}
              color="5C5C5C"
              borderRadius={"10px"}
              height="300px"
              width="235px"
            >
              Please Select Department first to begin searching for courses
            </Box>
          ) : ( returnAllClasses )}
        </div>
      </ResultScrollbar>
      {searchResults.length === 1 ? (
        <CourseInfoContainer>
          <div className="course-container">
            Course Info
            <ColoredLine color="#5C5C5C" length="400px" />
            <Box
              className="myBox"
              bg="#F2F9FF"
              p={4}
              color="5C5C5C"
              borderRadius={"12px"}
              height="275px"
              width="400px"
            >
              <div className="course-data">
                <p className="title">
                  {searchResults[0].title} {searchResults[0].unit} units
                </p>
                <span className="subtitle">Offering history</span>
                <hr />
                {searchResults[0].offered_terms}{" "}
                {/* got to create a map for this too */}
                <br />
                <br />
                <span className="subtitle">Prerequisite</span>
                <hr />
                {shortenText(154, searchResults[0].prereq)}
                <br />
                <br />
                <div className="more">
                  + More Info
                </div>
              </div>
            </Box>
          </div>
        </CourseInfoContainer>
      ) : null}
    </StyledContainer>
  );
};