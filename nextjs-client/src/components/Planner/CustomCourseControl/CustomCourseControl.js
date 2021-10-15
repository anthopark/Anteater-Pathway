import { StyledContainer } from "./styled";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Formik, Field, Form } from "formik";
import { Course } from "src/entities/course";
import { useGlobalObjects } from "@components/GlobalContextProvider";

export const CustomCourseControl = () => {
  return (
    <StyledContainer>
      <Popover>
        <PopoverTrigger>
          <Button
            fontSize="1.6rem"
            height="4rem"
            backgroundColor="blue.700"
            colorScheme="blue"
            borderRadius="1rem"
            letterSpacing=".1rem"
            padding="0 1.5rem"
            mt=".3rem"
          >
            <FontAwesomeIcon
              icon={faPlus}
              size="1x"
              color="white"
              style={{ marginRight: ".7rem" }}
            />
            Custom
          </Button>
        </PopoverTrigger>
        <PopoverContent width="30rem" padding="1rem" borderRadius="10px">
          <PopoverHeader
            fontSize="1.6rem"
            fontWeight="bold"
            letterSpacing=".2rem"
          >
            <p>Add Custom Course</p>
          </PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <CustomCourseForm />
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </StyledContainer>
  );
};

const CustomCourseForm = () => {
  const { appUser, setAppUser } = useGlobalObjects();
  const validateDepartmentCode = (value) => {
    let error;
    if (!value) {
      error = "Department is required";
    } else if (value.trim().length >= 12) {
      error = "Please use < 12 characters";
    }

    return error;
  };

  const validateNumber = (value) => {
    let error;
    if (!value) {
      error = "Number is required";
    } else if (value.trim().length >= 7) {
      error = "Please use < 7 characters";
    }

    return error;
  };

  const validateUnit = (value) => {
    let error;
    if (!value) {
      error = "Unit is required";
    } else if (isNaN(Number(value.trim()))) {
      error = "Invalid value for unit";
    } else if (Number(value.trim()) < 0) {
      error = "Unit can't be negative";
    } else if (Number(value.trim()) > 20) {
      error = "Unit is too big";
    }
    return error;
  };

  const validateTitle = (value) => {
    let error;
    if (value.trim().length >= 80) {
      error = "Please Use < 80 characters";
    }

    return error;
  };

  const handleSubmit = (values) => {
    appUser.planTentatively(new Course(values));
    setAppUser(appUser);
    console.log(appUser);
  };

  return (
    <Formik
      initialValues={{
        departmentCode: "",
        number: "",
        title: "",
        Unit: "",
      }}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form>
          <Field name="departmentCode" validate={validateDepartmentCode}>
            {({ field, form }) => (
              <FormControl
                isInvalid={
                  form.errors.departmentCode && form.touched.departmentCode
                }
                isRequired
                mt=".5rem"
                pb=".5rem"
              >
                <FormLabel
                  htmlFor="departmentCode"
                  fontSize="1.5rem"
                  letterSpacing=".1rem"
                >
                  Department
                </FormLabel>
                <Input
                  {...field}
                  fontSize="1.5rem"
                  letterSpacing=".1rem"
                  height="3.3rem"
                  borderRadius="7px"
                  id="departmentCode"
                  placeholder="Ex. ECON, HIST"
                />
                <FormErrorMessage fontSize="1.3rem">
                  {form.errors.departmentCode}
                </FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingBottom: ".5rem",
            }}
          >
            <Field name="number" validate={validateNumber}>
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.number && form.touched.number}
                  isRequired
                  width="12rem"
                >
                  <FormLabel
                    htmlFor="number"
                    fontSize="1.5rem"
                    letterSpacing=".1rem"
                  >
                    Number
                  </FormLabel>
                  <Input
                    {...field}
                    fontSize="1.5rem"
                    letterSpacing=".1rem"
                    height="3.3rem"
                    borderRadius="7px"
                    id="number"
                    placeholder="Ex. 101, 1A"
                  />
                  <FormErrorMessage fontSize="1.3rem">
                    {form.errors.number}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="unit" validate={validateUnit}>
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.unit && form.touched.unit}
                  isRequired
                  width="12rem"
                >
                  <FormLabel
                    htmlFor="unit"
                    fontSize="1.5rem"
                    letterSpacing=".1rem"
                  >
                    Unit
                  </FormLabel>
                  <Input
                    {...field}
                    fontSize="1.5rem"
                    letterSpacing=".1rem"
                    height="3.3rem"
                    borderRadius="7px"
                    id="unit"
                    placeholder="Ex. 2, 4"
                  />
                  <FormErrorMessage fontSize="1.3rem">
                    {form.errors.unit}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
          </div>
          <Field name="title" validate={validateTitle}>
            {({ field, form }) => (
              <FormControl
                isInvalid={form.errors.title && form.touched.title}
                pb="2rem"
              >
                <FormLabel
                  htmlFor="title"
                  fontSize="1.5rem"
                  letterSpacing=".1rem"
                >
                  Title
                </FormLabel>
                <Input
                  {...field}
                  fontSize="1.5rem"
                  letterSpacing=".1rem"
                  height="3.3rem"
                  borderRadius="7px"
                  id="title"
                  placeholder="Ex. Basic Statistics"
                />
                <FormErrorMessage fontSize="1.3rem">
                  {form.errors.title}
                </FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Button
            fontSize="1.6rem"
            width="7.5rem"
            height="4rem"
            backgroundColor="blue.700"
            colorScheme="blue"
            borderRadius="1rem"
            type="submit"
          >
            Add
          </Button>
        </Form>
      )}
    </Formik>
  );
};
