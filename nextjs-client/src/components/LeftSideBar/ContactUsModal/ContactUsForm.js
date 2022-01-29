import { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  FormHelperText,
  FormErrorMessage,
  Spinner,
} from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import { auth } from "src/firebase/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { ContactUsFormContainer } from "./styled";
import { DefaultButton } from "@components/CustomChakraUI";
import { sendUserContactMessage } from "src/api/user";
import { useToastBox } from "src/hooks/useToastBox";

export const ContactUsForm = ({ themeStyles, onModalClose }) => {
  const [firebaseAuthUser] = useAuthState(auth);
  const { showToastBox } = useToastBox();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (value) => {
    let error;

    if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Invalid email address";
    }
    return error;
  };

  const validateContent = (value) => {
    let error;

    if (!value) {
      error = "Message can't be empty";
    } else if (value && value.length >= 300) {
      error = "Message can't be more than 300 characters";
    }
    return error;
  };

  const handleSubmit = async (values, resetForm) => {
    let response;
    setIsSubmitting(true);
    try {
      response = await sendUserContactMessage(values.email, values.content);
    } catch (e) {
      showToastBox({
        status: "failure",
        dataOfInterest: ["Server Error"],
        message: "Something went wrong :(",
      });
      setIsSubmitting(false);
      return;
    }

    if (response.status === 200) {
      showToastBox({
        status: "success",
        dataOfInterest: [],
        message: "Sent! Thank you :)",
      });
      resetForm();
      onModalClose();
    }
    setIsSubmitting(false);
  };

  return (
    <ContactUsFormContainer>
      <Formik
        initialValues={{
          email: firebaseAuthUser ? firebaseAuthUser.email : "",
          content: "",
        }}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values, resetForm);
        }}
      >
        {() => (
          <Form>
            <div className="email-form-container">
              <Field name="email" validate={validateEmail}>
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.email}>
                    <FormLabel htmlFor="email" fontSize="1.4rem">
                      Email address (Optional)
                    </FormLabel>
                    <Input
                      {...field}
                      id="email"
                      fontSize="1.4rem"
                      height="3rem"
                      borderRadius="7px"
                      letterSpacing="1px"
                      autoComplete="off"
                      spellCheck={false}
                      borderColor={themeStyles.colors.inputFormBorder}
                      _hover={{
                        borderColor: themeStyles.colors.inputFormBorderHover,
                      }}
                    />
                    {form.errors.email ? (
                      <FormErrorMessage fontSize="1.2rem" pl=".2rem">
                        {form.errors.email}
                      </FormErrorMessage>
                    ) : (
                      <FormHelperText fontSize="1.2rem" pl=".2rem">
                        {`Fill this if you'd like our response.`}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              </Field>
            </div>
            <div className="content-container">
              <Field name="content" validate={validateContent}>
                {({ field, form }) => (
                  <FormControl isRequired isInvalid={form.errors.content}>
                    <FormLabel htmlFor="content" fontSize="1.4rem">
                      Message
                    </FormLabel>
                    <Textarea
                      {...field}
                      id="content"
                      borderColor={themeStyles.colors.inputFormBorder}
                      _hover={{
                        borderColor: themeStyles.colors.inputFormBorderHover,
                      }}
                      borderRadius="7px"
                      fontSize="1.4rem"
                      letterSpacing="1px"
                      placeholder="Please provide us with feedback!"
                    />
                    <FormErrorMessage fontSize="1.2rem" pl=".2rem">
                      {form.errors.content}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </div>
            <div className="button-container">
              {isSubmitting ? (
                <DefaultButton p="1.8rem 2.5rem">
                  <Spinner size="md" textAlign="center" />
                </DefaultButton>
              ) : (
                <DefaultButton
                  p="1.8rem 1.3rem"
                  fontSize="1.5rem"
                  type="submit"
                >
                  Send
                </DefaultButton>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </ContactUsFormContainer>
  );
};
