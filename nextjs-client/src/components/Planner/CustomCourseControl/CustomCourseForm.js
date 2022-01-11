import { Formik, Field, Form } from "formik";
import { Course } from "src/entities/course";
import { useGlobalObjects } from "@components/GlobalContextProvider";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { DefaultButton } from "@components/CustomChakraUI";
import { useToastBox } from "src/hooks/useToastBox";

export const CustomCourseForm = ({ setIsPopoverOpen }) => {
  const { appUser, updateAppUser } = useGlobalObjects();
  const { showToastBox } = useToastBox();

  const validateDepartmentCode = (value) => {
    let error;
    if (!value) {
      error = "Department is required";
    } else if (value.trim().length >= 9) {
      error = "Please use < 9 characters";
    }

    return error;
  };

  const validateNumber = (value) => {
    let error;
    if (!value) {
      error = "Number is required";
    } else if (value.trim().length >= 6) {
      error = "Please use < 6 characters";
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
    console.log(values);
    const newCourse = new Course(values);
    newCourse.isCustomCreated = true;
    appUser.tentativePlanner.addCourse(newCourse);
    updateAppUser(appUser);

    showToastBox({
      status: "success",
      dataOfInterest: [`${values.departmentCode} ${values.number}`],
      message: "Course added:",
    });
  };

  return (
    <Formik
      initialValues={{
        departmentCode: "",
        number: "",
        title: "",
        unit: "",
      }}
      onSubmit={(values, { resetForm }) => {
        handleSubmit(values);
        resetForm();
        setIsPopoverOpen(false);
      }}
    >
      {() => (
        <Form>
          <Field name="departmentCode" validate={validateDepartmentCode}>
            {({ field, form }) => (
              <FormControl
                isInvalid={form.errors.departmentCode}
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
                  autoComplete="off"
                  placeholder="Ex. ECON, HISTORY"
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
                    autoComplete="off"
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
                    autoComplete="off"
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
                  autoComplete="off"
                />
                <FormErrorMessage fontSize="1.3rem">
                  {form.errors.title}
                </FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <DefaultButton>Create</DefaultButton>
        </Form>
      )}
    </Formik>
  );
};
