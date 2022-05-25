import {StyledContainer} from "./styled";
import { Divider, Box  } from "@chakra-ui/react";
import { useGlobalObjects } from "@components/GlobalContextProvider";

export const SearchBody = ({ }) => {
const { } = useGlobalObjects();
    return(        
        <StyledContainer>
            Results
            <Divider colorScheme="red" />
            Course Info
            <Box 
                bg='#E7E7E7' 
                p={4} 
                color='5C5C5C' 
                borderRadius={"10px"}
                height="241px"y
                width="363px"
            >
                Please Select Department first to begin searching for courses 
            </Box>
            <Box 
                bg='#F2F9FF' 
                p={4} 
                color='5C5C5C' 
                borderRadius={"10px"}
                height="241px"y
                width="400px"
            >
                <div>
                    <p>Course Name Course Units</p>
                    <span>
                        Offering history
                    </span>
                    <hr/>
                    Insert function to populate available quarters
                    <br/>
                    <br/>
                    <span>
                        Prerequisite
                    </span>
                    <hr/>
                    <br/>Insert function to populate available classes
                    <br/>+ More info
                </div>
            </Box>
            <Box
                bg='#C4C4C4' 
                p={4} 
                color='WHITE'
                fontSize={"19px"}
                font 
                borderRadius={"8px"}
                height="45px"y
                width="150px"
            >
                IN4MATX 121
            </Box>
        </StyledContainer>
    );
};