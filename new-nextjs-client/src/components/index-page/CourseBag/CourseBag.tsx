import styles from './CourseBag.module.scss';
import classNames from 'classnames/bind';
import useAppUser from '@hooks/useAppUser';
import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable';
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

  useEffect(() => {
    updateTotalUnit();
  }, [appUser.courseBag]);

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
    <div className={cx('container')}>
      <AppModal
        isOpen={isModalOpen}
        onClose={onClose}
        headerTitle="Empty course bag?"
        bodyText="Are you sure you want to empty the course bag?"
        actionButtonName="Empty"
        actionKind="danger"
        actionFn={handleCourseBagClear}
      />
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
      {appUser.courseBag.length > 0 ? (
        <div className={cx('total-unit')}>
          {totalUnit} {totalUnit === 1 ? 'unit' : 'units'}
        </div>
      ) : null}
    </div>
  );
}

export default CourseBag;
