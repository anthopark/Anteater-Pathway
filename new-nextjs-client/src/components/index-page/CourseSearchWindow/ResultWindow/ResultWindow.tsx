import styles from './ResultWindow.module.scss';
import classNames from 'classnames/bind';
import { CourseResponse } from 'src/models/course-response';
import SearchResultCourseItem from '../SearchResultCourseItem/SearchResultCourseItem';
import { ReactNode, useCallback } from 'react';
import { Updater } from 'use-immer';

const cx = classNames.bind(styles);

interface Props {
  searchResults: CourseResponse[] | null;
  selectedIndices: Set<number>;
  updateSelectedIndices: Updater<Set<number>>;
}

function ResultWindow(props: Props) {
  let content: ReactNode;

  const isResultEmpty = useCallback(() => {
    return props.searchResults && props.searchResults.length === 1;
  }, [props.searchResults]);

  const isInitialState = useCallback(() => {
    return props.searchResults === null;
  }, [props.searchResults]);

  const isResultReturned = useCallback(() => {
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

  if (isResultReturned()) {
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
        'result-returned': isResultReturned(),
      })}
    >
      {content}
    </div>
  );
}

export default ResultWindow;
