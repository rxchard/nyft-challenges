import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'

export function useEthersWeb3React(key?: string) {
  return useWeb3React<Web3Provider>(key)
}
