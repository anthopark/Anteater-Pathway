import { Button } from "@chakra-ui/react";
import { AddSchoolYearContainer, StyledReactSelect } from "./styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useAcademicYear } from "src/hooks/useAcademicYear";
import { useState } from "react";
import { useGlobalValues } from "@components/GlobalContextProvider";

export const AddAcademicYear = () => {
  const { appUser, setAppUser } = useGlobalValues();
  const [selectedYear, setSelectedYear] = useState(null);
  const { yearOptions } = useAcademicYear();

  const handleSelectYear = (option) => {
    setSelectedYear(option);
  };

  const handleButtonClick = () => {
    if (selectedYear) {
      appUser.addAcademicYear(selectedYear.value);
      setAppUser(appUser);
      console.log(appUser);
    }
  };

  return (
    <AddSchoolYearContainer>
      <StyledReactSelect
        classNamePrefix="react-select"
        placeholder="Academic Year"
        options={yearOptions}
        value={selectedYear}
        onChange={handleSelectYear}
        isClearable
      />
      <Button
        fontSize="1.5rem"
        width="5.5rem"
        height="4rem"
        backgroundColor="blue.700"
        colorScheme="blue"
        borderRadius=".7rem"
        onClick={handleButtonClick}
      >
        <FontAwesomeIcon icon={faPlus} size="1x" color="white" />
      </Button>
    </AddSchoolYearContainer>
  );
};
