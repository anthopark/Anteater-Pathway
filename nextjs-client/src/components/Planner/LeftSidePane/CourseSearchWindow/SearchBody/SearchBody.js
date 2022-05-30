import { StyledContainer, CompactUIContainer, CourseInfoContainer, lineSpec } from "./styled";
import { Box } from "@chakra-ui/react"; 
import { useGlobalObjects } from "@components/GlobalContextProvider";
import { Course } from "src/entities/course";

const shortenText = (maxCharacters, input) => {
  if (typeof input === "string" && input.length > maxCharacters) {
    return input.slice(0, maxCharacters - 1) + "...";
  }
  return input;
};

// function returnAllClasses() {
//   return (
    // <CompactUIContainer>
    // <div className="course-code-box">
    //   <div className="department">
    //     {shortenText(7, searchResults.map((data) => { dept_code={data} }))}
    //   </div>
    //   <div className="number">{shortenText(5, searchResults.map((data) => { num={data} }))}</div>
    // </div>
    // </CompactUIContainer>
//   )
// };

const ColoredLine = ({ color, length }) => (
  <lineSpec>
    <hr
      style={{
          color: color,
          backgroundColor: color,
          height: "1px",
          width: length,
          margin: "1px"
      }}
    />
  </lineSpec>
);

export const SearchBody = ({ searchResults/*, courseNumber*/ }) => {
  const {} = useGlobalObjects();

  const returnAllClasses = searchResults.map((data) => 
    <CompactUIContainer>
    <div className="course-code-box">
      <div className="department">
        {shortenText(7, data.dept_code)}
      </div>
      <div className="number">{shortenText(5, data.num)}</div>
    </div>
    </CompactUIContainer>
  );

  return (
    <StyledContainer>
      {/* RESULT BOX */}
      {/* <resultScrollbar> */}
        <div className="result-container">
          Results
          <ColoredLine color="#5C5C5C" length="311px"/>
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
          ) : returnAllClasses
          // Dynamically loaded class information
          // <CompactUIContainer
          // //onClick={() => showCourseInfo()}
          // >
          //   <div className="course-code-box">
          //     <div className="department">
          //       {shortenText(7, searchResults[0].dept_code)}
          //     </div>
          //     <div className="number">{shortenText(5, searchResults[0].num)}</div>
          //   </div>
          // </CompactUIContainer>
          }
        </div>
      {/* </resultScrollbar> */}
      { searchResults.length === 0 ? ( null ) : 
        <CourseInfoContainer>
          <div className="course-container">
            Course Info
            <ColoredLine color="#5C5C5C" length="400px"/>
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
                <p className="title">{searchResults[0].title} {searchResults[0].unit} units</p>
                <span className= "subtitle">Offering history</span>
                <hr />
                {searchResults[0].offered_terms}
                <br />
                <br />
                <span className= "subtitle">Prerequisite</span>
                <hr />
                {shortenText(154, searchResults[0].prereq)}
                <br />
                <br />
                <div className= "more"
                  // onClick={height ="300px"}
                >
                  + More Info
                </div>
              </div>
            </Box>
          </div>
        </CourseInfoContainer>
      }
    </StyledContainer>
  );
};


/* searchResults DATA STRUCTURE:
  dept_code: 
  num:
  title:
  unit:
  desc:
  offered_terms:
  prereq:
*/