import { useState } from "react";
import { StyledContainer, RemoveBox } from "./styled";
import { QuartersDisplay } from "./QuartersDisplay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGlobalObjects } from "@components/GlobalContextProvider";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";

export const LeftSidePane = ({
  isCourseDragging,
  openedAccordionIndices,
  setOpenedAccordionIndices,
}) => {
  const { appUser, updateAppUser, themeStyles } = useGlobalObjects();
  const [hoveredAccordionIndex, setHoveredAccordionIndex] = useState(-1);

  const handleMouseEnter = (accordionIndex) => {
    setHoveredAccordionIndex(accordionIndex);
  };

  const handleMouseLeave = () => {
    setHoveredAccordionIndex(-1);
  };

  const handleRemoveAcademicYear = (year) => {
    appUser.planner.removeAcademicYear(year);
    updateAppUser(appUser);
  };

  const handleButtonClick = (accordionIndex) => {
    if (openedAccordionIndices.includes(accordionIndex)) {
      collapseAccordion(accordionIndex);
    } else {
      openAccordion(accordionIndex);
    }
  };

  const openAccordion = (accordionIndex) => {
    if (!openedAccordionIndices.includes(accordionIndex)) {
      openedAccordionIndices.push(accordionIndex);
      setOpenedAccordionIndices([...openedAccordionIndices]);
    }
  };

  const collapseAccordion = (accordionIndex) => {
    if (openedAccordionIndices.includes(accordionIndex)) {
      setOpenedAccordionIndices(
        openedAccordionIndices.filter((index) => index !== accordionIndex)
      );
    }
  };

  return (
    <StyledContainer>
      <Accordion allowMultiple index={openedAccordionIndices} allowToggle>
        {appUser.planner.academicYears.map((academicYear, index) => (
          <AccordionItem
            key={index}
            mb="2rem"
            borderRadius="12px"
            boxShadow="0 1px 6px rgba(100, 100, 100, 0.1)"
            bg={themeStyles.colors.academicYearBg}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave()}
          >
            <div className="accordion-top">
              <AccordionButton
                height="5.8rem"
                borderRadius="12px"
                _focus={{ border: "none" }}
                _hover={{ backgroundColor: "none" }}
                onClick={() => handleButtonClick(index)}
              >
                <div className="accordion-button-box">
                  <div className="academic-year-text">{`20${
                    academicYear.year
                  } - 20${academicYear.year + 1}`}</div>
                  <AccordionIcon fontSize="2.7rem" />
                </div>
              </AccordionButton>
              <RemoveBox
                className="remove-box"
                isHover={!isCourseDragging && hoveredAccordionIndex === index}
              >
                {!isCourseDragging && hoveredAccordionIndex === index ? (
                  <FontAwesomeIcon
                    className="remove-box-icon"
                    icon={["fas", "times-circle"]}
                    onClick={() => handleRemoveAcademicYear(academicYear.year)}
                    style={{
                      fontSize: "1.6rem",
                      marginTop: ".3rem",
                      color: "#E34522",
                      cursor: "pointer",
                    }}
                  />
                ) : null}
              </RemoveBox>
            </div>

            <AccordionPanel>
              <QuartersDisplay academicYear={academicYear} />
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </StyledContainer>
  );
};
