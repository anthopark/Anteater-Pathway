import { useDisclosure } from '@chakra-ui/react';
import AppButton from '@components/shared/AppButton/AppButton';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from 'src/firebase/service-access';
import SignInModal from '../modals/SignInModal/SignInModal';

function Avatar() {
  const [firebaseUser, loading, error] = useAuthState(auth);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {firebaseUser ? null : (
        <>
          <AppButton kind="primary" onClick={onOpen}>
            Sign in
          </AppButton>
          <SignInModal isOpen={isOpen} onClose={onClose} />
        </>
      )}
    </>
  );
}

export default Avatar;
