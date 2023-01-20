import styles from './CourseSearchWindow.module.scss';
import React, { useRef, useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import classNames from 'classnames/bind';
import AppButton from '@components/shared/AppButton/AppButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { plus } from '@styles/fontawesome';
import { useTheme } from 'next-themes';
import SearchControl from './SearchControl/SearchControl';

interface Props {
  windowToggle: boolean;
  setWindowToggle: (value: boolean) => void;
}

const CourseSearchWindow = (props: Props) => {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [style, animate] = useSpring(
    () => ({
      height: '0px',
    }),
    []
  );

  useEffect(() => {
    if (contentRef.current !== null) {
      animate.start({
        height:
          (props.windowToggle ? contentRef.current.offsetHeight : 0) + 'px',
      });
    }
  }, [animate, contentRef, props.windowToggle]);

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
        opened: props.windowToggle,
      })}
      style={{
        ...style,
      }}
    >
      <div ref={contentRef} className={styles.contentWrapper}>
        <div className={styles.container}>
          {/* top left */}
          <SearchControl />

          {/* top right */}
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
