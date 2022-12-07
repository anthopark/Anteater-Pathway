import styles from './index.module.scss';
import MainLayout from '@components/MainLayout/MainLayout';
import { ReactNode } from 'react';
import ThemeToggler from '@components/ThemeToggler/ThemeToggler';

export default function Home() {
  return (
    <div className="home-body">
      <ThemeToggler />
      <div>HI</div>
    </div>
  );
}

Home.getLayout = function getLayout(page: ReactNode) {
  return <MainLayout>{page}</MainLayout>;
};
