import style from './LeftSideBar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { coffee, envelope, github } from '@styles/fontawesome';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { white1 } from '@styles/variables';
import { useDisclosure } from '@chakra-ui/react';
import ContactUsModal from './ContactUsModal/ContactUsModal';

export interface ILeftSideBarProps {}

export default function LeftSideBar(props: ILeftSideBarProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className={style.container}>
      <div className={style.logoContainer}>
        <Image src="/anteater-logo.svg" alt="logo" fill />
      </div>
      <div className={style.menuContainer}>
        <a className={style.link} onClick={onOpen}>
          <FontAwesomeIcon className={style.icon} icon={envelope} />
        </a>
        <a className={style.link}>
          <FontAwesomeIcon className={style.icon} icon={github} />
        </a>
        <a className={style.link}>
          <FontAwesomeIcon className={style.icon} icon={coffee} />
        </a>
      </div>
      <ContactUsModal isOpen={isOpen} onClose={onClose} />
    </div>
  );
}
