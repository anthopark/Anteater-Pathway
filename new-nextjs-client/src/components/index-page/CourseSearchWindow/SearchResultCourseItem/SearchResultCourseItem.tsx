import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SearchResultCourseItem.module.scss';

interface Props {
  deptCode: string;
  num: string;
  isSelected: boolean;
}

const cx = classNames.bind(styles);

function SearchResultCourseItem(props: Props) {
  return (
    <div
      className={cx('container', {
        selected: props.isSelected,
      })}
    >
      <div className={styles.deptCodeNum}>
        <div className={styles.deptCode}>{props.deptCode}</div>
        <div className={styles.num}>{props.num}</div>
      </div>
    </div>
  );
}

export default SearchResultCourseItem;
