import styles from './index.module.scss';
import MainLayout from '@components/MainLayout/MainLayout';
import { ReactNode } from 'react';
import ThemeToggler from '@components/ThemeToggler/ThemeToggler';
import AddYearDropdown from '@components/index-page/AddYearDropdown/AddYearDropdown';
import Avatar from '@components/index-page/Avatar/Avatar';
import AppButton from '@components/shared/AppButton/AppButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { search } from '@styles/fontawesome';

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.topSection}>
        <div className={styles.leftContainer}>
          <div className={styles.addYearDropdownWrapper}>
            <AddYearDropdown />
          </div>
          <div className={styles.searchBtnWrapper}>
            <AppButton
              kind="primary"
              leftIcon={<FontAwesomeIcon icon={search} />}
            >
              Courses
            </AppButton>
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

      <div className={styles.mainSection}></div>
    </div>
  );
}

Home.getLayout = function getLayout(page: ReactNode) {
  return <MainLayout>{page}</MainLayout>;
};
