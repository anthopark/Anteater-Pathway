import { Button as ChakraButton } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StyledContainer } from "./styled";
import { useGlobalObjects } from "@components/GlobalContextProvider";

export const SearchButtonSwitch = ({ isSearchOpen, setIsSearchOpen }) => {
  const { themeMode, themeStyles } = useGlobalObjects();

  return (
    //Course Button
    <StyledContainer>
      
      <ChakraButton
        mt=".4rem"
        letterSpacing=".1rem"
        padding="2.1rem 1.6rem"
        colorScheme={themeMode === "light" ? "brand" : null}
        bgColor={themeStyles.colors.defaultButtonBg}
        borderRadius="1rem"
        fontSize="1.6rem"
        _hover={{ backgroundColor: "brand.400" }}
        onClick={() => setIsSearchOpen(!isSearchOpen)}
      >
        
        Search Classes
      </ChakraButton>
      {/* Ctrl + / */}
      <ChakraButton
        right="-1em"
        mt=".4rem"
        letterSpacing=".1rem"
        padding="2.1rem 1.6rem"
        colorScheme={themeMode === "light" ? "brand" : null}
        bgColor={themeStyles.colors.defaultButtonBg}
        borderRadius="1rem"
        fontSize="1.6rem"
        _hover={{ backgroundColor: "brand.400" }}
        onClick={() => setIsSearchOpen(!isSearchOpen)}
      >
        Custom Course
      </ChakraButton>
    </StyledContainer>
  );
};
