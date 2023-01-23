import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SearchResultCourseItem.module.scss';

interface Props {
  deptCode: string;
  num: string;
}

const cx = classNames.bind(styles);

function SearchResultCourseItem(props: Props) {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div
      className={cx('container', {
        selected: isSelected,
      })}
      onClick={() => setIsSelected(!isSelected)}
    >
      <div className={styles.deptCodeNum}>
        <div className={styles.deptCode}>{props.deptCode}</div>
        <div className={styles.num}>{props.num}</div>
      </div>
    </div>
  );
}

export default SearchResultCourseItem;
