import { useState, useEffect } from "react";
import dummyCourses from "../components/Planner/CourseSearchBar/dummy-courses.json";

export const useCoursesForSearch = () => {
  const [courses, setCourses] = useState([]);
  const [currentCourseOptions, setCurrentCourseOptions] = useState([]);

  useEffect(() => {
    setCourses(dummyCourses);
  }, []);

  const updateCurrentCourseOptions = (inputValue) => {
    if (inputValue.length >= 2) {
      for (const groupedCourses of courses) {
        if (
          groupedCourses.length > 0 &&
          groupedCourses[0].departmentCode
            .toLowerCase()
            .includes(inputValue.toLowerCase())
        ) {
          setCurrentCourseOptions(groupedCourses);
          break;
        }
      }
    }
  };

  return {
    currentCourseOptions,
    setCurrentCourseOptions,
    updateCurrentCourseOptions,
  };
};
