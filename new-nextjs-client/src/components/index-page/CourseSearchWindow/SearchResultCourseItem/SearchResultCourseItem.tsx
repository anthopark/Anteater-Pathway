import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './SearchResultCourseItem.module.scss';
import { Updater } from 'use-immer';
import { Checkbox } from '@chakra-ui/react';
import {
  accent1,
  gray2,
  gray3,
  gray5,
  primary1,
  white1,
} from '@styles/variables';
import { useTheme } from 'next-themes';
interface Props {
  deptCode: string;
  num: string;
  isSelected: boolean;
  setSelectedIndices: Updater<Set<number>>;
}

const cx = classNames.bind(styles);

function SearchResultCourseItem(props: Props) {
  const [isHover, setIsHover] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className={cx('container', {
        selected: props.isSelected,
      })}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {isHover ? <div className={cx('overlay')}></div> : null}
      <div className={styles.deptCodeNum}>
        <div className={styles.deptCode}>{props.deptCode}</div>
        <div className={styles.num}>{props.num}</div>
      </div>
    </div>
  );
}

export default SearchResultCourseItem;
