import { StyledContainer, DepartmentSelect} from "./styled";
import { Input, Button as ChakraButton } from "@chakra-ui/react";
import { useGlobalObjects } from "@components/GlobalContextProvider";
import { DefaultButton } from "@components/CustomChakraUI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Icon, createIcon } from '@chakra-ui/react'

export const SearchControl = () => {
const { themeMode, themeStyles } = useGlobalObjects();
  return (
    // Select a department Icon
    <StyledContainer>
      <DepartmentSelect
        classNamePrefix="react-select"
        placeholder="Department..."
      />
      <Input
    // Input component
        bg="white"
        width="100"
        height="4rem"
        fontSize="1.5rem"
        letterSpacing=".1rem"
        borderRadius="10px"
        autoComplete="off"
        spellCheck={false}
        placeholder="Enter Course name here..."
        borderColor={themeStyles.colors.inputFormBorder}
        _hover={{
          borderColor: themeStyles.colors.inputFormBorderHover,
        }}
        _placeholder={{
          paddingTop: "2rem",
          color: "darkslategrey",
          fontSize: "1.4rem",
          
        }}
      />
    {/* Search Button Icon */}
      <DefaultButton padding="2rem 1.5rem">
        
        <FontAwesomeIcon icon={["fas", "search"]} size="1x" style={{}} />
      </DefaultButton>
      
    {/* Search Button Icon */}
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
        Search
      </ChakraButton>
    {/* Top Right Exit Icon */}
    <FontAwesomeIcon
        
        className="remove-box-icon"
        icon={["fas", "times"]}
        
        style={{
          fontSize: "2rem",
          color: "#E34522"   
        }}
      />
    
    </StyledContainer>
  );
};

