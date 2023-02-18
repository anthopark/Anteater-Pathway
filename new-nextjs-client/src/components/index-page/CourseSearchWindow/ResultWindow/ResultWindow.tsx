import styles from './ResultWindow.module.scss';
import classNames from 'classnames/bind';
import { CourseResponse } from 'src/models/course-response';
import SearchResultCourseItem from '../SearchResultCourseItem/SearchResultCourseItem';
import { ReactNode, useMemo, useState, useEffect } from 'react';
import { Updater } from 'use-immer';
import { Spinner } from '@chakra-ui/react';
import { primary1, accent1 } from '@styles/variables';
import { useTheme } from 'next-themes';

const cx = classNames.bind(styles);

interface Props {
  isLoading: boolean;
  searchResults: CourseResponse[] | null;
  selectedIndices: Set<number>;
  updateSelectedIndices: Updater<Set<number>>;
}

function ResultWindow(props: Props) {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  let content: ReactNode;

  const isInitialState = useMemo(() => {
    return props.searchResults === null;
  }, [props.searchResults]);

  const isResultEmpty = useMemo(() => {
    return props.searchResults && props.searchResults.length === 1;
  }, [props.searchResults]);

  const isResultReturned = useMemo(() => {
    return props.searchResults && props.searchResults.length > 0;
  }, [props.searchResults]);

  const handleCourseSelect = (index: number) => {
    props.updateSelectedIndices((draft) => {
      if (draft.has(index)) {
        draft.delete(index);
      } else {
        draft.add(index);
      }
    });
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (props.isLoading) {
    content = (
      <div className={cx('message-wrapper')}>
        <Spinner
          size="xl"
          color={theme === 'light' ? primary1 : accent1}
          speed="0.5s"
        />
      </div>
    );
  } else if (isInitialState) {
    content = (
      <div className={cx('message-wrapper')}>
        <span className={cx('message')}>
          Begin searching by selecting a department.
        </span>
      </div>
    );
  } else if (isResultEmpty) {
    content = (
      <div className={cx('message-wrapper')}>
        <span className={cx('message')}>Can't find the course?</span>
        <span className={cx('message')}>
          Create your own course by clicking the "+ Custom" button.
        </span>
      </div>
    );
  } else if (isResultReturned) {
    content = (
      <div className={cx('grid-container')}>
        {props.searchResults!.map((courseInfo, index) => (
          <div key={index} onClick={() => handleCourseSelect(index)}>
            <SearchResultCourseItem
              deptCode={courseInfo.deptCode}
              num={courseInfo.num}
              isSelected={props.selectedIndices.has(index)}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={cx('container', {
        'display-courses': isResultReturned,
        'display-message': !isResultReturned,
      })}
    >
      {content}
    </div>
  );
}

export default ResultWindow;
