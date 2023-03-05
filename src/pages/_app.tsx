//import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect, useState } from "react"
import { ChakraProvider } from "@chakra-ui/react"
import WalletContextProvider from '../context/WalletContextProvider'
import { QrProvider } from '@/context/QrContextProvider'
import { Header } from '../components/Header'


export default function App({ Component, pageProps }: AppProps) {
  const [showChild, setShowChild] = useState(false);


  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  if (typeof window === 'undefined') {
    return <></>;
  } else {
    return (
      <ChakraProvider>
        <QrProvider>
          <WalletContextProvider>
            <Header />
            <Component {...pageProps} />

          </WalletContextProvider>
        </QrProvider>
      </ChakraProvider>
    );
  }
}
