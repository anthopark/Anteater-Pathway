import { useState, useEffect } from "react";
import dummyCourses from "../components/Planner/CourseSearchBar/dummy-courses.json";

export const useCoursesForSearch = () => {
  const [courses, setCourses] = useState([]);
  const [selectOptions, setSelectOptions] = useState([]);

  useEffect(() => {
    setCourses(dummyCourses);
  }, []);

  const setCoursesForOptions = (inputValue) => {
    if (inputValue.length >= 2) {
      for (const groupedCourses of courses) {
        if (
          groupedCourses.length > 0 &&
          groupedCourses[0].departmentCode
            .toLowerCase()
            .includes(inputValue.toLowerCase())
        ) {
          setSelectOptions(groupedCourses);
          break;
        }
      }
    }
  };

  return {
    selectOptions,
    setSelectOptions,
    setCoursesForOptions,
  };
};
