import { Button as ChakraButton } from "@chakra-ui/react";
import { StyledContainer } from "./styled";
import { useGlobalObjects } from "@components/GlobalContextProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const CourseAddCourses = ({ isSearchOpen, setIsSearchOpen }) => {
  const { themeMode, themeStyles } = useGlobalObjects();

  return (
    // Search Classes Button
    <StyledContainer>
      <ChakraButton
        width="263px"
        height="46px"
        mt=".4rem"
        letterSpacing=".1rem"
        padding="2.1rem 1.6rem"
        colorScheme={themeMode === "light" ? "brand" : null}
        bgColor={themeStyles.colors.defaultButtonBg}
        borderRadius="1rem"
        fontSize="1.6rem"
        _hover={{ backgroundColor: "brand.400" }}
        rightIcon={<FontAwesomeIcon icon={["fas", "plus"]} size="1x" color="white" />}
        // onClick={() => setIsSearchOpen(!isSearchOpen)}
      >
    Add selected courses
    {/* WORK IN PROGRESS */}
    {/* ADD FUNCTION */}
      </ChakraButton>
    </StyledContainer>
  );
};

// THINK ABOUT IMPLEMENTING TOAST WHEN USER ADDS CLASS
// https://chakra-ui.com/docs/components/feedback/toast