import styles from './ContactUsModal.module.scss';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormLabel,
  FormControl,
  Textarea,
  Spinner,
} from '@chakra-ui/react';
import {
  borderRadiusMD,
  fontSizeLG,
  gray1,
  gray2,
  gray3,
  gray4,
  gray7,
  letterSpacingLG,
  letterSpacingSM,
  accent1,
  blue2,
  borderRadiusSM,
  defaultText,
  defaultTextDark,
  fontSizeMD,
  placeholderText,
  placeholderTextDark,
  white1,
} from '@styles/variables';
import {
  inputBgColorActiveDark,
  inputBgColorDark,
} from '@styles/reusable-ui-variables';
import { useTheme } from 'next-themes';

import Image from 'next/image';
import AppInput from '@components/shared/AppInput/AppInput';
import AppButton from '@components/shared/AppButton/AppButton';
import useAppToast from '@hooks/useAppToast';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from 'src/firebase/service-access';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

type Inputs = {
  email: string | null;
  message: string;
};

const ContactUsModal = ({ isOpen, onClose }: Props) => {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const [firebaseUser] = useAuthState(auth);
  const [emailSending, setEmailSending] = useState(false);

  const showToastBox = useAppToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Inputs>();

  useEffect(() => {
    if (firebaseUser) {
      setValue('email', firebaseUser.email);
    } else {
      setValue('email', '');
    }
  }, [firebaseUser]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setEmailSending(true);

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.status === 200) {
      showToastBox({
        status: 'success',
        message: 'Sent! Thank you :)',
        highlightedData: null,
        duration: 3500,
      });

      setValue('message', '');
      onClose();
    } else {
      showToastBox({
        status: 'fail',
        highlightedData: null,
        message: 'Something went wrong :(',
        duration: 3500,
      });
    }

    setEmailSending(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent
        borderRadius={borderRadiusMD}
        bgColor={theme === 'light' ? gray7 : gray1}
      >
        <div className={styles.logoContainer}>
          <Image src="/anteater-logo.svg" alt="logo" fill />
        </div>
        <ModalHeader
          pt="2rem"
          textAlign="center"
          letterSpacing={letterSpacingLG}
          fontSize={'1.8rem'}
          fontWeight={400}
          color={theme === 'light' ? defaultText : defaultTextDark}
        >
          Help us become more useful to you!
        </ModalHeader>

        <ModalCloseButton
          fontSize="1.2rem"
          mt=".7rem"
          mr=".7rem"
          color={gray4}
        />
        <ModalBody
          fontSize={fontSizeLG}
          letterSpacing={letterSpacingSM}
          color={theme === 'light' ? defaultText : defaultTextDark}
          textAlign="center"
          padding="1rem 5rem"
          p="2.5rem 4rem 2.3rem 4rem"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <div className={styles.inputForm}>
                <FormLabel
                  htmlFor="email"
                  letterSpacing={letterSpacingSM}
                  className={styles.inputLabel}
                >
                  Email address (Optional)
                </FormLabel>
                <AppInput
                  id="email"
                  {...register('email', {
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                />

                {errors.email ? (
                  <span className={styles.errorMessage}>
                    {errors.email.message}
                  </span>
                ) : (
                  <span className={styles.emailFieldMessage}>
                    Fill this if you'd like our response.
                  </span>
                )}
              </div>
            </FormControl>

            <FormControl isRequired>
              <div className={styles.inputForm}>
                <FormLabel
                  letterSpacing={letterSpacingSM}
                  className={styles.inputLabel}
                >
                  Message
                </FormLabel>
                <Textarea
                  id="message"
                  placeholder="feedback or a bug report?"
                  padding="1rem"
                  {...register('message', {
                    maxLength: {
                      value: 299,
                      message: "Message can't be more than 300 characters",
                    },
                  })}
                  bgColor={theme === 'light' ? white1 : inputBgColorDark}
                  height="8.5rem"
                  borderRadius={borderRadiusSM}
                  color={theme === 'light' ? defaultText : defaultTextDark}
                  _placeholder={{
                    color:
                      theme === 'light' ? placeholderText : placeholderTextDark,
                  }}
                  fontSize={fontSizeMD}
                  borderColor={theme === 'light' ? gray4 : gray3}
                  _hover={{ borderColor: theme === 'light' ? gray2 : gray4 }}
                  _active={{
                    borderColor: theme === 'light' ? blue2 : accent1,
                    boxShadow:
                      theme === 'light'
                        ? `0px 0px 0px 1px ${blue2}`
                        : `0px 0px 0px 1px ${accent1}`,
                  }}
                  _focus={{
                    borderColor: theme === 'light' ? blue2 : accent1,
                    boxShadow:
                      theme === 'light'
                        ? `0px 0px 0px 1px ${blue2}`
                        : `0px 0px 0px 1px ${accent1}`,

                    backgroundColor:
                      theme === 'light' ? white1 : inputBgColorActiveDark,
                  }}
                />
                {errors.message && (
                  <span className={styles.errorMessage}>
                    {errors.message && errors.message.message}
                  </span>
                )}
              </div>
            </FormControl>
            <div className={styles.sendBtnWrapper}>
              <AppButton kind="primary" type="submit" width="7rem">
                {emailSending ? <Spinner /> : 'Send'}
              </AppButton>
            </div>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ContactUsModal;
