import styles from './SortableCourseItem.module.scss';
import { Course } from 'src/models/course';
import classNames from 'classnames/bind';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { UniqueIdentifier } from '@dnd-kit/core';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { threeDot } from '@styles/fontawesome';

interface Props {
  course?: Course;
  isInCourseBag: boolean;
  sortableId?: UniqueIdentifier;
}

const cx = classNames.bind(styles);

const SortableCourseItem = (props: Props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props.sortableId ?? props.course!.id });
  const [isHover, setIsHover] = useState(false);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const deptCode = () => {
    if (props.sortableId) {
      return (props.sortableId as string).split('-')[0];
    }
    return props.course!.courseInfo.deptCode;
  };

  const num = () => {
    if (props.sortableId) {
      return (props.sortableId as string).split('-')[1];
    }
    return props.course!.courseInfo.num;
  };

  const handleMouseEnter = () => {
    if (Boolean(props.sortableId)) {
      return setIsHover(false);
    }
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <div
      {...attributes}
      {...listeners}
      className={cx('container', {
        dragging: isDragging,
        'drag-overlay': Boolean(props.sortableId),
      })}
      ref={setNodeRef}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isHover ? (
        <>
          <div className={cx('overlay')}></div>
          <div
            className={cx('menu-trigger')}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <FontAwesomeIcon className={cx('three-dot-icon')} icon={threeDot} />
          </div>
        </>
      ) : null}

      <div className={cx('dept-code-num')}>
        <div className={cx('dept-code')}>{deptCode()}</div>
        <div className={cx('num')}>{num()}</div>
      </div>
    </div>
  );
};

export default SortableCourseItem;
