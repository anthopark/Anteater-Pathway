import { Helmet } from "react-helmet";
import PageLayout from "@components/PageLayout";
import Planner from "@components/Planner";

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
  return <PageLayout>{page}</PageLayout>;
};

export default MainPage;
