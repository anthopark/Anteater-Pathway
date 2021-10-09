import "@styles/global.css";
import { GlobalContextProvider } from "@components/GlobalContextProvider";
import { ChakraProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <GlobalContextProvider>
      <ChakraProvider>{getLayout(<Component {...pageProps} />)}</ChakraProvider>
    </GlobalContextProvider>
  );
}

export default MyApp;
