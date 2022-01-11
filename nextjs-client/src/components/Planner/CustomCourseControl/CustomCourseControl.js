import { useState } from "react";
import { StyledContainer } from "./styled";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Button as ChakraButton,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CustomCourseForm } from "./CustomCourseForm";
import { useGlobalObjects } from "@components/GlobalContextProvider";

export const CustomCourseControl = () => {
  const { themeMode, themeStyles } = useGlobalObjects();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <StyledContainer>
      <Popover arrowSize="1.2rem" isOpen={isPopoverOpen} isLazy={true}>
        <PopoverTrigger>
          <ChakraButton
            mt=".4rem"
            letterSpacing=".1rem"
            padding="2.1rem 1.6rem"
            colorScheme={themeMode === "light" ? "brand" : null}
            bgColor={themeStyles.colors.defaultButtonBg}
            borderRadius="1rem"
            fontSize="1.6rem"
            onClick={() => setIsPopoverOpen(!isPopoverOpen)}
          >
            <FontAwesomeIcon
              icon={["fas", "plus"]}
              size="1x"
              color="white"
              style={{ marginRight: "1rem" }}
            />
            Custom
          </ChakraButton>
        </PopoverTrigger>
        <PopoverContent
          width="30rem"
          padding="1rem"
          borderRadius="10px"
          margin="0.5rem 1.5rem"
        >
          <PopoverHeader
            fontSize="1.6rem"
            fontWeight="bold"
            letterSpacing=".2rem"
          >
            <p>Create Custom Course</p>
          </PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton
            mt=".5rem"
            mr=".5rem"
            size="md"
            onClick={() => setIsPopoverOpen(false)}
          />
          <PopoverBody>
            <CustomCourseForm setIsPopoverOpen={setIsPopoverOpen} />
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </StyledContainer>
  );
};
