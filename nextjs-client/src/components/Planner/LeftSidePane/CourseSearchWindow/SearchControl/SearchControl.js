import { StyledContainer, DepartmentSelect } from "./styled";
import { Input } from "@chakra-ui/react";
import { useGlobalObjects } from "@components/GlobalContextProvider";
import { DefaultButton } from "@components/CustomChakraUI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const SearchControl = () => {
  const { themeStyles } = useGlobalObjects();
  return (
    // Select a department Icon
    <StyledContainer>
      <DepartmentSelect
        classNamePrefix="react-select"
        placeholder="Select a department"
      />
      <Input
    // Input component
        bg="white"
        width="13rem"
        height="4rem"
        fontSize="1.5rem"
        letterSpacing=".1rem"
        borderRadius="10px"
        autoComplete="off"
        spellCheck={false}
        placeholder="Ex. 1A, 101"
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
    </StyledContainer>
  );
};
