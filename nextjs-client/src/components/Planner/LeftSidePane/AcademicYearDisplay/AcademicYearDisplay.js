import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionIcon,
  AccordionPanel,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  PopoverCloseButton,
} from "@chakra-ui/react";
import { QuartersDisplay } from "./QuartersDisplay";
import {
  AcademicYearDisplayContainer,
  RemoveConfirmContent,
  AccordionItemContainer,
  RemoveBox,
} from "./styled";
import { useGlobalObjects } from "@components/GlobalContextProvider";
import { useSavePlanner } from "src/hooks/useSavePlanner";

export const AcademicYearDisplay = () => {
  const { appUser, updateAppUser, themeStyles } = useGlobalObjects();
  const { savePlannerToBackend } = useSavePlanner();
  const [openedYears, setOpenedYears] = useState([]);
  const [openedIndices, setOpenedIndices] = useState([]);
  const [removingIndex, setRemovingIndex] = useState(-1);
  const [accordionOpenEvent, setAccordionOpenEvent] = useState(false);

  useEffect(() => {
    setOpenedIndices(getUpdatedOpenedIndices(openedYears));
  }, [appUser, openedYears]);

  const handleRemoveAcademicYear = (year, accordionIndex) => {
    if (openedYears.includes(year)) {
      collapseAccordion(year);
    }

    setRemovingIndex(accordionIndex);

    setTimeout(() => {
      appUser.planner.removeAcademicYear(year);
      updateAppUser(appUser);
      savePlannerToBackend(appUser);
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

    if (newOpenedYears.includes(year)) {
      setAccordionOpenEvent(!accordionOpenEvent);
    }
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
                boxShadow="0 2px 4px rgba(100, 100, 100, 0.1)"
                bg={themeStyles.colors.academicYearBg}
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
                      <AccordionIcon fontSize="2.7rem" />
                      <div className="academic-year-text">{`20${
                        academicYear.year
                      } - 20${academicYear.year + 1}`}</div>
                    </div>
                  </AccordionButton>
                  <RemoveBox
                    className="remove-box"
                    isOpen={openedIndices.includes(index)}
                  >
                    {openedIndices.includes(index) ? (
                      <Popover
                        isLazy
                        placement="right-start"
                        arrowSize="1.2rem"
                      >
                        <PopoverTrigger>
                          <Button
                            bg="transparent"
                            _active={{ backgroundColor: "none" }}
                            _focus={{ backgroundColor: "none" }}
                            _hover={{ backgroundColor: "none" }}
                          >
                            <FontAwesomeIcon
                              className="remove-box-icon"
                              icon={["fas", "trash"]}
                              style={{
                                fontSize: "1.7rem",
                                marginTop: ".3rem",
                                color: "#F36B6B",
                                cursor: "pointer",
                                paddingBottom: "3px",
                              }}
                            />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          w="18rem"
                          h="8.5rem"
                          borderRadius="3px"
                          border="2px solid darkgray"
                        >
                          <PopoverCloseButton
                            fontSize="1.3rem"
                            letterSpacing="1px"
                            mt="4.1rem"
                            mr="8.8rem"
                            w="7rem"
                            h="3rem"
                            border="1px solid gray"
                          >
                            Close
                          </PopoverCloseButton>
                          <RemoveConfirmContent>
                            <div className="text-box">{`Delete year ${
                              academicYear.year
                            } - ${academicYear.year + 1}?`}</div>
                            <div className="button-box">
                              <Button
                                fontSize="1.3rem"
                                size="lg"
                                w="7rem"
                                h="3rem"
                                colorScheme="red"
                                bg="#F36B6B"
                                onClick={() =>
                                  handleRemoveAcademicYear(
                                    academicYear.year,
                                    index
                                  )
                                }
                              >
                                Delete
                              </Button>
                            </div>
                          </RemoveConfirmContent>
                        </PopoverContent>
                      </Popover>
                    ) : null}
                  </RemoveBox>
                </div>

                <AccordionPanel>
                  <QuartersDisplay
                    academicYear={academicYear}
                    accordionOpenEvent={accordionOpenEvent}
                  />
                </AccordionPanel>
              </AccordionItem>
            </div>
          </AccordionItemContainer>
        ))}
      </Accordion>
    </AcademicYearDisplayContainer>
  );
};
