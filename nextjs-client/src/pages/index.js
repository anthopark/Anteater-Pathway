import Layout from "../components/Layout";

export default function Main() {
  return <>Hello</>;
}

Main.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
