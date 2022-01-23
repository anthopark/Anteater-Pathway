import { DefaultButton } from "@components/CustomChakraUI";
import { StyledContainer } from "./styled";
import { useDisclosure } from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/menu";
import { Avatar } from "@chakra-ui/avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { auth } from "src/firebase/firebase-config";
import { signOut } from "firebase/auth";
import { useGlobalObjects } from "@components/GlobalContextProvider";
import SignInModal from "./SignInModal";

const signOutUser = async (user) => {
  if (user) {
    await signOut(auth);
  }
};

export const UserProfile = ({ user }) => {
  const { themeStyles, themeMode } = useGlobalObjects();
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  return (
    <>
      <StyledContainer>
        {user ? (
          <Menu>
            <MenuButton
              w="4.3rem"
              h="4.3rem"
              as={Avatar}
              icon={
                <Avatar
                  name={user.displayName}
                  src={user.photoURL}
                  size="full"
                  cursor="pointer"
                />
              }
            />
            <MenuList
              mt=".5rem"
              fontSize="1.5rem"
              border="3px solid #5bbbe4"
              bg={themeStyles.colors.paneBg}
            >
              <MenuItem
                icon={
                  <FontAwesomeIcon
                    icon={["fas", "sign-out-alt"]}
                    size="1x"
                    style={{
                      fontSize: "1.8rem",
                      margin: ".3rem .5rem 0 .5rem",
                    }}
                  />
                }
                letterSpacing=".1rem"
                pb=".5rem"
                onClick={() => signOutUser(user)}
                _hover={{
                  backgroundColor: "none",
                }}
                _focus={{
                  backgroundColor: "none",
                }}
              >
                Sign Out
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <DefaultButton onClick={onModalOpen}>Sign In</DefaultButton>
        )}
      </StyledContainer>
      <SignInModal
        isModalOpen={isModalOpen}
        onModalClose={onModalClose}
        themeStyles={themeStyles}
        themeMode={themeMode}
      />
    </>
  );
};
