import React from 'react';
import { IQuarter } from '@entities/academic-year';
import styles from './Quarter.module.scss';
import classNames from 'classnames/bind';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import SortableCourseItem from '@components/index-page/SortableCourseItem/SortableCourseItem';
import { useDroppable } from '@dnd-kit/core';

const cx = classNames.bind(styles);

const termMap = {
  fa: 'Fall',
  wi: 'Winter',
  sp: 'Spring',
  su: 'Summer',
};

interface Props {
  quarter: IQuarter;
}

const headerText = (quarter: IQuarter) => {
  return `${termMap[quarter.term]} ${
    quarter.term === 'fa' ? quarter.year : quarter.year + 1
  }`;
};

function Quarter(props: Props) {
  const { setNodeRef } = useDroppable({
    id: `quarter-${props.quarter.year}-${props.quarter.term}`,
  });

  return (
    <div className={cx('container')}>
      <div className={cx('header')}>{headerText(props.quarter)}</div>
      <div className={cx('courses-box')} ref={setNodeRef}>
        <SortableContext
          id={`quarter-${props.quarter.year}-${props.quarter.term}`}
          items={props.quarter.courses}
          // strategy={verticalListSortingStrategy}
        >
          {props.quarter.courses.map((course) => (
            <div className={cx('course-item-wrapper')} key={course.id}>
              <SortableCourseItem course={course} isInCourseBag={false} />
            </div>
          ))}
        </SortableContext>
      </div>
    </div>
  );
}

export default Quarter;
