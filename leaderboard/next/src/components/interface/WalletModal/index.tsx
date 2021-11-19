import React from 'react'
import tw from 'twin.macro'
import { Modal } from '@/modules/state/modal'
import { ManagedModal } from '../Modal'
import { useEthersWeb3React } from '@/modules/hooks/web3'
import {
  injected,
  prepareActivation,
  walletConnect,
} from '@/modules/util/connectors'
import { AbstractConnector } from '@web3-react/abstract-connector'

const StyledButton = tw.button`w-full p-4 text-white border rounded-xl bg-darked-700 border-darked-600`

export const WalletModal: React.FC = () => {
  const { activate } = useEthersWeb3React()

  const handleActivation = (connector: AbstractConnector) => {
    prepareActivation(connector)
    activate(connector)
  }

  return (
    <ManagedModal modal={Modal.WALLET} title={'Connect your wallet'}>
      <StyledButton onClick={() => handleActivation(injected)}>
        MetaMask
      </StyledButton>
      <StyledButton onClick={() => handleActivation(walletConnect)}>
        WalletConnect
      </StyledButton>
    </ManagedModal>
  )
}
