import styles from './ContactUsForm.module.scss';
import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  FormLabel,
  FormControl,
  Textarea,
  FormErrorMessage,
} from '@chakra-ui/react';
import AppInput from '@components/shared/AppInput/AppInput';
import {
  accent1,
  blue2,
  borderRadiusMD,
  defaultText,
  defaultTextDark,
  fontSizeMD,
  gray2,
  gray3,
  gray4,
  letterSpacingMD,
  placeholderText,
  placeholderTextDark,
  white1,
} from '@styles/variables';
import AppButton from '@components/shared/AppButton/AppButton';
import {
  inputBgColorActiveDark,
  inputBgColorDark,
} from '@styles/reusable-ui-variables';
import { useTheme } from 'next-themes';

interface Props {
  onClose: () => void;
}

type Inputs = {
  email: string;
  message: string;
};

const ContactUsForm = ({ onClose }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      email: 'emilyphee93@gmail.com',
      message: '',
    },
  });

  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    reset();
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <div className={styles.inputForm}>
          <FormLabel
            htmlFor="email"
            letterSpacing={letterSpacingMD}
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
              {errors.email && errors.email.message}
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
            letterSpacing={letterSpacingMD}
            className={styles.inputLabel}
          >
            Message
          </FormLabel>
          <Textarea
            id="message"
            placeholder="feedback or a bug report?"
            {...register('message', {
              maxLength: {
                value: 299,
                message: "Message can't be more than 300 characters",
              },
            })}
            bgColor={theme === 'light' ? white1 : inputBgColorDark}
            height="10rem"
            borderRadius={borderRadiusMD}
            color={theme === 'light' ? defaultText : defaultTextDark}
            _placeholder={{
              color: theme === 'light' ? placeholderText : placeholderTextDark,
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
          Send
        </AppButton>
      </div>
    </form>
  );
};

export default ContactUsForm;
