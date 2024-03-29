import React, { useEffect } from 'react';
import { IQuarter } from '@entities/academic-year';
import styles from './Quarter.module.scss';
import classNames from 'classnames/bind';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import SortableCourseItem from '@components/index-page/SortableCourseItem/SortableCourseItem';
import { useState } from 'react';
import useAppUser from '@hooks/useAppUser';
// @ts-ignore
import { round10 } from 'expected-round';

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
  const { appUser } = useAppUser();
  const { setNodeRef } = useSortable({
    id: `quarter-${props.quarter.year}-${props.quarter.term}`,
  });

  const [totalUnit, setTotalUnit] = useState(0);

  useEffect(() => {
    calculateTotalUnit();
  }, [appUser]);

  const calculateTotalUnit = () => {
    let totalUnit = 0;

    props.quarter.courses.forEach((course) => {
      totalUnit += course.unit ?? 0;
    });

    setTotalUnit(totalUnit);
  };

  return (
    <div
      className={cx('container', {
        'show-total-unit': totalUnit > 0,
      })}
      ref={setNodeRef}
    >
      <div className={cx('header')}>{headerText(props.quarter)}</div>
      <div className={cx('courses-box')}>
        <SortableContext
          id={`quarter-${props.quarter.year}-${props.quarter.term}`}
          items={props.quarter.courses}
        >
          {props.quarter.courses.map((course) => (
            <div className={cx('course-item-wrapper')} key={course.id}>
              <SortableCourseItem course={course} isInCourseBag={false} />
            </div>
          ))}
        </SortableContext>
      </div>
      <div className={cx('footer')}>
        {totalUnit > 0 ? (
          <span className={cx('total-unit')}>{`${round10(totalUnit, -1)} ${
            totalUnit === 1 ? 'unit' : 'units'
          }`}</span>
        ) : null}
      </div>
    </div>
  );
}

export default Quarter;
