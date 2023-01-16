import styles from './CourseSearchWindow.module.scss';
import { useRef, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import classNames from 'classnames/bind';

interface Props {
  toggle: boolean;
}

const CourseSearchWindow = (props: Props) => {
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
      <div ref={contentRef} className={styles.contentWrapper}></div>
    </animated.div>
  );
};

export default CourseSearchWindow;
