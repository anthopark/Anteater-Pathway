import styles from './CourseSearchWindow.module.scss';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import React, { useRef, useEffect, forwardRef, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import classNames from 'classnames/bind';
import AppSingleSelect from '@components/shared/AppSingleSelect/AppSingleSelect';
import AppInput from '@components/shared/AppInput/AppInput';
import AppButton from '@components/shared/AppButton/AppButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { plus } from '@styles/fontawesome';
import { FormControl, FormLabel } from '@chakra-ui/react';
import {
  defaultText,
  defaultTextDark,
  fontSizeMD,
  letterSpacingMD,
} from '@styles/variables';
import { useTheme } from 'next-themes';

interface Props {
  toggle: boolean;
}

interface DeptOption {
  label: string;
  value: string;
}

const departmentOptions = [
  {
    label: 'Informatics (IN4MATX)',
    value: 'IN4MATX',
  },
  {
    label: 'Computer Science (COMPSCI)',
    value: 'COMPSCI',
  },
];

const CourseSearchWindow = (props: Props) => {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [deptOptions, setDeptOptions] =
    useState<DeptOption[]>(departmentOptions);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm();
  const [style, animate] = useSpring(
    () => ({
      height: '0px',
    }),
    []
  );

  useEffect(() => {
    if (contentRef.current !== null) {
      animate.start({
        height: (props.toggle ? contentRef.current.offsetHeight : 0) + 'px',
      });
    }
  }, [animate, contentRef, props.toggle]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cx = classNames.bind(styles);

  if (!mounted) {
    return null;
  }

  return (
    <animated.div
      className={cx('animatedDiv', {
        opened: props.toggle,
      })}
      style={{
        ...style,
      }}
    >
      <div ref={contentRef} className={styles.contentWrapper}>
        <div className={styles.container}>
          {/* top left */}
          <form
            onSubmit={handleSubmit((data) => console.log(data))}
            className={styles.searchFormWrapper}
          >
            <FormControl isRequired mr="2rem" w="35rem">
              <FormLabel
                fontSize={fontSizeMD}
                letterSpacing={letterSpacingMD}
                color={theme === 'light' ? defaultText : defaultTextDark}
              >
                Department
              </FormLabel>
              <Controller
                name="deptCode"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                  <AppSingleSelect
                    name={name}
                    value={deptOptions.find((o) => o.value === value)}
                    placeholder="Select the department..."
                    options={deptOptions}
                    onChange={(option: DeptOption) => onChange(option.value)}
                  />
                )}
              />
            </FormControl>
            <FormControl mr="2rem" w="15rem">
              <FormLabel
                fontSize={fontSizeMD}
                letterSpacing={letterSpacingMD}
                color={theme === 'light' ? defaultText : defaultTextDark}
              >
                Number
              </FormLabel>
              <AppInput placeholder="Ex. 1A, 101" />
            </FormControl>

            <AppButton kind="primary" type="submit">
              Search
            </AppButton>
          </form>

          {/* row 1 column 2 */}
          <div className={styles.customBtnWrapper}>
            <AppButton
              kind="secondary"
              leftIcon={<FontAwesomeIcon icon={plus} />}
            >
              Custom
            </AppButton>
          </div>
          {/* row 2 column 1 */}
          <div className={styles.leftPane}></div>

          {/* row 2 column 2 */}
          <div className={styles.rightPane}></div>
        </div>
      </div>
    </animated.div>
  );
};

export default CourseSearchWindow;
