import styles from './CourseSearchWindow.module.scss';
import { useRef, useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import classNames from 'classnames/bind';
import AppButton from '@components/shared/AppButton/AppButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { plus } from '@styles/fontawesome';
import { useTheme } from 'next-themes';
import SearchControl from './SearchControl/SearchControl';
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  borderRadiusSM,
  defaultText,
  defaultTextDark,
  fontSizeMD,
  gray2,
  gray4,
  gray5,
  gray7,
} from '@styles/variables';

type Inputs = {
  department: string;
  number: number;
  unit: number;
  title: string;
};

interface Props {
  windowToggle: boolean;
  setWindowToggle: (value: boolean) => void;
}

const CourseSearchWindow = (props: Props) => {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [springProps, springApi] = useSpring(() => ({
    height: '0px',
    marginBottom: '0',
  }));

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  useEffect(() => {
    if (contentRef.current !== null) {
      springApi.start({
        height:
          (props.windowToggle ? contentRef.current.offsetHeight : 0) + 'px',
        marginBottom: props.windowToggle ? '2rem' : '0',
      });
    }
  }, [springApi, contentRef, props.windowToggle]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cx = classNames.bind(styles);

  if (!mounted) {
    return null;
  }

  return (
    <animated.div
      className={cx('animatedDiv')}
      style={{
        ...springProps,
      }}
    >
      <div ref={contentRef} className={styles.contentWrapper}>
        <div className={styles.container}>
          {/* top left */}
          <SearchControl />

          {/* top right */}
          <div className={styles.customBtnWrapper}>
            <Menu offset={[-80, 9]}>
              <MenuButton>
                <AppButton
                  kind="secondary"
                  leftIcon={<FontAwesomeIcon icon={plus} />}
                >
                  Custom
                </AppButton>
              </MenuButton>

              <MenuList
                borderRadius={borderRadiusSM}
                borderColor={theme === 'light' ? gray5 : gray4}
                fontSize={fontSizeMD}
                color={theme === 'light' ? defaultText : defaultTextDark}
                padding=".6rem .4rem"
                bgColor={theme === 'light' ? gray7 : gray2}
              >
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className={cx('input-form')}>
                    <label>Department</label>
                    <input {...register('department')} />
                  </div>

                  <div>
                    <div className={cx('input-form')}>
                      <label>Number</label>
                      <input {...register('number')} />
                    </div>
                    <div className={cx('input-form')}>
                      <label>Unit</label>
                      <input {...register('unit')} />
                    </div>
                  </div>

                  <div className={cx('input-form')}>
                    <label>Title</label>
                    <input {...register('title')} />
                  </div>

                  <AppButton kind="primary" type="submit">
                    Create
                  </AppButton>
                </form>
              </MenuList>
            </Menu>
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
