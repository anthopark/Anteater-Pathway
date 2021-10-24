import Link from "next/link";
import { Button } from "@components/CustomChakraUI";
import { StyledContainer } from "./styled";

const SignInAndSignUpUI = (
  <>
    <Button
      backgroundColor="transparent"
      colorScheme="gray"
      color="gray"
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
  return <StyledContainer>{SignInAndSignUpUI}</StyledContainer>;
};
