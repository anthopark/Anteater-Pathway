import { useGlobalObjects } from "@components/GlobalContextProvider";
import { useState, useEffect } from "react";

const getYearOptions = () => {
  const startYear = new Date().getFullYear() - 2007;

  const yearArray = [...Array(17).keys()].map((item) => item + startYear);
  return yearArray.map((year) => ({
    value: year,
    label: `${year}-${year + 1}`,
  }));
};

const disableSelectedOption = (userAcademicYears, yearOptions) => {
  const copyOfYearOptions = [...yearOptions];

  for (const year of userAcademicYears) {
    const index = copyOfYearOptions.findIndex(
      (option) => option.value === year
    );

    if (index !== -1) {
      copyOfYearOptions[index] = {
        ...copyOfYearOptions[index],
        disabled: true,
      };
    }
  }

  return copyOfYearOptions;
};

export const useAcademicYear = () => {
  const { appUser } = useGlobalObjects();
  const [yearOptions, setYearOptions] = useState([]);

  useEffect(() => {
    const years = getYearOptions();
    setYearOptions(
      disableSelectedOption(
        appUser.planner.academicYears.map((item) => item.year),
        years
      )
    );
  }, []);

  return { yearOptions, setYearOptions, disableSelectedOption };
};
