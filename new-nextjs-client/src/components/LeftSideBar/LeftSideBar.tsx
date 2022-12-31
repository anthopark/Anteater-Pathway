import style from './LeftSideBar.module.scss';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { coffee, envelope, github } from '@styles/fontawesome';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { white1 } from '@styles/variables';

export interface ILeftSideBarProps {}

export default function LeftSideBar(props: ILeftSideBarProps) {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className={style.container}>
      <div className={style.logoContainer}>
        {theme === 'light' ? (
          <Image src="/logo-light.svg" alt="logo" fill />
        ) : (
          <Image src="/logo-dark.svg" alt="logo" fill />
        )}
      </div>
      <div className={style.menuContainer}>
        <a className={style.link}>
          <FontAwesomeIcon
            className={style.icon}
            icon={envelope}
            color={white1}
          />
        </a>
        <a className={style.link}>
          <FontAwesomeIcon
            className={style.icon}
            icon={github}
            color={white1}
          />
        </a>
        <a className={style.link}>
          <FontAwesomeIcon
            className={style.icon}
            icon={coffee}
            color={white1}
          />
        </a>
      </div>
    </div>
  );
}
