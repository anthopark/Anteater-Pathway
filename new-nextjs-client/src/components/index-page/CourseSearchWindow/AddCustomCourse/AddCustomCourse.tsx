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
  borderRadiusSM,
  controlHeightSM,
  defaultText,
  defaultTextDark,
  gray2,
  gray4,
  gray5,
  letterSpacingMD,
  white1,
} from '@styles/variables';
import { useForm, SubmitHandler } from 'react-hook-form';
import useAppUser from '@hooks/useAppUser';
import { Course } from '@entities/course';
import { useEffect, useState } from 'react';
import useAppToast from '@hooks/useAppToast';

type Inputs = {
  department: string;
  number: number;
  unit: number;
  title: string;
};

const AddCustomCourse = () => {
  const { updateAppUser } = useAppUser();
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const showToastBox = useAppToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    let addedCourseItem = new Course(
      {
        deptCode: data.department.toUpperCase(),
        num: String(data.number).toUpperCase(),
        unit: Number(data.unit),
      } as ResponseModel.Course,
      true
    );
    updateAppUser((draft) => draft.addToCourseBag([addedCourseItem]));
    setIsOpen(false);
    reset();

    showToastBox({
      status: 'success',
      highlightedData: `${data.department.toUpperCase()} ${String(
        data.number
      ).toUpperCase()}`,
      message: 'course added',
    });
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <Popover
      placement="bottom-end"
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <PopoverTrigger>
        <AppButton
          onClick={() => setIsOpen(!isOpen)}
          kind="secondary"
          leftIcon={<FontAwesomeIcon icon={plus} />}
        >
          Custom
        </AppButton>
      </PopoverTrigger>
      <PopoverContent
        borderRadius={borderRadiusSM}
        borderWidth={theme === 'light' ? '2px' : '1px'}
        borderColor={theme === 'light' ? gray5 : gray4}
        color={theme === 'light' ? defaultText : defaultTextDark}
        padding="1.2rem .8rem"
        bg={theme === 'light' ? white1 : gray2}
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
                  style={{
                    height: controlHeightSM,
                  }}
                  placeholder="Ex. ECON, HISTORY"
                  {...register('department', {
                    required: true,
                    maxLength: {
                      value: 8,
                      message: 'Please use < 9 characters',
                    },
                  })}
                />

                {errors.department && (
                  <span className={styles.errorMessage}>
                    {errors.department.message}
                  </span>
                )}
              </div>
            </FormControl>

            <div className={styles.additionalInfoWrapper}>
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
                    style={{
                      height: controlHeightSM,
                    }}
                    placeholder="Ex. 101, 1A"
                    {...register('number', {
                      required: true,
                      maxLength: {
                        value: 5,
                        message: 'Please use < 6 characters',
                      },
                    })}
                  />
                  {errors.number && (
                    <span className={styles.errorMessage}>
                      {errors.number.message}
                    </span>
                  )}
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
                    style={{
                      height: controlHeightSM,
                    }}
                    placeholder="Ex. 2, 4"
                    {...register('unit', {
                      required: true,
                      min: { value: 0, message: "Unit can't be negative" },
                      max: { value: 20, message: 'Unit is too big' },
                      validate: (value) =>
                        !isNaN(value) || 'Invalid value for unit',
                    })}
                  />
                  {errors.unit && (
                    <span className={styles.errorMessage}>
                      {errors.unit.message}
                    </span>
                  )}
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
                style={{
                  height: controlHeightSM,
                }}
                placeholder="Ex. Basic Statistics"
                {...register('title', {
                  maxLength: {
                    value: 79,
                    message: 'Please use < 80 characters',
                  },
                })}
              />
              {errors.title && (
                <span className={styles.errorMessage}>
                  {errors.title.message}
                </span>
              )}
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
