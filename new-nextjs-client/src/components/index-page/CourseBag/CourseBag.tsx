import styles from './CourseBag.module.scss';
import classNames from 'classnames/bind';
import useAppUser from '@hooks/useAppUser';
import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import SortableCourseItem from '../SortableCourseItem/SortableCourseItem';
import { useEffect, useState } from 'react';

interface Props {}

const cx = classNames.bind(styles);

function CourseBag(props: Props) {
  const { appUser, updateAppUser } = useAppUser();

  const handleColorSelect = (courseId: string) => {
    return (colorNumber: number) => {
      updateAppUser((draft) => {
        draft.updateCourseColor({
          courseId,
          isInCourseBag: true,
          newColor: colorNumber,
        });
      });
    };
  };

  const handleCourseRemove = (courseId: string) => {
    return () => {
      updateAppUser((draft) => draft.removeCourseItem(courseId, true));
    };
  };

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
              <SortableCourseItem
                course={course}
                onColorSelect={handleColorSelect(course.id)}
                onRemove={handleCourseRemove(course.id)}
                isInCourseBag
              />
            </div>
          ))}
        </SortableContext>
      </div>
    </div>
  );
}

export default CourseBag;
