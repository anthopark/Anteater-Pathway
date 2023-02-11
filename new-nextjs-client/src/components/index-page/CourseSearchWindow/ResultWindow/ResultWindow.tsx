import styles from './ResultWindow.module.scss';
import classNames from 'classnames/bind';
import { CourseResponse } from 'src/models/course-response';
import SearchResultCourseItem from '../SearchResultCourseItem/SearchResultCourseItem';

const cx = classNames.bind(styles);

interface Props {
  searchResults: CourseResponse[] | null;
  selectedIndices: number[];
  setSelectedIndices: (selectedIndices: number[]) => void;
}

function ResultWindow(props: Props) {
  return (
    <div className={cx('container')}>
      {props.searchResults?.map((courseInfo, index) => (
        <div>
          <SearchResultCourseItem
            deptCode={courseInfo.deptCode}
            num={courseInfo.num}
          />
        </div>
      ))}
    </div>
  );
}

export default ResultWindow;
