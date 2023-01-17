import styles from './AppToast.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { checkCircle, exclamationCircle } from '@styles/fontawesome';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

interface Props {
  status: string;
  highlightedData: string | null;
  message: string;
}

function AppToast(props: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const cx = classNames.bind(styles);

  const displayHighlight = () => {
    return (
      props.highlightedData !== null &&
      props.highlightedData !== undefined &&
      props.highlightedData !== ''
    );
  };

  return (
    <div
      className={cx('container', {
        success: props.status === 'success',
        fail: props.status === 'fail',
      })}
    >
      <div className={styles.messageWrapper}>
        <div className={styles.statusIconWrapper}>
          {props.status === 'success' ? (
            <FontAwesomeIcon icon={checkCircle} />
          ) : (
            <FontAwesomeIcon icon={exclamationCircle} />
          )}
        </div>
        <p className={styles.message}>
          {displayHighlight() ? (
            <span className={styles.highlight}>{props.highlightedData}</span>
          ) : null}
          {props.message}
        </p>
      </div>
    </div>
  );
}

export default AppToast;
