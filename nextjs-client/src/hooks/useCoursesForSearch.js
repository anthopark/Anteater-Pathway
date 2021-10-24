import { useState, useEffect } from "react";
import dummyCourses from "../components/Planner/CourseSearchBar/dummy-courses.json";

export const useCoursesForSearch = () => {
  const [allCourses, setAllCourses] = useState([]);
  const [currentCourseOptions, setCurrentCourseOptions] = useState([]);

  useEffect(() => {
    setAllCourses(dummyCourses);
  }, []);

  const updateCurrentCourseOptions = (inputValue) => {
    let foundCourseOptions = [];

    foundCourseOptions = findCourseOptions(inputValue, "departmentCode");

    if (foundCourseOptions.length > 0) {
      setCurrentCourseOptions(foundCourseOptions);
    }
  };

  const findCourseOptions = (inputValue, findOption) => {
    let result = [];

    for (const groupedCourse of allCourses) {
      if (
        groupedCourse[0][findOption]
          .toLowerCase()
          .startsWith(inputValue.toLowerCase()) &&
        groupedCourse[0][findOption]
          .toLowerCase()
          .includes(inputValue.toLowerCase())
      ) {
        result = groupedCourse;
        break;
      }
    }

    return result;
  };

  return {
    currentCourseOptions,
    setCurrentCourseOptions,
    updateCurrentCourseOptions,
  };
};
