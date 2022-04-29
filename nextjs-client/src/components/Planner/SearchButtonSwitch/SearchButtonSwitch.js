import { Button as ChakraButton } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StyledContainer } from "./styled";
import { useGlobalObjects } from "@components/GlobalContextProvider";
export const SearchButtonSwitch = ({ searchUIOpen, setSearchUIOpen }) => {
  const { themeMode, themeStyles } = useGlobalObjects();

  return (
    <StyledContainer>
      <ChakraButton
        mt=".4rem"
        letterSpacing=".1rem"
        padding="2.1rem 1.6rem"
        colorScheme={themeMode === "light" ? "brand" : null}
        bgColor={themeStyles.colors.defaultButtonBg}
        borderRadius="1rem"
        fontSize="1.7rem"
        onClick={() => setSearchUIOpen(!searchUIOpen)}
      >
        <FontAwesomeIcon
          icon={["fas", "plus"]}
          size="1x"
          color="white"
          style={{ marginRight: ".7rem" }}
        />
        Courses
      </ChakraButton>
    </StyledContainer>
  );
};
