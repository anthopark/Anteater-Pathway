import styles from './ResultWindow.module.scss';
import classNames from 'classnames/bind';
import { CourseResponse } from 'src/models/course-response';

const cx = classNames.bind(styles);

interface Props {
  searchResults: CourseResponse[] | null;
  selectedIndices: number[];
  setSelectedIndices: (selectedIndices: number[]) => void;
}

function ResultWindow(props: Props) {
  return <div className={cx('container')}></div>;
}

export default ResultWindow;
