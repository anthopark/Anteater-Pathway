import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "../firebase/client-app";
import { Helmet } from "react-helmet";
import PageLayout from "@components/PageLayout";

const uiConfig = {
  signInFlow: "popup",
  signInSuccessUrl: "/",
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
};

function TestSignIn() {
  return (
    <>
      <Helmet>
        <title>Sign Up - Anteater Pathway</title>
      </Helmet>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </>
  );
}

TestSignIn.getLayout = function getLayout(page) {
  return <PageLayout>{page}</PageLayout>;
};

export default TestSignIn;
