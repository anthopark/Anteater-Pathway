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
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [deptOptions, setDeptOptions] =
    useState<DeptOption[]>(departmentOptions);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<DeptOption[]>();

  const { control } = useForm();

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

  const cx = classNames.bind(styles);

  return (
    <animated.div
      className={cx('animatedDiv', {
        opened: props.toggle,
      })}
      style={{
        ...style,
      }}
    >
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <div ref={contentRef} className={styles.contentWrapper}>
          <div className={styles.container}>
            {/* row 1 column 1 */}
            <div className={styles.searchSectionWrapper}>
              <div className={styles.departmentInputWrapper}>
                <label>Department</label>
                <Controller
                  name="departmentInput"
                  control={control}
                  render={({ field }) => (
                    <AppSingleSelect
                      placeholder="Find the department..."
                      options={deptOptions}
                      value={null}
                    />
                  )}
                />
              </div>
              <div className={styles.courseNumberInputWrapper}>
                <label>Number</label>
                <AppInput placeholder="Enter number" />
              </div>

              <AppButton kind="primary" onClick={() => console.log('clicked')}>
                Search
              </AppButton>
            </div>
            {/* row 1 column 2 */}
            <div className={styles.customBtnWrapper}>
              <AppButton
                kind="secondary"
                onClick={() => console.log('clicked')}
                leftIcon={<FontAwesomeIcon icon={plus} />}
              >
                Custom
              </AppButton>
            </div>
            {/* row 2 column 1 */}
            <div className={styles.leftPane}>
              <div className={styles.searchResult}></div>
            </div>

            {/* row 2 column 2 */}
            <div className={styles.rightPane}>
              <div></div>
            </div>
          </div>
        </div>
      </form>
    </animated.div>
  );
};

export default CourseSearchWindow;
