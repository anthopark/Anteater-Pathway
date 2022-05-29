import { useState } from "react";
import { StyledContainer, DepartmentSelect, RemoveBox1 } from "./styled";
import { Input, Button as ChakraButton } from "@chakra-ui/react";
import { useGlobalObjects } from "@components/GlobalContextProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchAllDepartment, fetchCourseConfig, fetchAllCoursesByDepartment, fetchSpecificCourse } from "src/api/courseAPI";
import { useEffect } from "react";
import { useQuery } from "react-query";

export const SearchControl = ({
  isSearchOpen,
  setIsSearchOpen,
  setSearchResults,
}) => {
  const { themeMode, themeStyles } = useGlobalObjects();
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [department, setDepartment] = useState(null);
  const [courseNumber, setCourseNumber] = useState();

  const { data } = useQuery(
    `all-courses`,
    fetchAllDepartment,
    fetchCourseConfig
  );

  useEffect(() => {
    console.log(data);
    if (data) {
      setDepartmentOptions(
        data.map((dept) => ({ label: dept.code, value: dept.code }))
      );
    }
  }, [data]);

  const handleSearch = async () => {
    // console.log(department); TESTING DISPLAY DEPARTMENT
    // console.log(courseNumber); TESTING DISPLAY COURSE NUMBER
    if (!department) return;

    let response;
    if (courseNumber === "") {
      response = await fetchAllCoursesByDepartment(department);
    } else {
      response = await fetchSpecificCourse(department, courseNumber);
      if (response !== null) {
        setSearchResults([response]);
      } else {
        setSearchResults([]);
      }
    }
    console.log(response);
  };

  return (
    // Select a department Icon
    <StyledContainer>
      <DepartmentSelect
        classNamePrefix="react-select"
        placeholder="Department..."
        options={departmentOptions}
        onChange={(option) => setDepartment(option.value)}
      />
      <Input
        // Input component
        classNamePrefix="react-input"
        bg="#E9E9E9"
        width="238px"
        height="46px"
        fontSize="19px"
        letterSpacing=".1rem"
        border="0rem"
        borderRadius="10px"
        autoComplete="off"
        spellCheck={false}
        placeholder="Enter Course name here..."
        left="-1"
        padding="2.1rem 1.6rem"
        borderColor={themeStyles.colors.inputFormBorder}
        value={courseNumber}
        onChange={(evt) => setCourseNumber(evt.target.value)}
        _hover={{
          borderColor: themeStyles.colors.inputFormBorderHover,
        }}
        // Letters inside input box
        _placeholder={{
          paddingTop: "2rem",
          color: "darkslategrey",
          fontSize: "1.6rem",
        }}
      />
      {/* Search Button Icon */}
      <ChakraButton
        classNamePrefix="react-searchButton"
        mt=".4rem"
        width="140px"
        height="46px"
        letterSpacing=".1rem"
        padding="2.1rem 1.6rem"
        colorScheme={themeMode === "light" ? "brand" : null}
        bgColor={themeStyles.colors.defaultButtonBg}
        borderRadius="10px"
        fontSize="19px"
        onClick={handleSearch}
      >
        Search
      </ChakraButton>
      {/* Top Right Exit Icon */}
      <RemoveBox1>
        <FontAwesomeIcon
          className="remove-box-icon1"
          icon={["fas", "times"]}
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          style={{
            fontSize: "2rem",
            color: "#5C5C5C",
            height: "24px",
            width: "24px",
            margin: "8px",
          }}
        />
      </RemoveBox1>
    </StyledContainer>
  );
};

/*
  Search button
    Hide initial result container box onClick
    Load into course info
    Tie into search algorithm
*/
