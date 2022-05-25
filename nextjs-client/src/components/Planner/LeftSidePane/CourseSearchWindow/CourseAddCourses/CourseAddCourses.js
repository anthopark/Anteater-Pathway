import { useState } from "react";
import { Button as ChakraButton } from "@chakra-ui/react";
import { StyledContainer } from "./styled";
import { useGlobalObjects } from "@components/GlobalContextProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useToastBox } from "src/hooks/useToastBox";
import { useSavePlanner } from "src/hooks/useSavePlanner";

export const CourseAddCourses = ({ isSearchOpen, setIsSearchOpen }) => {
  const { themeMode, themeStyles } = useGlobalObjects();
  const { appUser, updateAppUser } = useGlobalObjects();

  const { showToastBox } = useToastBox();
  const [selectedCourses, setSelectedCourses] = useState([]);
  const { savePlannerToBackend } = useSavePlanner();

  const handleButtonClick = (event) => {
    event.preventDefault();

    if (selectedCourses.length > 0) {
      for (const courseItem of selectedCourses) {
        appUser.tentativePlanner.addCourse(new Course(courseItem), appUser);
      }
      updateAppUser(appUser);
      setSelectedCourses([]);

      showToastBox({
        status: "success",
        dataOfInterest: selectedCourses.map((item) => item.courseCode),
        message: "Course(s) added",
      });

      savePlannerToBackend(appUser);
    }
    // TEST
    // showToastBox({
    //   status: "success",
    //   dataOfInterest: selectedCourses.map((item) => item.courseCode),
    //   message: "Course(s) added",
    // });
  };

  return (
    // Add selected courses Classes Button
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
        onClick={handleButtonClick}
      >
    Add selected courses
      </ChakraButton>
    </StyledContainer>
  );
};

// THINK ABOUT IMPLEMENTING TOAST WHEN USER ADDS CLASS
// https://chakra-ui.com/docs/components/feedback/toast