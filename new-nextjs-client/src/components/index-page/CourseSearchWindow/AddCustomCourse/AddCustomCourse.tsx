import styles from './AddCustomCourse.module.scss';
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
import useAppUser from '@hooks/useAppUser';
import { Course, CourseInfo } from '@entities/course';

type Inputs = {
  department: string;
  number: number;
  unit: number;
  title: string;
};

const AddCustomCourse = () => {
  const { appUser, updateAppUser } = useAppUser();
  const { theme } = useTheme();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    let addedCourseItem = new Course(
      {
        deptCode: data.department,
        num: String(data.number),
        unit: Number(data.unit),
      } as CourseInfo,
      true
    );
    updateAppUser((draft) => draft.addToCourseBag([addedCourseItem]));
  };

  const validateDepartmentCode = (value: string) => {
    let error;
    if (value.trim().length >= 9) {
      error = 'Please use < 9 characters';
      return false;
    }
  };

  const validateNumber = (value: string) => {
    let error;
    if (value.trim().length >= 6) {
      error = 'Please use < 6 characters';
      return false;
    }
  };

  const validateUnit = (value: string) => {
    let error;
    if (isNaN(Number(value.trim()))) {
      error = 'Invalid value for unit';
      return false;
    } else if (Number(value.trim()) < 0) {
      error = "Unit can't be negative";
      return false;
    } else if (Number(value.trim()) > 20) {
      error = 'Unit is too big';
      return false;
    }
  };

  const validateTitle = (value: string) => {
    let error;
    if (value.trim().length >= 80) {
      error = 'Please use < 80 characters';
      return false;
    }
  };

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
                  placeholder="Ex. ECON, HISTORY"
                  {...register('department', {
                    required: true,
                    validate: (value) => validateDepartmentCode(value),
                  })}
                />
              </div>
            </FormControl>

            <div className={styles.additionalIntoWrapper}>
              <FormControl isRequired>
                <div
                  className={styles.inputForm}
                  style={{ marginRight: '.7rem' }}
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
                    {...register('number', {
                      required: true,
                      validate: (value) => validateNumber(String(value)),
                    })}
                  />
                </div>
              </FormControl>
              <FormControl isRequired>
                <div
                  style={{ marginLeft: '.7rem' }}
                  className={styles.inputForm}
                >
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
                    {...register('unit', {
                      required: true,
                      validate: (value) => validateUnit(String(value)),
                    })}
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
                placeholder="Ex. Basic Statistics"
                {...register('title', {
                  validate: (value) => validateTitle(value),
                })}
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
