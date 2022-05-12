import { StyledContainer, DepartmentSelect} from "./styled";
import { Input, Button as ChakraButton } from "@chakra-ui/react";
import { useGlobalObjects } from "@components/GlobalContextProvider";
import { DefaultButton } from "@components/CustomChakraUI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
        classNamePrefix="react-input"    
        bg="#E9E9E9"
        width="100"
        height="4rem"
        fontSize="1.5rem"
        letterSpacing=".1rem"
        border='0rem'
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
        // Add onclick functionality
        //onClick={() => functionName}
        style={{
          fontSize: "2rem",
          color: "#5C5C5C",   
        }}
      />
    <FontAwesomeIcon icon="fa-regular fa-circle-xmark" />
    </StyledContainer>
  );
};

