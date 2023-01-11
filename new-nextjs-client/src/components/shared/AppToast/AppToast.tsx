import { Badge } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { checkCircle, exclamationCircle } from '@styles/fontawesome';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import styles from './AppToast.module.scss';
interface Props {
  status: string;
  highlightedData: string;
  message: string;
}

function AppToast(props: Props) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <div className={styles.appToastContainer}>
      <div className={styles.messageWrapper}>
        <div className={styles.statusIconWrapper}>
          {props.status === 'success' ? (
            <FontAwesomeIcon icon={checkCircle} />
          ) : (
            <FontAwesomeIcon icon={exclamationCircle} />
          )}
        </div>
        <div>
          <Badge
            fontSize="1.7rem"
            margin={`0 .7rem`}
            padding={`.3rem .6rem`}
            variant="subtle"
            borderRadius=".5rem"
          >
            {props.highlightedData}
          </Badge>
        </div>
        <div className={styles.message}>{props.message}</div>
      </div>
    </div>
  );
}

export default AppToast;
