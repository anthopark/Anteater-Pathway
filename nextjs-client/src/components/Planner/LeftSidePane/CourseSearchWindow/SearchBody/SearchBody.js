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
                height="230px"y
                width="400px"
            >
                Please Select Department first to begin searching for courses 
            </Box>
        </StyledContainer>
    );
};