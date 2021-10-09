import { Helmet } from "react-helmet";
import PageLayout from "@components/PageLayout";
import Planner from "@components/Planner";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../firebase/client-app";

function MainPage() {
  const [user, loading] = useAuthState(firebase.auth());

  console.log(`Loading: ${loading} | Current user: ${user}`);
  console.log(user);
  if (user) {
    console.log(firebase.auth().currentUser.getIdToken());
  }

  return (
    <>
      <Helmet>
        <title>Anteater Pathway</title>
      </Helmet>
      <Planner />
    </>
  );
}

MainPage.getLayout = function getLayout(page) {
  return <PageLayout>{page}</PageLayout>;
};

export default MainPage;
