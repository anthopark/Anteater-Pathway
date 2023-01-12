import styles from './AppToast.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { checkCircle, exclamationCircle } from '@styles/fontawesome';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import {
  toastBgSuccessColor,
  toastHighlightSuccessColor,
  toastBgFailColor,
  toastHighlightFailColor,
  toastBgSuccessColorDark,
  toastHighlightSuccessColorDark,
  toastBgFailColorDark,
  toastHighlightFailColorDark,
} from '@styles/reusable-ui-variables';
import { white1 } from '@styles/variables';

interface Props {
  status: string;
  highlightedData: string;
  message: string;
}

function AppToast(props: Props) {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const getToastBgColor = () => {
    if (theme === 'light') {
      if (props.status === 'success') {
        return {
          background: toastBgSuccessColor,
          highlight: toastHighlightSuccessColor,
        };
      } else {
        return {
          background: toastBgFailColor,
          highlight: toastHighlightFailColor,
        };
      }
    } else {
      if (props.status === 'success') {
        return {
          background: toastBgSuccessColorDark,
          highlight: toastHighlightSuccessColorDark,
        };
      } else {
        return {
          background: toastBgFailColorDark,
          highlight: toastHighlightFailColorDark,
        };
      }
    }
  };
  return (
    <div
      className={styles.appToastContainer}
      style={{
        backgroundColor: getToastBgColor().background,
        color: theme === 'light' ? white1 : '#171923',
      }}
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
          <span
            className={styles.highlight}
            style={{
              backgroundColor: getToastBgColor().highlight,
              color: theme === 'light' ? white1 : '#171923',
            }}
          >
            {props.highlightedData}
          </span>
          {props.message}
        </p>
      </div>
    </div>
  );
}

export default AppToast;
