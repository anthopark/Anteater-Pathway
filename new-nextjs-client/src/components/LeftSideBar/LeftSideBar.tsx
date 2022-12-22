import style from './LeftSideBar.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import Image from 'next/image';

const coffee = findIconDefinition({ prefix: 'fas', iconName: 'coffee' });
const envelope = findIconDefinition({ prefix: 'fas', iconName: 'envelope' });
const github = findIconDefinition({ prefix: 'fab', iconName: 'github-alt' });
export interface ILeftSideBarProps {}

export default function LeftSideBar(props: ILeftSideBarProps) {
  return (
    <div className={style.container}>
      <div className={style.logoContainer}>
        <Image src="/logo.svg" alt="logo" layout="fill" />
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
