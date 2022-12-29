import style from './LeftSideBar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { coffee, envelope, github } from '@styles/fontawesome';
import Image from 'next/image';
import { useTheme } from 'next-themes';

export interface ILeftSideBarProps {}

export default function LeftSideBar(props: ILeftSideBarProps) {
  const { theme, setTheme } = useTheme();

  return (
    <div className={style.container}>
      <div className={style.logoContainer}>
        {theme === 'light' ? (
          <Image src="/logo-light.svg" alt="logo" layout="fill" />
        ) : (
          <Image src="/logo-dark.svg" alt="logo" layout="fill" />
        )}
      </div>
      <div className={style.menuContainer}>
        <a className={style.link}>
          <FontAwesomeIcon
            className={style.icon}
            icon={envelope}
            color="white"
          />
        </a>
        <a className={style.link}>
          <FontAwesomeIcon className={style.icon} icon={github} color="white" />
        </a>
        <a className={style.link}>
          <FontAwesomeIcon className={style.icon} icon={coffee} color="white" />
        </a>
      </div>
    </div>
  );
}
