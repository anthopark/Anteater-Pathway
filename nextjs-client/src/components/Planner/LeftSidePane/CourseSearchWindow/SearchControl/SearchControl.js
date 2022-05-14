import { StyledContainer, DepartmentSelect, RemoveBox1} from "./styled";
import { InputRightElement, InputGroup, Input, Button as ChakraButton, Center } from "@chakra-ui/react";
import { useGlobalObjects } from "@components/GlobalContextProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const SearchControl = ({ isSearchOpen, setIsSearchOpen }) => {
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
          height="46px"
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
        left="-60px"
        mt=".4rem"
        width="111px"
        height="46px"
        letterSpacing=".1rem"
        padding="2.1rem 1.6rem"
        colorScheme={themeMode === "light" ? "brand" : null}
        bgColor={themeStyles.colors.defaultButtonBg}
        borderRadius="1rem"
        fontSize="1.6rem"
      >
        Search
      </ChakraButton>
    {/* Top Right Exit Icon */}
    <RemoveBox1>
      <FontAwesomeIcon
          className="remove-box-icon1"
          icon={["fas", "times"]}
          // WORK IN PROGRESS
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          style={{
            fontSize: "2rem",
            color: "#5C5C5C",   
            height: "24px",
            width: "24px"
          }}
        />
      <FontAwesomeIcon icon="fa-regular fa-circle-xmark" />
    </RemoveBox1>
    </StyledContainer>
  );
};

