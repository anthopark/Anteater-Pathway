import '@styles/globals.css';
import '@styles/fontawesome';
import { ThemeProvider } from 'next-themes';
import { ChakraProvider } from '@chakra-ui/react';
import { AppLayoutProps } from 'next/app';
import { ReactNode } from 'react';

export default function App({ Component, pageProps }: AppLayoutProps) {
  const getLayout = Component.getLayout || ((page: ReactNode) => page);

  return (
    <ThemeProvider themes={['light', 'dark']}>
      <ChakraProvider>{getLayout(<Component {...pageProps} />)}</ChakraProvider>
    </ThemeProvider>
  );
}
