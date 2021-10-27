import Link from "next/link";
import { Button } from "@components/CustomChakraUI";
import { StyledContainer } from "./styled";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../../../firebase/client-app";

const SignInAndSignUpUI = (
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

export const UserProfile = () => {
  const [user, loading] = useAuthState(firebase.auth());

  console.log(`Loading: ${loading} | Current user: ${user}`);
  console.log(user);
  // if (user) {
  //   console.log(firebase.auth().currentUser.getIdToken());
  // }
  return <StyledContainer>{SignInAndSignUpUI}</StyledContainer>;
};
