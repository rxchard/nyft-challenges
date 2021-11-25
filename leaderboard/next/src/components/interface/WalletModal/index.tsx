import React, { useEffect } from 'react'
import tw from 'twin.macro'
import Image from 'next/image'
import { Modal } from '@/modules/state/modal'
import { ManagedModal } from '../Modal'
import { useEthersWeb3React } from '@/modules/hooks/web3'
import { prepareActivation } from '@/modules/util/connectors'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { useIsActiveModal, useToggleModal } from '@/modules/state/modal/hooks'
import { usePrevious } from '@/modules/hooks/usePrevious'
import { StyledButton } from '../util/Base'
import { AVAIL_WALLETS } from '@/modules/util/wallets'

const SpacedButton = tw(StyledButton)`justify-between`

export const WalletModal: React.FC = () => {
  const activeModal = useIsActiveModal(Modal.WALLET)
  const toggleSelf = useToggleModal(Modal.WALLET)

  const { account, activate } = useEthersWeb3React()
  const prevAccount = usePrevious(account)

  useEffect(() => {
    if (account && !prevAccount && activeModal) toggleSelf()
  }, [account, prevAccount, activeModal, toggleSelf])

  const handleActivation = (connector: AbstractConnector) => {
    prepareActivation(connector)
    activate(connector)
  }

  return (
    <ManagedModal modal={Modal.WALLET} title={'Connect your wallet'}>
      {AVAIL_WALLETS.map((wallet, index) => (
        <SpacedButton
          key={index}
          onClick={() => handleActivation(wallet.connector)}
        >
          {wallet.name}
          {wallet.icon && (
            <Image src={wallet.icon} width={21} height={21} alt="" />
          )}
        </SpacedButton>
      ))}
    </ManagedModal>
  )
}
