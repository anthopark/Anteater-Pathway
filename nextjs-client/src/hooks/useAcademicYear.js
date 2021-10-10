import { useState, useEffect } from "react";

const getYearOptions = () => {
  const startYear = new Date().getFullYear() - 2007;

  const yearArray = [...Array(17).keys()].map((item) => item + startYear);
  return yearArray.map((year) => ({
    value: year,
    label: `${year}-${year + 1}`,
  }));
};

export const useAcademicYear = () => {
  const [yearOptions, setYearOptions] = useState([]);

  useEffect(() => {
    setYearOptions(getYearOptions());
  }, []);

  const disableSelectedOption = (userAcademicYears) => {
    console.log(userAcademicYears);
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

    console.log(copyOfYearOptions);

    setYearOptions(copyOfYearOptions);
  };

  return { yearOptions, disableSelectedOption };
};
