import styles from './index.module.scss';
import MainLayout from '@components/MainLayout/MainLayout';
import { ReactNode } from 'react';
import ThemeToggler from '@components/ThemeToggler/ThemeToggler';
import AddYearDropdown from '@components/index-page/AddYearDropdown/AddYearDropdown';
import Avatar from '@components/index-page/Avatar/Avatar';
import useAppToast from '@hooks/useAppToast';
import { Button } from '@chakra-ui/react';

export default function Home() {
  const showToastBox = useAppToast();

  const suceessTempData = {
    status: 'success',
    highlightedData: '12 / 13',
    message: 'year added',
  };

  const failTempData = {
    status: 'fail',
    highlightedData: '',
    message: 'Something went wrong',
  };

  return (
    <div className={styles.container}>
      <div className={styles.topSection}>
        <div className={styles.leftContainer}>
          <div className={styles.addYearDropdownWrapper}>
            <AddYearDropdown />
          </div>
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.themeTogglerWrapper}>
            <ThemeToggler />
          </div>
          <div className={styles.avatarWrapper}>
            <Avatar />
          </div>
        </div>
      </div>

      <Button onClick={() => showToastBox(suceessTempData)}>
        App Toast Btn
      </Button>

      <div className={styles.mainSection}></div>
    </div>
  );
}

Home.getLayout = function getLayout(page: ReactNode) {
  return <MainLayout>{page}</MainLayout>;
};
