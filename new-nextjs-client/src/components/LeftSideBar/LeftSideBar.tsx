import style from './LeftSideBar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { coffee, envelope, github } from '@styles/fontawesome';
import Image from 'next/image';
import { useDisclosure } from '@chakra-ui/react';
import ContactUsModal from '../index-page/modals/ContactUsModal/ContactUsModal';
import Link from 'next/link';

export interface ILeftSideBarProps {}

export default function LeftSideBar(props: ILeftSideBarProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className={style.container}>
      <div className={style.logoContainer}>
        <Link href="/">
          <Image src="/anteater-logo.svg" alt="logo" fill />
        </Link>
      </div>
      <div className={style.menuContainer}>
        <a className={style.link} onClick={onOpen}>
          <FontAwesomeIcon className={style.icon} icon={envelope} />
        </a>
        <a
          className={style.link}
          href="https://github.com/anthopark/Anteater-Pathway"
          target="_blank"
        >
          <FontAwesomeIcon className={style.icon} icon={github} />
        </a>
        <a
          className={style.link}
          href="https://ko-fi.com/anthonypark"
          target="_blank"
        >
          <FontAwesomeIcon className={style.icon} icon={coffee} />
        </a>
      </div>
      <ContactUsModal isOpen={isOpen} onClose={onClose} />
    </div>
  );
}
