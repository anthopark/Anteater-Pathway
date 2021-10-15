import { Button } from "@chakra-ui/react";
import { StyledContainer, StyledReactSelect } from "./styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useAcademicYear } from "src/hooks/useAcademicYear";
import { useState } from "react";
import { useGlobalObjects } from "@components/GlobalContextProvider";

export const AcademicYearControl = () => {
  const { appUser, setAppUser } = useGlobalObjects();
  const [selectedYear, setSelectedYear] = useState(null);
  const { yearOptions, disableSelectedOption } = useAcademicYear();

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
      <Button
        ml="1.3rem"
        mt=".3rem"
        fontSize="1.5rem"
        width="4.5rem"
        height="4rem"
        backgroundColor="blue.700"
        colorScheme="blue"
        borderRadius="1rem"
        type="submit"
        onClick={handleButtonClick}
        onSubmit={handleButtonClick}
      >
        <FontAwesomeIcon icon={faPlus} size="1x" color="white" />
      </Button>
    </StyledContainer>
  );
};
