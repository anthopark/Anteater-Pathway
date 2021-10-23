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

export const CustomCourseControl = () => {
  return (
    <StyledContainer>
      <Popover>
        <PopoverTrigger>
          <ChakraButton
            mt=".4rem"
            letterSpacing=".1rem"
            padding="2.1rem 1.6rem"
            colorScheme="brand"
            backgroundColor="brand.700"
            borderRadius="1rem"
            fontSize="1.6rem"
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
        <PopoverContent width="30rem" padding="1rem" borderRadius="10px">
          <PopoverHeader
            fontSize="1.6rem"
            fontWeight="bold"
            letterSpacing=".2rem"
          >
            <p>Create Custom Course</p>
          </PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <CustomCourseForm />
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </StyledContainer>
  );
};
