import { Badge } from '@chakra-ui/react';
import styles from './AppToast.module.scss';
interface Props {
  status: string;
  highlightedData: string;
  message: string;
}

function AppToast(props: Props) {
  return (
    <div className={styles.appToastContainer}>
      <Badge fontSize="5rem" backgroundColor="purple">
        {props.highlightedData}
      </Badge>
    </div>
  );
}

export default AppToast;
