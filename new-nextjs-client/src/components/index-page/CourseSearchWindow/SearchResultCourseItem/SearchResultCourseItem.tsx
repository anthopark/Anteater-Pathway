import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SearchResultCourseItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { info } from '@styles/fontawesome';

interface Props {
  deptCode: string;
  num: string;
  isSelected: boolean;
  handleInfoClick: () => void;
}

const cx = classNames.bind(styles);

function SearchResultCourseItem(props: Props) {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className={cx('container', {
        selected: props.isSelected,
      })}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {isHover ? (
        <>
          <div className={cx('overlay')}></div>
          <div
            className={cx('info-icon-wrapper')}
            onClick={(e) => e.stopPropagation()}
          >
            <FontAwesomeIcon
              className={cx('info-icon')}
              icon={info}
              onClick={props.handleInfoClick}
            />
          </div>
        </>
      ) : null}

      <div className={styles.deptCodeNum}>
        <div className={styles.deptCode}>{props.deptCode}</div>
        <div className={styles.num}>{props.num}</div>
      </div>
    </div>
  );
}

export default SearchResultCourseItem;
