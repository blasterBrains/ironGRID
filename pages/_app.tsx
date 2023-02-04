import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../common/theme';
import { StoreProvider } from '../common/context';

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
