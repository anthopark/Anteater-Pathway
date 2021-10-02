import { Helmet } from "react-helmet";
import PageLayout from "@components/PageLayout";
import SignUp from "@components/SignUp";

function SignUpPage() {
  return (
    <>
      <Helmet>
        <title>Sign Up - Anteater Pathway</title>
      </Helmet>
      <SignUp />
    </>
  );
}

SignUpPage.getLayout = function getLayout(page) {
  return <PageLayout>{page}</PageLayout>;
};

export default SignUpPage;
