import styles from './CourseSearchWindow.module.scss';
import { useRef, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import classNames from 'classnames/bind';
import AppSingleSelect from '@components/shared/AppSingleSelect/AppSingleSelect';
import AppInput from '@components/shared/AppInput/AppInput';

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
      <div ref={contentRef} className={styles.contentWrapper}>
        <div className={styles.container}>
          {/* row 1 column 1 */}
          <div className={styles.box}>
            <div className={styles.departmentInputWrapper}>
              <AppSingleSelect
                placeholder="Find the department..."
                options={[{ department: 'INF', number: 43 }]}
                value={null}
              />
            </div>
            <div className={styles.courseNumberInputWrapper}>
              <AppInput placeholder="Enter number" />
            </div>
          </div>
          {/* row 1 column 2 */}
          <div className={styles.box}>B</div>
          {/* row 2 column 1 */}
          <div className={styles.box}>C</div>
          {/* row 2 column 2 */}
          <div className={styles.box}>D</div>
        </div>
      </div>
    </animated.div>
  );
};

export default CourseSearchWindow;
