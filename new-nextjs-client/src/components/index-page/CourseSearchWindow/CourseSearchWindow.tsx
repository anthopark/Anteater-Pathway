import styles from './CourseSearchWindow.module.scss';
import { useRef, useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import classNames from 'classnames/bind';
import { useTheme } from 'next-themes';
import SearchControl from './SearchControl/SearchControl';
import AddCustomCourse from './AddCustomCourse/AddCustomCourse';
import ResultWindow from './ResultWindow/ResultWindow';
import { useImmer, Updater } from 'use-immer';
import AppButton from '@components/shared/AppButton/AppButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { plus } from '@styles/fontawesome';
const cx = classNames.bind(styles);

interface Props {
  windowToggle: boolean;
  setWindowToggle: (value: boolean) => void;
}

const CourseSearchWindow = (props: Props) => {
  const [searchResults, setSearchResults] = useState<
    ResponseModel.Course[] | null
  >(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedIndices, updateSelectedIndices] = useImmer<Set<number>>(
    new Set<number>()
  );

  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [springProps, springApi] = useSpring(() => ({
    height: '0px',
    marginBottom: '0',
  }));

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
          <SearchControl
            setIsLoading={setIsLoading}
            setSearchResults={setSearchResults}
            updateSelectedIndices={updateSelectedIndices}
          />

          {/* top right */}
          <div className={styles.customBtnWrapper}>
            <AddCustomCourse />
          </div>

          {/* row 2 column 1 */}
          <div className={cx('result-window-wrapper')}>
            <ResultWindow
              isLoading={isLoading}
              searchResults={searchResults}
              selectedIndices={selectedIndices}
              updateSelectedIndices={updateSelectedIndices}
            />
          </div>

          {/* row 2 column 2 */}
          <div className={styles.rightPane}></div>

          {/* row 3 column 1 */}
          <div className={cx('footer-right')}>
            <AppButton
              isDisabled
              kind="primary"
              leftIcon={<FontAwesomeIcon icon={plus} />}
            >
              Add to Course Bag
            </AppButton>
          </div>

          <div className={cx('footer-left')}></div>
        </div>
      </div>
    </animated.div>
  );
};

export default CourseSearchWindow;
