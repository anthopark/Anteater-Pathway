import styles from './index.module.scss';
import MainLayout from '@components/MainLayout/MainLayout';
import { ReactNode, useState } from 'react';
import ThemeToggler from '@components/ThemeToggler/ThemeToggler';
import AddYearDropdown from '@components/index-page/AddYearDropdown/AddYearDropdown';
import Avatar from '@components/index-page/Avatar/Avatar';
import AppButton from '@components/shared/AppButton/AppButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { search } from '@styles/fontawesome';
import CourseSearchWindow from '@components/index-page/CourseSearchWindow/CourseSearchWindow';
import CourseBag from '@components/index-page/CourseBag/CourseBag';
import useAppUser from '@hooks/useAppUser';
import AcademicYearList from '@components/index-page/AcademicYearList/AcademicYearList';

export default function Home() {
  const { appUser, updateAppUser } = useAppUser();
  const [searchWindowToggle, setSearchWindowToggle] = useState(false);

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
              onClick={() => setSearchWindowToggle(!searchWindowToggle)}
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

      <div className={styles.mainSection}>
        <div className={styles.mainLeftContainer}>
          <CourseSearchWindow
            windowToggle={searchWindowToggle}
            setWindowToggle={setSearchWindowToggle}
          />
          <AcademicYearList appUser={appUser} />
        </div>
        <div className={styles.mainRightContainer}>
          <CourseBag />
        </div>
      </div>
    </div>
  );
}

Home.getLayout = function getLayout(page: ReactNode) {
  return <MainLayout>{page}</MainLayout>;
};
