import { useState } from "react";
import { StyledContainer, StyledReactSelect } from "./styled";
import { useGlobalObjects } from "@components/GlobalContextProvider";
import { Button } from "@components/CustomChakraUI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAcademicYear } from "src/hooks/useAcademicYear";
import { useToastBox } from "src/hooks/useToastBox";

export const AcademicYearControl = () => {
  const { appUser, setAppUser } = useGlobalObjects();
  const [selectedYear, setSelectedYear] = useState(null);
  const { yearOptions, disableSelectedOption } = useAcademicYear();
  const { showToastBox } = useToastBox();

  const handleSelectYear = (option) => {
    setSelectedYear(option);
  };

  const handleButtonClick = (event) => {
    event.preventDefault();

    if (selectedYear) {
      appUser.addAcademicYear(selectedYear.value);
      setAppUser(appUser);
      disableSelectedOption(appUser.academicYears);
      setSelectedYear(null);

      showToastBox({
        status: "success",
        dataOfInterest: [selectedYear.label],
        message: "Academic Year Added:",
      });
    }
  };

  return (
    <StyledContainer>
      <StyledReactSelect
        classNamePrefix="react-select"
        placeholder="Add Year"
        options={yearOptions}
        value={selectedYear}
        onChange={handleSelectYear}
        isOptionDisabled={(option) => option.disabled}
        isClearable
      />
      <div style={{ marginLeft: "1.3rem", marginTop: ".4rem" }}>
        <Button onClick={handleButtonClick}>
          <FontAwesomeIcon icon={["fas", "plus"]} size="1x" color="white" />
        </Button>
      </div>
    </StyledContainer>
  );
};
