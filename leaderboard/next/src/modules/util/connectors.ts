import { AbstractConnector } from '@web3-react/abstract-connector'
import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'

const SUPPORTED_CHAINS = [1]

const INFURA_KEY = process.env.NEXT_PUBLIC_INFURA_KEY
// tbreplaced
const RPC_URLS: { [id: number]: string } = {
  1: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
}

export const injected = new InjectedConnector({
  supportedChainIds: SUPPORTED_CHAINS,
})

export const walletConnect = new WalletConnectConnector({
  supportedChainIds: SUPPORTED_CHAINS,
  rpc: RPC_URLS,
})

export function prepareActivation(connector: AbstractConnector) {
  // Reset WalletConnect, allows reopen
  if (connector instanceof WalletConnectConnector) {
    connector.walletConnectProvider = undefined
  }
}
