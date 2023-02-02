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
  gray4,
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
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent
          borderRadius={borderRadiusMD}
          bgColor={theme === 'light' ? gray7 : gray1}
          m="4.08rem"
        >
          <ModalHeader
            fontSize={fontSizeLG}
            color={theme === 'light' ? defaultText : defaultTextDark}
            p="3rem 4rem 0 4rem"
          >
            {headerTitle}
          </ModalHeader>
          <ModalCloseButton
            fontSize="1.2rem"
            mt=".7rem"
            mr=".7rem"
            color={gray4}
          />
          <ModalBody fontSize={fontSizeMD} p="3rem 4rem 1rem 4rem" m="0">
            {bodyText}
          </ModalBody>
          <ModalFooter padding="3.5rem 4rem 2.5rem 4rem">
            <div className={styles.cancelBtn}>
              <AppButton
                kind="secondary"
                onClick={onClose}
                fontSize={fontSizeMD}
                width="8rem"
              >
                Cancel
              </AppButton>
            </div>
            <AppButton
              kind="danger"
              onClick={onClose}
              fontSize={fontSizeMD}
              width="8rem"
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
