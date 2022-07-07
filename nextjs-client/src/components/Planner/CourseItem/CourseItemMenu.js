import { useState, useEffect } from "react";
import {
  MenuTrigger,
  MenuContainer,
  CourseColorPickerContainer,
  CustomUnitFormContainer,
  ColorPicker,
} from "./styled";
import { Formik, Field, Form } from "formik";
import { Popover } from "react-tiny-popover";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
} from "@chakra-ui/react";
import { useGlobalObjects } from "@components/GlobalContextProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useToastBox } from "src/hooks/useToastBox";
import { useSavePlanner } from "src/hooks/useSavePlanner";

const availableColors = [
  "color1",
  "color2",
  "color3",
  "color4",
  "color5",
  "color6",
  "color7",
  "color8",
  "color9",
  "color10",
  "color11",
  "color12",
];

export const CourseItemMenu = ({
  courseInfo,
  isTentative,
  bgColor,
  setBgColor,
  isCourseItemHover,
  onModalOpen,
}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const { appUser, updateAppUser, themeStyles } = useGlobalObjects();
  const { savePlannerToBackend } = useSavePlanner();
  useEffect(() => {
    if (!isCourseItemHover) {
      setIsPopoverOpen(false);
    }
  }, [isCourseItemHover]);

  const handleDelete = () => {
    if (isTentative) {
      appUser.tentativePlanner.deleteCourse(courseInfo.id);
    } else {
      appUser.planner.deleteCourse(courseInfo.id);
    }

    updateAppUser(appUser);
    savePlannerToBackend(appUser);
  };

  return (
    <Popover
      isOpen={isPopoverOpen}
      positions={["bottom", "top"]}
      padding={5}
      onClickOutside={() => setIsPopoverOpen(false)}
      isLazy={true}
      content={
        <MenuContainer>
          {courseInfo.isCustomCreated ? null : (
            <div className="info-link-container">
              <a className="info-link" onClick={onModalOpen}>
                <FontAwesomeIcon
                  icon={["fas", "info-circle"]}
                  style={{
                    fontSize: "1.6rem",
                    marginTop: ".3rem",
                    color: "#5C5C5C",
                  }}
                />
                <p className="info-text">info</p>
              </a>
            </div>
          )}

          {courseInfo.isCustomUnit ? (
            <div className="custom-unit-form-container">
              <CustomUnitForm
                courseInfo={courseInfo}
                appUser={appUser}
                updateAppUser={updateAppUser}
                isTentative={isTentative}
                themeStyles={themeStyles}
              />
            </div>
          ) : null}

          <div className="color-picker-container">
            <CourseColorPicker
              isTentative={isTentative}
              courseInfo={courseInfo}
              bgColor={bgColor}
              setBgColor={setBgColor}
            />
          </div>
          <div className="delete-container">
            <a className="delete-link" onClick={handleDelete}>
              <FontAwesomeIcon
                icon={["fas", "trash"]}
                style={{
                  fontSize: "1.5rem",
                  marginTop: ".3rem",
                  color: "#F36B6B",
                }}
              />
              <p className="delete-text">delete</p>
            </a>
          </div>
        </MenuContainer>
      }
    >
      <MenuTrigger>
        {isCourseItemHover ? (
          <a
            className="trigger-link"
            onClick={() => setIsPopoverOpen(!isPopoverOpen)}
          >
            <FontAwesomeIcon
              icon={["fas", "ellipsis-v"]}
              style={{ fontSize: "1.6rem", color: "#5C5656" }}
            />
          </a>
        ) : null}
      </MenuTrigger>
    </Popover>
  );
};

const CustomUnitForm = ({
  courseInfo,
  appUser,
  updateAppUser,
  isTentative,
  themeStyles,
}) => {
  const { showToastBox } = useToastBox();
  const { savePlannerToBackend } = useSavePlanner();

  const validateCustomUnit = (value) => {
    let error;

    if (!value) {
      error = "Unit is required";
    } else if (isNaN(Number(value.trim()))) {
      error = "Invalid value";
    } else if (Number(value.trim()) < Number(courseInfo.customMinUnit)) {
      error = `Can't be less than ${courseInfo.customMinUnit}`;
    } else if (Number(value.trim()) > Number(courseInfo.customMaxUnit)) {
      error = `Can't be larger than ${courseInfo.customMaxUnit}`;
    }
    return error;
  };

  const handleSubmit = (values) => {
    if (isTentative) {
      appUser.tentativePlanner.updateCustomUnit(
        courseInfo.id,
        values.customUnit
      );
    } else {
      appUser.planner.updateCustomUnit(courseInfo.id, values.customUnit);
    }
    updateAppUser(appUser);
    savePlannerToBackend(appUser);

    showToastBox({
      status: "success",
      dataOfInterest: [courseInfo.courseCode],
      message: `Custom Unit Updated to ${values.customUnit}`,
    });
  };

  return (
    <CustomUnitFormContainer>
      <Formik
        initialValues={{
          customUnit: "",
        }}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values);
          resetForm();
        }}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {() => (
          <Form>
            <Field name="customUnit" validate={validateCustomUnit}>
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.customUnit}>
                  <FormLabel
                    htmlFor="custom-unit"
                    fontSize="1.4rem"
                    letterSpacing="1px"
                    p={0}
                    m={0}
                  >
                    Custom Unit
                  </FormLabel>
                  <div className="form-box">
                    <Input
                      {...field}
                      id="custom-unit"
                      w="5rem"
                      fontSize="1.4rem"
                      mr="1rem"
                      letterSpacing="1px"
                      placeholder={`${courseInfo.customMinUnit}-${courseInfo.customMaxUnit}`}
                      autoComplete="off"
                      spellCheck={false}
                      borderColor={themeStyles.colors.inputFormBorder}
                      _hover={{
                        borderColor: themeStyles.colors.inputFormBorderHover,
                      }}
                    />
                    <Button
                      fontSize="1.4rem"
                      w="4.5rem"
                      letterSpacing="1px"
                      bgColor="brand.700"
                      colorScheme="brand"
                      type="submit"
                    >
                      Set
                    </Button>
                  </div>
                  <FormErrorMessage fontSize="1.4rem">
                    {form.errors.customUnit}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
          </Form>
        )}
      </Formik>
    </CustomUnitFormContainer>
  );
};

const CourseColorPicker = ({
  courseInfo,
  isTentative,
  bgColor,
  setBgColor,
}) => {
  const [currentColor, setCurrentColor] = useState(bgColor);
  const { appUser, updateAppUser } = useGlobalObjects();
  const { savePlannerToBackend } = useSavePlanner();

  const handleColorPickerClick = (color) => {
    setCurrentColor(color);
    setBgColor(color);

    if (isTentative) {
      appUser.tentativePlanner.updateCourseColor(courseInfo.id, color);
    } else {
      appUser.planner.updateCourseColor(courseInfo.id, color);
    }

    updateAppUser(appUser);
    savePlannerToBackend(appUser);
  };

  return (
    <CourseColorPickerContainer>
      {availableColors.map((color, index) => (
        <ColorPicker
          key={index}
          color={color}
          currentColor={currentColor}
          onClick={() => handleColorPickerClick(color)}
        >
          <div className="color-box"></div>
        </ColorPicker>
      ))}
    </CourseColorPickerContainer>
  );
};
