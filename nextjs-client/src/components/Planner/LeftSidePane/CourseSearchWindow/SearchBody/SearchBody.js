import {StyledContainer} from "./styled";
import { Divider  } from "@chakra-ui/react";
import { useGlobalObjects } from "@components/GlobalContextProvider";
import React from 'react';

export const SearchBody = ({ }) => {
const { } = useGlobalObjects();
    return(        
        <StyledContainer>
            Results
            <Divider colorScheme="re" />
            Course Info
        </StyledContainer>
    );
};


// THINK ABOUT IMPLEMENTING TOAST WHEN USER ADDS CLASS
// https://chakra-ui.com/docs/components/feedback/toast