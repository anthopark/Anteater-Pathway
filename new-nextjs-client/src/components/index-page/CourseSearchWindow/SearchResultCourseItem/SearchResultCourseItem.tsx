import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './SearchResultCourseItem.module.scss';
import { Updater } from 'use-immer';
import { useTheme } from 'next-themes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { info } from '@styles/fontawesome';

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
      {isHover ? (
        <>
          <div className={cx('overlay')}></div>
          <div
            className={cx('info-icon-wrapper')}
            onClick={(e) => e.stopPropagation()}
          >
            <FontAwesomeIcon className={cx('info-icon')} icon={info} />
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
