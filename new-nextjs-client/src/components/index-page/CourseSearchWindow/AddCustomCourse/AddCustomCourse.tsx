import styles from './AddCustomCourse.module.scss';
import classNames from 'classnames';
import { useTheme } from 'next-themes';
import AppInput from '@components/shared/AppInput/AppInput';

import AppButton from '@components/shared/AppButton/AppButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { plus } from '@styles/fontawesome';

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  FormLabel,
  FormControl,
} from '@chakra-ui/react';

import {
  bgColor2,
  bgColorDark2,
  borderRadiusSM,
  controlHeightSM,
  defaultText,
  defaultTextDark,
  gray2,
  gray4,
  gray5,
  gray7,
  letterSpacingMD,
} from '@styles/variables';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  department: string;
  number: number;
  unit: number;
  title: string;
};

const AddCustomCourse = () => {
  const { theme } = useTheme();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <Popover placement="bottom-end">
      <PopoverTrigger>
        <AppButton kind="secondary" leftIcon={<FontAwesomeIcon icon={plus} />}>
          Custom
        </AppButton>
      </PopoverTrigger>
      <PopoverContent
        borderRadius={borderRadiusSM}
        borderColor={theme === 'light' ? gray5 : gray4}
        color={theme === 'light' ? defaultText : defaultTextDark}
        padding="1.2rem .8rem"
        bg={theme === 'light' ? gray7 : gray2}
        w={'24.5rem'}
      >
        <PopoverBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isRequired>
              <div className={styles.inputForm}>
                <FormLabel
                  letterSpacing={letterSpacingMD}
                  htmlFor="department"
                  className={styles.inputLabel}
                >
                  Department
                </FormLabel>
                <AppInput
                  id="department"
                  height={controlHeightSM}
                  placeholder="Ex. Econ, History"
                  {...register('department', { required: true })}
                />
              </div>
            </FormControl>

            <div className={styles.additionalIntoWrapper}>
              <FormControl isRequired>
                <div
                  className={styles.inputForm}
                  style={{ marginRight: '1rem' }}
                >
                  <FormLabel
                    letterSpacing={letterSpacingMD}
                    htmlFor="number"
                    className={styles.inputLabel}
                  >
                    Number
                  </FormLabel>
                  <AppInput
                    id="number"
                    height={controlHeightSM}
                    placeholder="Ex. 101, 1A"
                    {...register('number', { required: true })}
                  />
                </div>
              </FormControl>
              <FormControl isRequired>
                <div className={styles.inputForm}>
                  <FormLabel
                    letterSpacing={letterSpacingMD}
                    htmlFor="unit"
                    className={styles.inputLabel}
                  >
                    Unit
                  </FormLabel>
                  <AppInput
                    id="unit"
                    height={controlHeightSM}
                    placeholder="Ex. 2, 4"
                    {...register('unit', { required: true })}
                  />
                </div>
              </FormControl>
            </div>

            <div className={styles.inputForm}>
              <FormLabel
                letterSpacing={letterSpacingMD}
                htmlFor="title"
                className={styles.inputLabel}
              >
                Title
              </FormLabel>
              <AppInput
                id="title"
                height={controlHeightSM}
                placeholder="Ex. Basic statistics"
                {...register('title')}
              />
            </div>

            <div className={styles.createBtnWrapper}>
              <AppButton
                kind="primary"
                type="submit"
                width="100%"
                height="3.4rem"
              >
                Create
              </AppButton>
            </div>
          </form>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default AddCustomCourse;
