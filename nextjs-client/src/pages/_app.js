import "@styles/global.css";
import "@styles/fontawesome";
import { GlobalContextProvider } from "@components/GlobalContextProvider";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GlobalContextProvider>
          {getLayout(<Component {...pageProps} />)}
        </GlobalContextProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
