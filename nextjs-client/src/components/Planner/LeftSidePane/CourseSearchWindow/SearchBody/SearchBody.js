import { StyledContainer } from "./styled";
import { Box } from "@chakra-ui/react"; // Divider
import { useGlobalObjects } from "@components/GlobalContextProvider";

export const SearchBody = ({ searchResults }) => {
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
          ) : null}
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
      {/* Dynamically loaded class information */}
      {/* <Box
        bg="#C4C4C4"
        p={4}
        color="WHITE"
        fontSize={"19px"}
        font
        borderRadius={"8px"}
        height="45px"
        
        width="150px"
      >
        IN4MATX 121
      </Box> */}
    </StyledContainer>
  );
};
