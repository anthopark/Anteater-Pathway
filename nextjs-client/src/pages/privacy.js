import { Helmet } from "react-helmet";
import PageLayout from "@components/PageLayout";
import Privacy from "@components/Privacy";

const PrivacyPage = () => {
  return (
    <>
      <Helmet>
        <title>Anteater Pathway</title>
      </Helmet>
      <Privacy />
    </>
  );
};

PrivacyPage.getLayout = function getLayout(page) {
  return <PageLayout>{page}</PageLayout>;
};

export default PrivacyPage;
