import { DefaultButton } from "@components/CustomChakraUI";
import { StyledContainer } from "./styled";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/menu";
import { Avatar } from "@chakra-ui/avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { auth } from "src/firebase/firebase-config";
import { signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const provider = new GoogleAuthProvider();

const onSignInButtonClick = async () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
};

const NonSignedInUI = (
  <DefaultButton onClick={onSignInButtonClick}>Sign In</DefaultButton>
);

const signOutUser = async (user) => {
  if (user) {
    await signOut(auth);
  }
};

export const UserProfile = ({ user }) => {
  return (
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
          <MenuList mt="1rem" fontSize="1.5rem">
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
            >
              Sign Out
            </MenuItem>
          </MenuList>
        </Menu>
      ) : (
        NonSignedInUI
      )}
    </StyledContainer>
  );
};
