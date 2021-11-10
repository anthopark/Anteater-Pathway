import { useState } from "react";
import {
  StyledContainer,
  StyledReactSelect,
  CustomOptionWrapper,
} from "./styled";
import { components, createFilter } from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCoursesForSearch } from "src/hooks/useCoursesForSearch";
import { useGlobalObjects } from "@components/GlobalContextProvider";
import { Course } from "src/entities/course";
import { Button } from "@components/CustomChakraUI";
import { useToastBox } from "src/hooks/useToastBox";

const MULTI_SELECT_LIMIT = 4;

export const CourseSearchBar = () => {
  const { appUser, updateAppUser } = useGlobalObjects();
  const {
    currentCourseOptions,
    setCurrentCourseOptions,
    updateCurrentCourseOptions,
  } = useCoursesForSearch();
  const [searchInputValue, setSearchInputValue] = useState("");
  const [selectedCourses, setSelectedCourses] = useState([]);
  const { showToastBox } = useToastBox();

  const handleButtonClick = (event) => {
    event.preventDefault();

    if (selectedCourses.length > 0) {
      for (const courseItem of selectedCourses) {
        appUser.tentativePlanner.addCourse(new Course(courseItem));
      }
      updateAppUser(appUser);
      setSelectedCourses([]);

      showToastBox({
        status: "success",
        dataOfInterest: selectedCourses.map((item) => item.courseCode),
        message: "Course(s) added:",
      });

      console.log(appUser);
    }
  };

  const handleSelectChange = (value) => {
    setSelectedCourses(value);

    if (value.length >= MULTI_SELECT_LIMIT) {
      return setCurrentCourseOptions([]);
    }

    if (value.length < selectedCourses.length) {
      updateCurrentCourseOptions(
        selectedCourses[selectedCourses.length - 1]?.departmentCode
      );
    } else if (value.length === 0 && selectedCourses.length === 0) {
      setCurrentCourseOptions([]);
    }
  };

  const handleInputChange = (value) => {
    setSearchInputValue(value);

    if (value.length >= 2 && value[value.length - 1] != " ") {
      updateCurrentCourseOptions(value);
    }
  };

  return (
    <StyledContainer>
      <StyledReactSelect
        isMulti
        placeholder="Find your courses..."
        options={currentCourseOptions}
        closeMenuOnSelect={false}
        classNamePrefix="react-select"
        components={{
          DropdownIndicator: CustomDropdownIndicator,
          IndicatorSeparator: null,
          Option: CustomOption,
          Menu: CustomMenu,
        }}
        isValidNewOption={isValidNewOption}
        getOptionLabel={(option) => option.courseCode}
        getOptionValue={(option) => option}
        value={selectedCourses}
        onChange={handleSelectChange}
        inputValue={searchInputValue}
        onInputChange={handleInputChange}
        filterOption={createFilter({ ignoreAccents: false })}
      />
      <div style={{ marginLeft: "1.3rem", marginTop: ".4rem" }}>
        <Button onClick={handleButtonClick}>
          <FontAwesomeIcon icon={["fas", "plus"]} size="1x" color="white" />
        </Button>
      </div>
    </StyledContainer>
  );
};

const CustomDropdownIndicator = (props) => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <FontAwesomeIcon
          icon={["fas", "search"]}
          size="1x"
          style={{ marginRight: ".7rem" }}
        />
      </components.DropdownIndicator>
    )
  );
};

const CustomOption = ({ ...props }) => {
  return (
    <components.Option {...props}>
      <CustomOptionWrapper>
        <div className="option-top">
          <div className="course-info">
            <p className="department-code">{props.data.departmentCode}</p>
            <p className="number">{props.data.number}</p>
          </div>
          <div className="course-unit">{props.data.unit} Units</div>
        </div>

        <div className="option-bottom">
          <p className="course-title">{props.data.title}</p>
        </div>
      </CustomOptionWrapper>
    </components.Option>
  );
};

const CustomMenu = (props) => {
  const optionSelectedLength = props.getValue().length || 0;
  return (
    <components.Menu {...props}>
      {optionSelectedLength < MULTI_SELECT_LIMIT ? (
        props.children
      ) : (
        <div
          className="menu-limit-message"
          style={{
            textAlign: "center",
            padding: "1rem 0",
            letterSpacing: ".1rem",
          }}
        >
          <FontAwesomeIcon
            icon={["fas", "exclamation-circle"]}
            size="1x"
            style={{ marginRight: "1rem" }}
          />
          No more courses can be selected.
        </div>
      )}
    </components.Menu>
  );
};

const isValidNewOption = (inputValue, selectValue) =>
  inputValue.length > 0 && selectValue.length < MULTI_SELECT_LIMIT;
