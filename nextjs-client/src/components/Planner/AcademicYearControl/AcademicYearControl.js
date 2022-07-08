import { StyledContainer, StyledReactSelect } from "./styled";
import { useGlobalObjects } from "@components/GlobalContextProvider";
import { useAcademicYear } from "src/hooks/useAcademicYear";
import { useToastBox } from "src/hooks/useToastBox";
import { useSavePlanner } from "src/hooks/useSavePlanner";

export const AcademicYearControl = () => {
  const { appUser, updateAppUser, themeStyles } = useGlobalObjects();
  const { savePlannerToBackend } = useSavePlanner();
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
    appUser.planner.addAcademicYear(option.value);
    updateAppUser(appUser);
    setYearOptions(
      disableSelectedOption(
        appUser.planner.academicYears.map((item) => item.year),
        yearOptions
      )
    );

    showToastBox({
      status: "success",
      dataOfInterest: [option.label],
      message: "Academic Year Added",
    });

    savePlannerToBackend(appUser);
  };

  return (
    <StyledContainer>
      <StyledReactSelect
        styles={selectCustomStyles}
        classNamePrefix="react-select"
        placeholder="Add Year"
        options={yearOptions}
        value={null}
        onChange={handleSelectYear}
        isOptionDisabled={(option) => option.disabled}
      />
    </StyledContainer>
  );
};
