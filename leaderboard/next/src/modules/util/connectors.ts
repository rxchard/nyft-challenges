import { AbstractConnector } from '@web3-react/abstract-connector'
import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'

const supportedChainIds = [1]

export const injected = new InjectedConnector({ supportedChainIds })

export const walletConnect = new WalletConnectConnector({ supportedChainIds })

export function prepareActivation(connector: AbstractConnector) {
  // Reset WalletConnect, allows reopen
  if (connector instanceof WalletConnectConnector) {
    connector.walletConnectProvider = undefined
  }
}
