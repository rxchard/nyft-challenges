import React, { useEffect } from 'react'
import { useEthersWeb3React } from '@/modules/hooks/web3'
import { useOwnerLazyQuery } from '@/modules/hooks/graph'
import { Web3StatusBase } from './Status'
import { useToggleModal } from '@/modules/state/modal/hooks'
import { Modal } from '@/modules/state/modal'

export const Web3Status: React.FC = () => {
  const { account } = useEthersWeb3React()
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
      onAcivate={toggleWallet}
      onWantEdit={toggleDetails}
    />
  )
}
