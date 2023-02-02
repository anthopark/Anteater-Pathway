import styles from './AppModal.module.scss';
import React, { useEffect, useState } from 'react';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import {
  borderRadiusMD,
  gray1,
  gray7,
  fontSizeLG,
  fontSizeMD,
  defaultText,
  defaultTextDark,
} from '@styles/variables';
import { useTheme } from 'next-themes';
import AppButton from '@components/shared/AppButton/AppButton';

interface Props {
  headerTitle: string;
  bodyText: string;
  actionButtonName: string;
  actionFn: () => void;
}

function AppModal({
  headerTitle,
  bodyText,
  actionButtonName,
  actionFn,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleActionConfirm = () => {
    actionFn();
    onClose();
  };

  return (
    <>
      <button onClick={onOpen}>Delete</button>
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent
          borderRadius={borderRadiusMD}
          border="0 4rem"
          bgColor={theme === 'light' ? gray7 : gray1}
          padding="1.5rem 2.3rem"
        >
          <ModalHeader
            fontSize={fontSizeLG}
            color={theme === 'light' ? defaultText : defaultTextDark}
          >
            {headerTitle}
          </ModalHeader>
          <ModalCloseButton size="lg" />
          <ModalBody fontSize={fontSizeLG} marginBottom="1.5rem">
            {bodyText}
          </ModalBody>
          <ModalFooter>
            <div className={styles.cancelBtn}>
              <AppButton
                kind="secondary"
                onClick={onClose}
                fontSize={fontSizeLG}
              >
                Cancel
              </AppButton>
            </div>
            <AppButton kind="danger" onClick={onClose} fontSize={fontSizeLG}>
              {actionButtonName}
            </AppButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AppModal;
