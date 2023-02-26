import styles from './CourseInfoWindow.module.scss';
import classNames from 'classnames/bind';
import { ReactNode, useEffect, useState } from 'react';
import DEFAULT_COURSE_ATTRIBUTES_DATA from 'src/data/default-course-attributes-data.json';
import { getAllCourseAttributes } from 'src/api/course';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { info } from '@styles/fontawesome';

const cx = classNames.bind(styles);

interface Props {
  clickedCourse: ResponseModel.Course | null;
}

const QUARTER_MAP: { [key: string]: string } = {
  fa: 'Fall',
  wi: 'Winter',
  sp: 'Spring',
  su1: 'Summer',
  su2: 'Summer',
  su10w: 'Summer',
};

const getQuarterText = (quarterCode: string) => {
  let [year, quarter] = quarterCode.split('-');

  return `${QUARTER_MAP[quarter]} ${parseInt(year) % 100} `;
};

function CourseInfoWindow(props: Props) {
  const [attributes, setAttributes] = useState<ResponseModel.CourseAttribute[]>(
    DEFAULT_COURSE_ATTRIBUTES_DATA
  );

  useEffect(() => {
    getAllCourseAttributes()
      .then((data) => {
        setAttributes(data);
      })
      .catch(() => {
        setAttributes(DEFAULT_COURSE_ATTRIBUTES_DATA);
      });
  }, []);

  let content: ReactNode;

  if (props.clickedCourse) {
    content = (
      <div className={cx('info-content')}>
        <div className={cx('title-section')}>
          <div className={cx('top')}>
            <span
              className={cx('course-code')}
            >{`${props.clickedCourse.deptCode} ${props.clickedCourse.num}`}</span>
            <span className={cx('unit')}>{`${props.clickedCourse.unit} ${
              props.clickedCourse.unit === 1 ? 'unit' : 'units'
            }`}</span>
          </div>
          <div className={cx('bottom')}>
            <span className={cx('course-title')}>
              {props.clickedCourse.title}
            </span>
          </div>
        </div>
        {props.clickedCourse.offered.length > 0 ? (
          <div className={cx('offered-quarter-section')}>
            <span className={cx('course-property-label')}>
              Recent quarters:
            </span>
            <div className={cx('quarter-grid')}>
              {props.clickedCourse.offered.slice(0, 6).map((quarterCode) => (
                <div
                  className={cx(
                    'quarter-box',
                    QUARTER_MAP[
                      quarterCode.split('-')[1] as string
                    ].toLowerCase()
                  )}
                >
                  {getQuarterText(quarterCode)}
                </div>
              ))}
            </div>
          </div>
        ) : null}
        {attributes.map((attr, index) => {
          if (props.clickedCourse![attr.value]) {
            return (
              <div className={cx('course-attribute-section')} key={index}>
                <span className={cx('attribute-label')}>{attr.name}:</span>
                <div className={cx('attribute-content')}>
                  {props.clickedCourse![attr.value]}
                </div>
              </div>
            );
          }
        })}
      </div>
    );
  } else {
    content = (
      <div className={cx('message-wrapper')}>
        <div className={cx('message')}>
          <span>
            Click{' '}
            <span>
              <FontAwesomeIcon icon={info} className={cx('info-icon')} />
            </span>{' '}
            on courses to view details!
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cx('container', {
        'display-message': props.clickedCourse === null,
      })}
    >
      {content}
    </div>
  );
}

export default CourseInfoWindow;
