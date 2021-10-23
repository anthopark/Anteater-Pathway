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
import { useToast } from "@chakra-ui/toast";
import { ToastBox } from "@components/CustomChakraUI";

const MULTI_SELECT_LIMIT = 4;

export const CourseSearchBar = () => {
  const { appUser, setAppUser } = useGlobalObjects();
  const [inputValue, setInputValue] = useState();
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [cachedOptions, setCachedOptions] = useState([]);
  const { selectOptions, setSelectOptions, setCoursesForOptions } =
    useCoursesForSearch();
  const toast = useToast();

  const handleButtonClick = (event) => {
    event.preventDefault();

    if (selectedCourses.length > 0) {
      for (const searchedCourse of selectedCourses) {
        appUser.planTentatively(new Course(searchedCourse));
      }
      setAppUser(appUser);
      setSelectedCourses([]);

      toast({
        position: "bottom-right",
        duration: 3000,
        render: () => (
          <ToastBox
            status="success"
            dataOfInterest={selectedCourses.map((item) => item.courseCode)}
            message="Courses added to planner:"
          />
        ),
      });
    }
  };

  const handleSelectChange = (selectedCourses) => {
    setSelectedCourses(selectedCourses);

    if (selectedCourses.length >= MULTI_SELECT_LIMIT) {
      setSelectOptions([]);
      setCachedOptions(selectOptions);
    } else if (cachedOptions.length > 0 && selectedCourses.length >= 1) {
      setSelectOptions(cachedOptions);
      setCachedOptions(selectOptions);
    } else if (selectedCourses.length === 0) {
      setSelectOptions([]);
      setCachedOptions([]);
    }
  };

  const handleInputChange = (value) => {
    setInputValue(value);
    setCoursesForOptions(value);
  };

  return (
    <StyledContainer>
      <StyledReactSelect
        isMulti
        placeholder="Find your courses..."
        options={selectOptions}
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
        inputValue={inputValue}
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
