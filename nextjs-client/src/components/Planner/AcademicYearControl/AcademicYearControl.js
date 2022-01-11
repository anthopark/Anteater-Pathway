import { useState } from "react";
import { StyledContainer, StyledReactSelect } from "./styled";
import { useGlobalObjects } from "@components/GlobalContextProvider";
import { DefaultButton } from "@components/CustomChakraUI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAcademicYear } from "src/hooks/useAcademicYear";
import { useToastBox } from "src/hooks/useToastBox";

export const AcademicYearControl = () => {
  const { appUser, updateAppUser, themeStyles } = useGlobalObjects();
  const [selectedYear, setSelectedYear] = useState(null);
  const { yearOptions, setYearOptions, disableSelectedOption } =
    useAcademicYear();
  const { showToastBox } = useToastBox();

  const selectCustomStyles = {
    option: (styles, { isDisabled }) => ({
      ...styles,
      color: isDisabled
        ? themeStyles.colors.disabledText
        : themeStyles.colors.defaultText,
    }),
  };

  const handleSelectYear = (option) => {
    setSelectedYear(option);
  };

  const handleButtonClick = (event) => {
    event.preventDefault();

    if (selectedYear) {
      appUser.planner.addAcademicYear(selectedYear.value);
      updateAppUser(appUser);
      setYearOptions(
        disableSelectedOption(
          appUser.planner.academicYears.map((item) => item.year),
          yearOptions
        )
      );
      setSelectedYear(null);

      showToastBox({
        status: "success",
        dataOfInterest: [selectedYear.label],
        message: "Academic Year Added:",
      });

      console.log(appUser);
    }
  };

  return (
    <StyledContainer>
      <StyledReactSelect
        styles={selectCustomStyles}
        classNamePrefix="react-select"
        placeholder="Add Year"
        options={yearOptions}
        value={selectedYear}
        onChange={handleSelectYear}
        isOptionDisabled={(option) => option.disabled}
        isClearable
      />
      <div style={{ marginLeft: "1.3rem", marginTop: ".4rem" }}>
        <DefaultButton onClick={handleButtonClick}>
          <FontAwesomeIcon icon={["fas", "plus"]} size="1x" color="white" />
        </DefaultButton>
      </div>
    </StyledContainer>
  );
};
