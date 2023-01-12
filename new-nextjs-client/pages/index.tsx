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

  // Temp data for Toast
  const suceessTempData = {
    status: 'success',
    highlightedData: '12 / 13',
    message: 'year added',
    duration: 3500,
  };

  const failTempData = {
    status: 'fail',
    highlightedData: 'something',
    message: 'went wrong in unexpectedly',
    duration: 4500,
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

      {/* Temp button for Toast */}
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
