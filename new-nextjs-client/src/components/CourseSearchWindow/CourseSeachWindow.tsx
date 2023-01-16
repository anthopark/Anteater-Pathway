import styles from './CourseSeachWindow.module.scss';
import { useRef, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';

interface Props {
  toggle: boolean;
}

const CourseSeachWindow = (props: Props) => {
  const contentRef = useRef<HTMLDivElement | null>(null);

  const [style, animate] = useSpring(() => ({ height: '0px' }), []);

  useEffect(() => {
    if (contentRef.current !== null) {
      animate.start({
        height: (props.toggle ? contentRef.current.offsetHeight : 0) + 'px',
      });
    }
  }, [animate, contentRef, props.toggle]);

  return (
    <animated.div
      className={styles.animatedDiv}
      style={{
        ...style,
      }}
    >
      <div ref={contentRef} className={styles.contentWrapper}></div>
    </animated.div>
  );
};

export default CourseSeachWindow;
