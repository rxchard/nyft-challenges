import IconMetaMask from '@/assets/mm.svg'
import IconWalletConnect from '@/assets/wc.svg'
import { injected, walletConnect } from '@/modules/util/connectors'
import { AbstractConnector } from '@web3-react/abstract-connector'

export const AVAIL_WALLETS: {
  name: string
  icon?: any
  connector: AbstractConnector
}[] = [
  {
    name: 'MetaMask',
    icon: IconMetaMask,
    connector: injected,
  },
  {
    name: 'WalletConnect',
    icon: IconWalletConnect,
    connector: walletConnect,
  },
]
