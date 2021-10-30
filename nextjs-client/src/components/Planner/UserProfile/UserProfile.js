import Link from "next/link";
import { Button } from "@components/CustomChakraUI";
import { StyledContainer } from "./styled";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/menu";
import { Avatar } from "@chakra-ui/avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import firebase from "../../../firebase/client-app";

const NonSignedInUI = (
  <>
    <Button
      backgroundColor="transparent"
      colorScheme="gray"
      color="#574C4C"
      mr="1rem"
      mt=".4rem"
    >
      <Link href="/sign-in">Sign in</Link>
    </Button>
    <Button backgroundColor="#CB1582" colorScheme="pink" mt=".4rem">
      <Link href="/sign-up">Sign up</Link>
    </Button>
  </>
);

const signOutUser = async (user) => {
  if (user) {
    await firebase.auth().signOut();
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
