import { Helmet } from "react-helmet";

import Layout from "../components/Layout";
import Planner from "../components/Planner";

function MainPage() {
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
  return <Layout>{page}</Layout>;
};

export default MainPage;
