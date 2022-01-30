import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@chakra-ui/react";
import { ContactUsForm } from "./ContactUsForm";
import Image from "next/image";
import { useGlobalObjects } from "@components/GlobalContextProvider";

export const ContactUsModal = ({ isModalOpen, onModalClose }) => {
  const { themeStyles } = useGlobalObjects();

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={onModalClose}
      onEsc={onModalClose}
      isCentered={true}
      size="2xl"
    >
      <ModalOverlay />
      <ModalContent
        borderRadius="12px"
        fontFamily="oxygen"
        padding="1rem .6rem"
        color={themeStyles.colors.defaultText}
        bgColor={themeStyles.colors.modalBg}
        letterSpacing="1px"
      >
        <ModalHeader>
          <div
            className="modal-header-box"
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              className="logo"
              style={{
                position: "relative",
                width: "4.5rem",
                height: "5rem",
              }}
            >
              <Image
                src="/logo.svg"
                alt="anteater-pathway-logo"
                layout="fill"
              />
            </div>
            <div
              className="modal-title"
              style={{
                marginTop: "1.5rem",
                fontSize: "1.9rem",
                fontWeight: "normal",
              }}
            >
              Help us become more useful to you!
            </div>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="contact-us-form-container">
            <ContactUsForm
              themeStyles={themeStyles}
              onModalClose={onModalClose}
            />
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
