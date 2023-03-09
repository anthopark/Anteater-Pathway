import styles from './CourseBag.module.scss';
import classNames from 'classnames/bind';
import useAppUser from '@hooks/useAppUser';
import {
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import SortableCourseItem from '../SortableCourseItem/SortableCourseItem';
import { eraser } from '@styles/fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AppModal from '@components/shared/AppModal/AppModal';
import { useEffect, useState } from 'react';

interface Props {}

const cx = classNames.bind(styles);

function CourseBag(props: Props) {
  const { appUser, updateAppUser } = useAppUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalUnit, setTotalUnit] = useState(0);
  const { setNodeRef } = useSortable({ id: 'bag' });

  useEffect(() => {
    updateTotalUnit();
  }, [appUser.courseBag]);

  const handleCourseBagClear = () => {
    updateAppUser((draft) => draft.clearCourseBag());
  };

  const updateTotalUnit = () => {
    let totalCount = 0;

    appUser.courseBag.forEach((course) => {
      if (course.unit !== null) {
        totalCount += course.unit;
      }
    });

    setTotalUnit(totalCount);
  };

  const onClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <AppModal
        isOpen={isModalOpen}
        onClose={onClose}
        headerTitle="Empty course bag?"
        bodyText="Are you sure you want to empty the course bag?"
        actionButtonName="Empty"
        actionKind="danger"
        actionFn={handleCourseBagClear}
      />
      <div className={cx('container')}>
        <div className={cx('heading')}>
          <span>Course bag</span>
          {appUser.courseBag.length > 0 ? (
            <button
              onClick={() => setIsModalOpen(true)}
              className={cx('empty-button')}
            >
              <FontAwesomeIcon icon={eraser} className={cx('eraser-icon')} />
              <span>Empty</span>
            </button>
          ) : null}
        </div>

        <div className={cx('courses-box')} ref={setNodeRef}>
          <SortableContext id="bag" items={appUser.courseBag}>
            {appUser.courseBag.map((course) => (
              <div className={cx('course-item-wrapper')} key={course.id}>
                <SortableCourseItem course={course} isInCourseBag />
              </div>
            ))}
          </SortableContext>
        </div>
        {appUser.courseBag.length > 0 ? (
          <div className={cx('total-unit')}>
            {totalUnit} {totalUnit === 1 ? 'unit' : 'units'}
          </div>
        ) : null}
      </div>
    </>
  );
}

export default CourseBag;
