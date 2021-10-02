import { Helmet } from "react-helmet";
import Layout from "../components/Layout/";
import SignIn from "../components/SignIn";

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
  return <Layout>{page}</Layout>;
};

export default SignInPage;
