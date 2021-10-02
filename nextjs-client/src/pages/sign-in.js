import { Helmet } from "react-helmet";
import PageLayout from "@components/PageLayout";
import SignIn from "@components/SignIn";

function SignInPage() {
  return (
    <>
      <Helmet>
        <title>Sign In - Anteater Pathway</title>
      </Helmet>
      <SignIn />
    </>
  );
}

SignInPage.getLayout = function getLayout(page) {
  return <PageLayout>{page}</PageLayout>;
};

export default SignInPage;
