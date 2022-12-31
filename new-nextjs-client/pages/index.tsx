import styles from './index.module.scss';
import MainLayout from '@components/MainLayout/MainLayout';
import { ReactNode } from 'react';
import ThemeToggler from '@components/ThemeToggler/ThemeToggler';
import AddYearDropdown from '@components/IndexPage/AddYearDropdown/AddYearDropdown';
import AppButton from '@components/shared/AppButton/AppButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { search } from '@styles/fontawesome';
import { white1 } from '@styles/variables';

export default function Home() {
  return (
    <div className={styles.container}>
      <ThemeToggler />
      <AddYearDropdown />
      <AppButton
        onClick={(e) => console.log(e)}
        kind="primary"
        leftIcon={<FontAwesomeIcon icon={search} color={white1} size="1x" />}
      >
        Courses
      </AppButton>
      <AppButton
        onClick={(e) => console.log(e)}
        kind="secondary"
        leftIcon={<FontAwesomeIcon icon={search} color={white1} size="1x" />}
      >
        Courses
      </AppButton>
      <AppButton
        onClick={(e) => console.log(e)}
        kind="danger"
        leftIcon={<FontAwesomeIcon icon={search} color={white1} size="1x" />}
      >
        Courses
      </AppButton>
    </div>
  );
}

Home.getLayout = function getLayout(page: ReactNode) {
  return <MainLayout>{page}</MainLayout>;
};
