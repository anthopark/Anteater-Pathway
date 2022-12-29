import style from './LeftSideBar.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import Image from 'next/image';
import { useTheme } from 'next-themes';

const coffee = findIconDefinition({ prefix: 'fas', iconName: 'coffee' });
const envelope = findIconDefinition({ prefix: 'fas', iconName: 'envelope' });
const github = findIconDefinition({ prefix: 'fab', iconName: 'github-alt' });
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
