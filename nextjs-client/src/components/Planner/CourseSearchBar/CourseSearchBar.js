import { Button } from "@chakra-ui/react";
import {
  StyledContainer,
  StyledReactSelect,
  CustomOptionWrapper,
} from "./styled";
import { components, createFilter } from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useCoursesForSearch } from "src/hooks/useCoursesForSearch";

const DropdownIndicator = (props) => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <FontAwesomeIcon
          icon={faSearch}
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
      {optionSelectedLength < 4 ? (
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
          No more courses can be selected.
        </div>
      )}
    </components.Menu>
  );
};

const isValidNewOption = (inputValue, selectValue) =>
  inputValue.length > 0 && selectValue.length < 4;

export const CourseSearchBar = () => {
  const { selectOptions, handleInputChange } = useCoursesForSearch();

  const handleButtonClick = (event) => {
    event.preventDefault();
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
          DropdownIndicator,
          IndicatorSeparator: null,
          Option: CustomOption,
          Menu: CustomMenu,
        }}
        isValidNewOption={isValidNewOption}
        getOptionLabel={(option) => option.courseCode}
        getOptionValue={(option) => option}
        onInputChange={handleInputChange}
        filterOption={createFilter({ ignoreAccents: false })}
      />
      <Button
        ml="1.3rem"
        fontSize="1.5rem"
        width="4.5rem"
        height="4rem"
        backgroundColor="blue.700"
        colorScheme="blue"
        borderRadius="1rem"
        type="submit"
        onClick={handleButtonClick}
        onSubmit={handleButtonClick}
      >
        <FontAwesomeIcon icon={faPlus} size="1x" color="white" />
      </Button>
    </StyledContainer>
  );
};
