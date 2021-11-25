import React, { useEffect, useState } from 'react'
import { useEthersWeb3React } from '@/modules/hooks/web3'
import { useOwnerLazyQuery } from '@/modules/hooks/graph'
import { Web3StatusBase } from './Status'
import { useToggleModal } from '@/modules/state/modal/hooks'
import { Modal } from '@/modules/state/modal'
import { UnsupportedChainIdError } from '@web3-react/core'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as InjectedUserRejected,
} from '@web3-react/injected-connector'
import { UserRejectedRequestError as WalletConnectUserRejected } from '@web3-react/walletconnect-connector'

function parseError(error?: Error): string {
  if (!error) return ''

  if (error instanceof NoEthereumProviderError) {
    return 'No Provider'
  }
  // user is on incorrect chain, we only support mainnet
  if (error instanceof UnsupportedChainIdError) {
    return 'Incorrect Network'
  }

  if (
    error instanceof InjectedUserRejected ||
    error instanceof WalletConnectUserRejected
  ) {
    return ''
  }

  console.error(error)
  return 'Unknown Error'
}

export const Web3Status: React.FC = () => {
  const { account, error } = useEthersWeb3React()
  const [queryFindOwner, { data }] = useOwnerLazyQuery()

  useEffect(() => {
    if (!account) return
    queryFindOwner({ variables: { address: account } })
  }, [queryFindOwner, account])

  const toggleDetails = useToggleModal(Modal.DETAILS)
  const toggleWallet = useToggleModal(Modal.WALLET)

  return (
    <Web3StatusBase
      address={account}
      info={data?.findOwner}
      error={parseError(error)}
      onAcivate={toggleWallet}
      onWantEdit={toggleDetails}
    />
  )
}
