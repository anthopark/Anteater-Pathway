import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "../firebase/client-app";
import { useState } from "react";
import { Helmet } from "react-helmet";
import PageLayout from "@components/PageLayout";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";

const uiConfig = {
  signInFlow: "popup",
  signInSuccessUrl: "/",
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
};

function TestSignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(firebase.auth());

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  if (user) {
    return (
      <div>
        <p>Registered User: {user.email}</p>
      </div>
    );
  }
  return (
    <>
      <Helmet>
        <title>Sign Up - Anteater Pathway</title>
      </Helmet>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      <div className="App">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={() => createUserWithEmailAndPassword(email, password)}>
          Register
        </button>
      </div>
    </>
  );
}

TestSignIn.getLayout = function getLayout(page) {
  return <PageLayout>{page}</PageLayout>;
};

export default TestSignIn;
