import styles from './AppAlertDialog.module.scss';
import { useRef } from 'react';

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Button,
} from '@chakra-ui/react';

function AppAlertDialog() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <button onClick={onOpen}>Delete</button>
      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        leastDestructiveRef={cancelRef}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Academic Year
            </AlertDialogHeader>

            <AlertDialogBody>Are you sure??</AlertDialogBody>

            <AlertDialogFooter>
              <Button>Cancel</Button>
              <Button>Delete</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default AppAlertDialog;
