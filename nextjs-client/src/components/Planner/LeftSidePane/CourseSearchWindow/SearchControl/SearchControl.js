import { StyledContainer, DepartmentSelect } from "./styled";
import { Input } from "@chakra-ui/react";
import { useGlobalObjects } from "@components/GlobalContextProvider";
import { DefaultButton } from "@components/CustomChakraUI";

export const SearchControl = () => {
  const { themeStyles } = useGlobalObjects();
  return (
    <StyledContainer>
      <DepartmentSelect
        classNamePrefix="react-select"
        placeholder="Select a department"
      />
      <Input
        bg="white"
        width="13rem"
        height="4.5rem"
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
          color: "darkslategrey",
          fontSize: "1.4rem",
        }}
      />
      <DefaultButton>Search</DefaultButton>
    </StyledContainer>
  );
};
