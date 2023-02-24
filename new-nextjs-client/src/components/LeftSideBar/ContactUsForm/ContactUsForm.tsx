import styles from './ContactUsForm.module.scss';
import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Textarea,
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

type Inputs = {
  email: string;
  message: string;
};

const ContactUsForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <div className={styles.inputForm}>
          <FormLabel
            letterSpacing={letterSpacingMD}
            className={styles.inputLabel}
          >
            Email address (Optional)
          </FormLabel>
          <AppInput
            id="email"
            value={'emilypark93@gmail.com'}
            {...register('email')}
          />
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
            {...register('message')}
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
        </div>
      </FormControl>
      <div className={styles.sendBtnWrapper}>
        <AppButton kind="primary" type="submit">
          Send
        </AppButton>
      </div>
    </form>
  );
};

export default ContactUsForm;
