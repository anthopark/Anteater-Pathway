import style from './MainLayout.module.scss';
import LeftSideBar from '@components/LeftSideBar/LeftSideBar';
import { Helmet } from 'react-helmet';

export interface IMainLayoutProps {}

export default function MainLayout({
  children,
}: React.PropsWithChildren<IMainLayoutProps>) {
  return (
    <>
      <Helmet>
        <title>Anteater Pathway</title>
        <meta name="description" content="UC Irvine Degree Planner" />
        <link rel="icon" type="image/svg" href="/favicon.svg" />
      </Helmet>
      <div className={style.container}>
        <LeftSideBar />
        {children}
      </div>
    </>
  );
}
