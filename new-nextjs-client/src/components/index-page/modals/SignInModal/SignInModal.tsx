import styles from './SignInModal.module.scss';
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
  fontSizeLG,
  gray1,
  gray7,
  letterSpacingLG,
  defaultText,
  defaultTextDark,
  gray4,
  fontSizeMD,
} from '@styles/variables';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import AppButton from '@components/shared/AppButton/AppButton';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from 'src/firebase/service-access';
import Image from 'next/image';
import { FirebaseError } from 'firebase/app';
import useAppToast from '@hooks/useAppToast';
import Link from 'next/link';

const provider = new GoogleAuthProvider();

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

function SignInModal(props: Props) {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const showToastBox = useAppToast();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      props.onClose();
    } catch (error) {
      if (!(error as FirebaseError).message.includes('popup-closed-by-user')) {
        showToastBox({
          status: 'failure',
          highlightedData: null,
          message: 'Failed to sign in with Google :(',
        });
        props.onClose();
      }
    }
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} size="xl">
      <ModalOverlay />
      <ModalContent
        borderRadius={borderRadiusMD}
        bgColor={theme === 'light' ? gray7 : gray1}
        border="0 4rem"
      >
        <div className={styles.logoContainer}>
          <Image src="/anteater-logo.svg" alt="logo" fill />
        </div>
        <ModalHeader
          pt="2rem"
          textAlign="center"
          letterSpacing={letterSpacingLG}
          fontSize={fontSizeLG}
          fontWeight={400}
          color={theme === 'light' ? defaultText : defaultTextDark}
        >
          Sign in to Anteater Pathway
        </ModalHeader>
        <ModalCloseButton
          fontSize="1.2rem"
          mt=".7rem"
          mr=".7rem"
          color={gray4}
        />
        <ModalBody p="3.5rem 4rem">
          <div className={styles.signInBtnContainer}>
            <AppButton
              kind="primary"
              onClick={handleSignIn}
              fontSize={fontSizeLG}
              width="28rem"
              padding="0 0 0 3rem"
            >
              Sign in with Google
            </AppButton>
            <div style={{ position: 'absolute', top: '.4rem', left: '.5rem' }}>
              <div className={styles.googleLogoContainer}>
                <Image src="/google-logo.svg" alt="google-logo" fill />
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter
          borderTop={`1px solid ${gray4}`}
          margin="0 4rem"
          p="0.5rem 0 2.5rem 0"
          flexDir="column"
          alignItems="none"
        >
          <p className={styles.footerParagraph}>
            We do not monetize user identifiable data, such as an email address,
            in any way.
          </p>
          <p className={styles.footerParagraph}>
            By signing in, you agree to our{' '}
            <Link href="/privacy">
              <span className={styles.privacyLink}>privacy policy</span>
            </Link>
          </p>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default SignInModal;
