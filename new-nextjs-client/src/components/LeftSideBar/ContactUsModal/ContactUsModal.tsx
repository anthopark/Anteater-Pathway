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
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent
        borderRadius={borderRadiusMD}
        bgColor={theme === 'light' ? gray7 : gray1}
      >
        <div className={styles.logoContainer}>
          <Image src="/anteater-logo.svg" alt="logo" fill />
        </div>
        <ModalHeader
          pt="2.5rem"
          textAlign="center"
          letterSpacing={letterSpacingLG}
          fontSize={fontSizeLG}
          fontWeight="light"
          color={theme === 'light' ? defaultText : defaultTextDark}
        >
          Help us become more useful to you!
        </ModalHeader>

        <ModalCloseButton
          fontSize="1.2rem"
          mt=".7rem"
          mr=".7rem"
          color={gray4}
        />
        <ModalBody
          fontSize={fontSizeLG}
          letterSpacing={letterSpacingSM}
          color={theme === 'light' ? defaultText : defaultTextDark}
          textAlign="center"
          padding="1rem 5rem"
          p="2.5rem 4rem 2.3rem 4rem"
        >
          <ContactUsForm onClose={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ContactUsModal;
