import { StyledContainer, DepartmentSelect} from "./styled";
import { InputRightElement, InputGroup, Input, Button as ChakraButton } from "@chakra-ui/react";
import { useGlobalObjects } from "@components/GlobalContextProvider";
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
      <InputGroup>
        <Input
        // Input component
          classNamePrefix="react-input"    
          bg="#E9E9E9"
          width="238px"
          height="4rem"
          fontSize="1.5rem"
          letterSpacing=".1rem"
          border='0rem'
          borderRadius="10px"
          autoComplete="off"
          spellCheck={false}
          placeholder="Enter Course name here..."
          left="-1"
          
          borderColor={themeStyles.colors.inputFormBorder}
          _hover={{
            borderColor: themeStyles.colors.inputFormBorderHover,
          }}
          // Letters inside input box
          _placeholder={{
            paddingTop: "2rem",
            color: "darkslategrey",
            fontSize: "1.6rem",
          }}
        />
        {/* WORK IN PROGRESS */}
        <InputRightElement 
          children={<FontAwesomeIcon>icon="fa-regular fa-circle-xmark"</FontAwesomeIcon>}>
        </InputRightElement>
      </InputGroup>
      
    {/* Search Button Icon */}
      <ChakraButton
        right="20"
        mt=".4rem"
        width="111px"
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
        // WORK IN PROGRESS
        // Work on moving it to the right
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

