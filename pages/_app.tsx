import type { AppProps, AppContext } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../common/theme';
import { StoreProvider } from '../common/context';
import { ContentContext } from 'twilio/lib/rest/content/v1/content';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="app">
      <StoreProvider>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </StoreProvider>
    </div>
  );
}
