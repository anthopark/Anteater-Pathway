import styles from './SortableCourseItem.module.scss';
import { Course } from 'src/models/course';
import classNames from 'classnames/bind';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Props {
  course: Course;
  isInCourseBag: boolean;
}

const cx = classNames.bind(styles);

const SortableCourseItem = (props: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.course.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cx('container')}
    >
      SortableCourseItem
    </div>
  );
};

export default SortableCourseItem;
