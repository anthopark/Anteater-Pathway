import style from './LeftSideBar.module.scss';

export interface ILeftSideBarProps {}

export default function LeftSideBar(props: ILeftSideBarProps) {
  return <div className={style.container}></div>;
}
