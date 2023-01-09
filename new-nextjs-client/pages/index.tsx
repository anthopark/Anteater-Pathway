import styles from './index.module.scss';
import MainLayout from '@components/MainLayout/MainLayout';
import { ReactNode } from 'react';
import ThemeToggler from '@components/ThemeToggler/ThemeToggler';
import AddYearDropdown from '@components/IndexPage/AddYearDropdown/AddYearDropdown';

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.topSection}>
        <div className={styles.leftContainer}>
          <div className={styles.addYearDropdownWrapper}>
            <AddYearDropdown />
          </div>
        </div>
        <div className={styles.rightContainer}>
          <ThemeToggler />
        </div>
      </div>

      <div className={styles.mainSection}></div>
    </div>
  );
}

Home.getLayout = function getLayout(page: ReactNode) {
  return <MainLayout>{page}</MainLayout>;
};
