import styles from './index.module.scss';
import MainLayout from '@components/MainLayout/MainLayout';
import { ReactNode } from 'react';
import ThemeToggler from '@components/ThemeToggler/ThemeToggler';
import AppSingleSelect from '@components/shared/AppSingleSelect/AppSingleSelect';
import AddYearDropdown from '@components/IndexPage/AddYearDropdown/AddYearDropdown';

export default function Home() {
  return (
    <div className={styles.container}>
      <ThemeToggler />
      <AddYearDropdown />
    </div>
  );
}

Home.getLayout = function getLayout(page: ReactNode) {
  return <MainLayout>{page}</MainLayout>;
};
