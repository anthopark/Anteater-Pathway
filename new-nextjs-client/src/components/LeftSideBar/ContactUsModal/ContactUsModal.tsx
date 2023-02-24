import styles from './ContactUsModal.module.scss';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import {
  borderRadiusMD,
  defaultText,
  defaultTextDark,
  fontSizeLG,
  gray1,
  gray4,
  gray7,
  letterSpacingLG,
  letterSpacingSM,
} from '@styles/variables';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import ContactUsForm from '../ContactUsForm/ContactUsForm';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ContactUsModal = ({ isOpen, onClose }: Props) => {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
      <ModalOverlay />
      <ModalContent
        borderRadius={borderRadiusMD}
        bgColor={theme === 'light' ? gray7 : gray1}
        padding="2.5rem 0"
      >
        <ModalHeader
          fontSize="2rem"
          color={theme === 'light' ? defaultText : defaultTextDark}
          letterSpacing={letterSpacingLG}
          textAlign="center"
        >
          <div className={styles.logoContainer}>
            <Image src="/anteater-logo.svg" alt="logo" fill />
          </div>
          <span>Help us become more useful to you!</span>
        </ModalHeader>

        <ModalCloseButton
          fontSize="1.2rem"
          mt=".7rem"
          mr=".7rem"
          color={gray4}
          onClick={onClose}
        />
        <ModalBody
          fontSize={fontSizeLG}
          letterSpacing={letterSpacingSM}
          color={theme === 'light' ? defaultText : defaultTextDark}
          textAlign="center"
          padding="2rem 5rem"
        >
          <ContactUsForm />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ContactUsModal;
