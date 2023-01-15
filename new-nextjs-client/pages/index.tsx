import styles from './index.module.scss';
import MainLayout from '@components/MainLayout/MainLayout';
import { ReactNode, useEffect, useRef, useState } from 'react';
import ThemeToggler from '@components/ThemeToggler/ThemeToggler';
import AddYearDropdown from '@components/index-page/AddYearDropdown/AddYearDropdown';
import Avatar from '@components/index-page/Avatar/Avatar';
import AppButton from '@components/shared/AppButton/AppButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { search } from '@styles/fontawesome';

import { useSpring, animated } from '@react-spring/web';
import { white1 } from '@styles/variables';

export default function Home() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [toggle, setToggle] = useState(false);
  const [style, animate] = useSpring(() => ({ height: '0px' }), []);

  useEffect(() => {
    if (contentRef.current !== null) {
      animate({
        height: (toggle ? contentRef.current.offsetHeight : 0) + 'px',
      });
    }
  }, [animate, contentRef, toggle]);

  return (
    <div className={styles.container}>
      <div className={styles.topSection}>
        <div className={styles.leftContainer}>
          <div className={styles.addYearDropdownWrapper}>
            <AddYearDropdown />
          </div>
          <div className={styles.searchBtnWrapper}>
            <AppButton
              kind="primary"
              leftIcon={<FontAwesomeIcon icon={search} />}
              onClick={() => setToggle(!toggle)}
            >
              Courses
            </AppButton>
          </div>
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.themeTogglerWrapper}>
            <ThemeToggler />
          </div>
          <div className={styles.avatarWrapper}>
            <Avatar />
          </div>
        </div>
      </div>

      <div className={styles.mainSection}>
        <animated.div
          style={{
            background: white1,
            overflow: 'hidden',
            width: '100%',
            ...style,
          }}
        >
          <div
            ref={contentRef}
            style={{ height: '20rem', margin: '1rem 0' }}
          ></div>
        </animated.div>
      </div>
    </div>
  );
}

Home.getLayout = function getLayout(page: ReactNode) {
  return <MainLayout>{page}</MainLayout>;
};
