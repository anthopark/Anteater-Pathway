import { StyledContainer } from "./styled";
import { useGlobalObjects } from "@components/GlobalContextProvider";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";

export const LeftSidePane = () => {
  const { appUser, themeStyles } = useGlobalObjects();
  return (
    <StyledContainer>
      <Accordion allowMultiple allowToggle index={mouseDownAccordionIndex}>
        {appUser.planner.academicYears.map((academicYear, index) => (
          <AccordionItem
            key={index}
            mb="2rem"
            borderRadius="12px"
            boxShadow="0 1px 6px rgba(100, 100, 100, 0.1)"
            bg={themeStyles.colors.academicYearBg}
          >
            <AccordionButton
              height="5.8rem"
              borderRadius="12px"
              _focus={{ border: "none" }}
            >
              <div className="accordion-button-box">
                <div className="academic-year-text">{`20${
                  academicYear.year
                } - 20${academicYear.year + 1}`}</div>
                <AccordionIcon fontSize="2.7rem" />
              </div>
            </AccordionButton>
            <AccordionPanel>
              <div className="accordion-panel-box">hahahah</div>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </StyledContainer>
  );
};
