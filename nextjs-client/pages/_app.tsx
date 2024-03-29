import '@styles/globals.css';
import '@styles/fontawesome';
import { ThemeProvider } from 'next-themes';
import { chakraTheme } from '@styles/charkra-theme';
import { ChakraProvider } from '@chakra-ui/react';
import { AppUserProvider } from '@contexts/AppUserContext/AppUserContext';
import { AppLayoutProps } from 'next/app';
import { ReactNode } from 'react';
import { enableMapSet } from 'immer';

enableMapSet();

export default function App({ Component, pageProps }: AppLayoutProps) {
  const getLayout = Component.getLayout || ((page: ReactNode) => page);

  return (
    <ThemeProvider defaultTheme={'light'} themes={['light', 'dark']}>
      <ChakraProvider theme={chakraTheme}>
        <AppUserProvider>
          {getLayout(<Component {...pageProps} />)}
        </AppUserProvider>
      </ChakraProvider>
    </ThemeProvider>
  );
}
