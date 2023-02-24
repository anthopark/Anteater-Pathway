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

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ContactUsModal = ({ isOpen, onClose }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Header</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Body</ModalBody>

        <ModalFooter>
          <button>Submit</button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ContactUsModal;
