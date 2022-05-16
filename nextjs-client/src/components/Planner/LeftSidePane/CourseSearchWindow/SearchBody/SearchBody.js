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
                width="363px"
            >
                Course Name Course Units
                Offering history
                List of available quarters...

                Prerequisite
                List of classes...

                + More info
            </Box>
        </StyledContainer>
    );
};