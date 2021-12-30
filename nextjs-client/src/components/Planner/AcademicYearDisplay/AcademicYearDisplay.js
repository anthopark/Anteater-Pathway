import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";
import { QuartersDisplay } from "./QuartersDisplay";
import {
  AcademicYearDisplayContainer,
  AccordionItemContainer,
  RemoveBox,
} from "./styled";
import { useGlobalObjects } from "@components/GlobalContextProvider";

export const AcademicYearDisplay = () => {
  const { appUser, updateAppUser, themeStyles } = useGlobalObjects();
  const [openedYears, setOpenedYears] = useState([]);
  const [openedIndices, setOpenedIndices] = useState([]);
  const [removingIndex, setRemovingIndex] = useState(-1);
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  useEffect(() => {
    setOpenedIndices(getUpdatedOpenedIndices(openedYears));
  }, [appUser, openedYears]);

  const handleMouseEnter = (accordionIndex) => {
    setHoveredIndex(accordionIndex);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(-1);
  };

  const handleRemoveAcademicYear = (year, accordionIndex) => {
    if (openedYears.includes(year)) {
      collapseAccordion(year);
    }

    setRemovingIndex(accordionIndex);

    setTimeout(() => {
      appUser.planner.removeAcademicYear(year);
      updateAppUser(appUser);
      setRemovingIndex(-1);
    }, 300);
  };

  const handleAccordionOpen = (year) => {
    let newOpenedYears = [...openedYears];

    if (newOpenedYears.includes(year)) {
      newOpenedYears = newOpenedYears.filter((yearValue) => yearValue !== year);
    } else {
      newOpenedYears.push(year);
    }

    setOpenedYears(newOpenedYears);
    setOpenedIndices(getUpdatedOpenedIndices(newOpenedYears));
  };

  const collapseAccordion = (year) => {
    if (openedYears.includes(year)) {
      setOpenedYears(openedYears.filter((index) => index !== year));
    }
  };

  const getUpdatedOpenedIndices = (openedYears) => {
    const newOpenedIndices = [];
    appUser.planner.academicYears.forEach((academicYear, index) => {
      if (openedYears.includes(academicYear.year)) {
        newOpenedIndices.push(index);
      }
    });
    return newOpenedIndices;
  };

  return (
    <AcademicYearDisplayContainer>
      <Accordion allowMultiple index={openedIndices}>
        {appUser.planner.academicYears.map((academicYear, index) => (
          <AccordionItemContainer
            key={index}
            isRemovingAccordion={removingIndex === index}
          >
            <div className="accordion-item-wrapper">
              <AccordionItem
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
                    onClick={() => handleAccordionOpen(academicYear.year)}
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
                    isHover={hoveredIndex === index}
                  >
                    {hoveredIndex === index ? (
                      <FontAwesomeIcon
                        className="remove-box-icon"
                        icon={["fas", "times-circle"]}
                        onClick={() =>
                          handleRemoveAcademicYear(academicYear.year, index)
                        }
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
            </div>
          </AccordionItemContainer>
        ))}
      </Accordion>
    </AcademicYearDisplayContainer>
  );
};
