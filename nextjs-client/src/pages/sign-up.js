import { Helmet } from "react-helmet";
import Layout from "../components/Layout";
import SignUp from "../components/SignUp";

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
  return <Layout>{page}</Layout>;
};

export default SignUpPage;
