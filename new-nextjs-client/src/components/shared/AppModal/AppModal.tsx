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
} from '@chakra-ui/react';
import {
  borderRadiusMD,
  gray1,
  gray7,
  fontSizeLG,
  fontSizeMD,
  defaultText,
  defaultTextDark,
  gray4,
} from '@styles/variables';
import { useTheme } from 'next-themes';
import AppButton from '@components/shared/AppButton/AppButton';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  headerTitle: string;
  bodyText: string;
  actionButtonName: string;
  actionKind: 'primary' | 'danger';
  actionFn: () => void;
}

function AppModal({
  isOpen,
  onClose,
  headerTitle,
  bodyText,
  actionButtonName,
  actionKind,
  actionFn,
}: Props) {
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
      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalOverlay />
        <ModalContent
          borderRadius={borderRadiusMD}
          bgColor={theme === 'light' ? gray7 : gray1}
          p="2rem 2.5rem"
        >
          <ModalHeader
            fontSize="2rem"
            color={theme === 'light' ? defaultText : defaultTextDark}
            p="0"
            mb="2rem"
          >
            {headerTitle}
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
            p="0"
            mb="3rem"
            color={theme === 'light' ? defaultText : defaultTextDark}
          >
            {bodyText}
          </ModalBody>
          <ModalFooter padding="0">
            <div className={styles.cancelBtn}>
              <AppButton
                kind="secondary"
                onClick={onClose}
                fontSize={fontSizeMD}
              >
                Cancel
              </AppButton>
            </div>
            <AppButton
              kind={actionKind}
              onClick={handleActionConfirm}
              fontSize={fontSizeMD}
            >
              {actionButtonName}
            </AppButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AppModal;
