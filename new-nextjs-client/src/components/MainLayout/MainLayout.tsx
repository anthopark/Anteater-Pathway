import style from './MainLayout.module.scss';
import LeftSideBar from '@components/LeftSideBar/LeftSideBar';

export interface IMainLayoutProps {}

export default function MainLayout({
  children,
}: React.PropsWithChildren<IMainLayoutProps>) {
  return (
    <div className={style.container}>
      <LeftSideBar />
      {children}
    </div>
  );
}
