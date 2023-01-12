import styles from './AppToast.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { checkCircle, exclamationCircle } from '@styles/fontawesome';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import {
  toastSuccessBgColor,
  toastSuccessHighlightColor,
  toastFailBgColor,
  toastFailHighlightColor,
  toastSuccessBgColorDark,
  toastSuccessHighlightColorDark,
  toastFailBgColorDark,
  toastFailHighlightColorDark,
} from '@styles/reusable-ui-variables';
import { white1 } from '@styles/variables';
import { background } from '@chakra-ui/react';

const toastTextColorDark = '#171923';
interface Props {
  status: string;
  highlightedData: string | null;
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
          background: toastSuccessBgColor,
          highlight: toastSuccessHighlightColor,
        };
      } else {
        return {
          background: toastFailBgColor,
          highlight: toastFailHighlightColor,
        };
      }
    } else {
      if (props.status === 'success') {
        return {
          background: toastSuccessBgColorDark,
          highlight: toastSuccessHighlightColorDark,
        };
      } else {
        return {
          background: toastFailBgColorDark,
          highlight: toastFailHighlightColorDark,
        };
      }
    }
  };
  return (
    <div
      className={styles.appToastContainer}
      style={{
        backgroundColor: getToastBgColor().background,
        color: theme === 'light' ? white1 : toastTextColorDark,
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
            style={
              props.highlightedData !== null
                ? {
                    backgroundColor: getToastBgColor().highlight,
                    color: theme === 'light' ? white1 : toastTextColorDark,
                  }
                : { display: 'none' }
            }
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
