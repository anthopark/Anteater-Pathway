import { useState, useEffect } from "react";
import dummyCourses from "../components/Planner/CourseSearchBar/dummy-courses.json";

export const useCoursesForSearch = () => {
  const [courses, setCourses] = useState([]);
  const [selectOptions, setSelectOptions] = useState([]);

  useEffect(() => {
    setCourses(dummyCourses);
  }, []);

  const handleInputChange = (inputValue) => {
    if (inputValue.length >= 2) {
      for (let i = 0; i < courses.length; i++) {
        if (
          courses[i][0].departmentCode
            .toLowerCase()
            .includes(inputValue.toLowerCase())
        ) {
          setSelectOptions([...courses[i]]);
          break;
        }
      }
    }
  };

  return { selectOptions, handleInputChange };
};
