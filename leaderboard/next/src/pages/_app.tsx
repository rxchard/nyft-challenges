import '../styles/globals.scss'

import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Provider } from 'react-redux'

import { Web3Provider } from '@/components/Web3Provider'
import { GraphProvider } from '@/components/GraphProvider'
import { store } from '@/modules/state'
import { StrictMode } from 'react'

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Web3Provider>
        <GraphProvider>
          <Head>
            <link rel="icon" href="/favicon.ico" type="image/x-icon" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, user-scalable=no, user-scalable=0"
            />
          </Head>
          <StrictMode>
            <Component {...pageProps} />
          </StrictMode>
        </GraphProvider>
      </Web3Provider>
    </Provider>
  )
}

export default App
