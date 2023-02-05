import styles from './CourseBag.module.scss';
import classNames from 'classnames/bind';
import useAppUser from '@hooks/useAppUser';
import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import SortableCourseItem from '../SortableCourseItem/SortableCourseItem';

interface Props {}

const cx = classNames.bind(styles);

function CourseBag(props: Props) {
  const { appUser } = useAppUser();

  return (
    <div className={cx('container')}>
      <div className={cx('heading')}>Course bag</div>
      <div className={cx('course-box')}>
        <SortableContext
          items={appUser.courseBag}
          strategy={rectSortingStrategy}
        >
          {appUser.courseBag.map((course) => (
            <div className={cx('course-item-wrapper')} key={course.id}>
              <SortableCourseItem course={course} isInCourseBag />
            </div>
          ))}
        </SortableContext>
      </div>
    </div>
  );
}

export default CourseBag;
