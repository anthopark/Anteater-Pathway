import styles from './ResultWindow.module.scss';
import classNames from 'classnames/bind';
import SearchResultCourseItem from '../SearchResultCourseItem/SearchResultCourseItem';
import { ReactNode, useMemo, useState, useEffect } from 'react';
import { Updater } from 'use-immer';
import { Spinner } from '@chakra-ui/react';
import { primary1, accent1 } from '@styles/variables';
import { useTheme } from 'next-themes';

const cx = classNames.bind(styles);

interface Props {
  isLoading: boolean;
  displayResults: ResponseModel.Course[] | null;
  selectedIds: Set<string>;
  setClickedCourse: (course: ResponseModel.Course | null) => void;
  updateSelectedIds: Updater<Set<string>>;
}

function ResultWindow(props: Props) {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  const isInitialState = useMemo(() => {
    return props.displayResults === null;
  }, [props.displayResults]);

  const isResultEmpty = useMemo(() => {
    return props.displayResults && props.displayResults.length === 0;
  }, [props.displayResults]);

  const isResultReturned = useMemo(() => {
    return props.displayResults && props.displayResults.length > 0;
  }, [props.displayResults]);

  const handleInfoClick = (index: number) => {
    props.setClickedCourse(props.displayResults![index]);
  };

  const handleCourseSelect = (courseId: string) => {
    props.updateSelectedIds((draft) => {
      if (draft.has(courseId)) {
        draft.delete(courseId);
      } else {
        draft.add(courseId);
      }
    });
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  let content: ReactNode;

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
        {props.displayResults!.map((courseInfo, index) => (
          <div
            key={index}
            onClick={() => {
              handleCourseSelect(courseInfo.id);
            }}
          >
            <SearchResultCourseItem
              deptCode={courseInfo.deptCode}
              num={courseInfo.num}
              isSelected={props.selectedIds.has(courseInfo.id)}
              handleInfoClick={() => handleInfoClick(index)}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={cx('container', {
        'display-courses': isResultReturned && !props.isLoading,
        'display-message': !isResultReturned || props.isLoading,
      })}
    >
      {content}
    </div>
  );
}

export default ResultWindow;
