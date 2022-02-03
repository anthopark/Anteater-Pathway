import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import dummyCourses from "src/data/dummy-courses.json";
import {
  fetchAllCoursesGroupedByDepartment,
  fetchCourseConfig,
} from "src/api/course";

export const useCoursesForSearch = () => {
  const [allCourses, setAllCourses] = useState([]);
  const [currentCourseOptions, setCurrentCourseOptions] = useState([]);
  const { data } = useQuery(
    `all-courses`,
    fetchAllCoursesGroupedByDepartment,
    fetchCourseConfig
  );

  useEffect(() => {
    setAllCourses(dummyCourses);
    if (data) {
      setAllCourses(data.courses);
    }
  }, [data]);

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
