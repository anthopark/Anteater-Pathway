import styles from './CourseInfoWindow.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface Props {
  clickedCourse: ResponseModel.Course | null;
}

function CourseInfoWindow(props: Props) {
  return (
    <div className={cx('container')}>
      <div className={cx('info-content')}></div>
    </div>
  );
}

export default CourseInfoWindow;
