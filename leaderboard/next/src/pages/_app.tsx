import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import { Web3Provider } from '@/components/Web3Provider'
import { GraphProvider } from '@/components/GraphProvider'

function App({ Component, pageProps }: AppProps) {
  return (
    <Web3Provider>
      <GraphProvider>
        <Head>
          <link rel="icon" href="/favicon.ico" type="image/x-icon" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, user-scalable=no, user-scalable=0"
          />
        </Head>
        <Component {...pageProps} />
      </GraphProvider>
    </Web3Provider>
  )
}

export default App
