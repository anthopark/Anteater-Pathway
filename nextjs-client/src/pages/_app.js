import "@styles/global.css";
import { GlobalContextProvider } from "@components/GlobalContextProvider";

function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <GlobalContextProvider>
      {getLayout(<Component {...pageProps} />)}
    </GlobalContextProvider>
  );
}

export default MyApp;
