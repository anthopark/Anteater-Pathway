import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "src/firebase/firebase-config";
import { signInUser } from "src/api/user";
import { useToastBox } from "src/hooks/useToastBox";
import { FirebaseError } from "firebase/app";

const provider = new GoogleAuthProvider();

const SignInModal = ({ isModalOpen, onModalClose, themeStyles }) => {
  const { showToastBox } = useToastBox();

  const onSignInButtonClick = async () => {
    try {
      const firebaseSignInResult = await signInWithPopup(auth, provider);

      const backendSignInResult = await signInUser(
        firebaseSignInResult.user.uid,
        firebaseSignInResult.user.accessToken
      );

      console.log(firebaseSignInResult);

      console.log(backendSignInResult);
    } catch (e) {
      console.log(e);
      if (e instanceof FirebaseError) {
      } else {
        // backend PlannerAPI error
        showToastBox({
          status: "failure",
          dataOfInterest: ["Server Error"],
          message:
            "Failed to authenticate with the server.\nYour planner data may not be saved.",
        });
      }

      return;
    }

    onModalClose();
    showToastBox({
      status: "success",
      dataOfInterest: [],
      message: "Signed in successfully",
    });
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={onModalClose}
      onEsc={onModalClose}
      isCentered={true}
      size="xl"
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
            <div className="logo">
              <img
                src="/logo.svg"
                style={{ width: "4.3rem" }}
                alt="anteater-pathway-logo"
              />
            </div>
            <div
              className="modal-title"
              style={{
                marginTop: "1.5rem",
                fontSize: "1.7rem",
                fontWeight: "normal",
              }}
            >
              Sign in to Anteater Pathway
            </div>
          </div>
        </ModalHeader>
        <ModalBody p="1.5rem 3rem">
          <div
            style={{
              width: "100%",
              padding: "2.5rem 0 3.5rem 0",
              display: "flex",
              flexDirection: "column",
              borderBottom: "1px solid #cccccc",
            }}
          >
            <Button
              bg="blue.500"
              colorScheme="blue"
              padding="2.2rem .7rem"
              borderRadius="10px"
              onClick={onSignInButtonClick}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    backgroundColor: "white",
                    borderRadius: "3px",
                  }}
                >
                  <img
                    src="/google-sign-in-icon.svg"
                    alt="google-logo"
                    style={{ width: "3.5rem" }}
                  />
                </div>
                <div
                  style={{
                    width: "100%",
                    fontSize: "1.5rem",
                    fontWeight: "500",
                    letterSpacing: "1px",
                  }}
                >
                  Sign in with Google
                </div>
              </div>
            </Button>
          </div>
          <div
            style={{
              marginTop: "1rem",
              fontSize: "1.2rem",
            }}
          >
            <p style={{ marginBottom: ".7rem" }}>
              Anteater Pathway does not monetize user identifiable data, such as
              an email address, in any way.
            </p>
            <p>
              By signing in, you agree to our
              <Link href="/privacy">
                <a style={{ marginLeft: ".5rem", color: "blue" }}>
                  privacy policy
                </a>
              </Link>
              .
            </p>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SignInModal;
