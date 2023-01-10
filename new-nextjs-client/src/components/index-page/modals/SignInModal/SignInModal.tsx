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
} from '@styles/variables';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import AppButton from '@components/shared/AppButton/AppButton';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from 'src/firebase/service-access';

const provider = new GoogleAuthProvider();

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

function SignInModal(props: Props) {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (e) {}

    props.onClose();
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} size="xl">
      <ModalOverlay />
      <ModalContent
        borderRadius={borderRadiusMD}
        bgColor={theme === 'light' ? gray7 : gray1}
        border="0 4rem"
      >
        <ModalHeader
          pt="3rem"
          textAlign="center"
          letterSpacing={letterSpacingLG}
          fontSize={fontSizeLG}
          fontWeight="medium"
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
        <ModalBody p="3rem 4rem">
          <div>
            <AppButton kind="primary" onClick={handleSignIn} p="0 5rem">
              Sign in with Google
            </AppButton>
          </div>
        </ModalBody>
        <ModalFooter
          borderTop={`1px solid ${gray4}`}
          margin="0 4rem"
        ></ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default SignInModal;
