import React from 'react'
import { UnsupportedChainIdError } from '@web3-react/core'
import { AlertTriangle } from 'react-feather'
import tw from 'twin.macro'
import { Avatar } from '../Avatar'
import { makeShortAddress } from '@/modules/util/address'
import { injected } from '@/modules/util/connectors'
import { useEthersWeb3React } from '@/modules/hooks/web3'

const StatusFrame = tw.div`inline-flex flex-row items-center pt-1 pb-1 pl-4 pr-4 space-x-2 rounded-xl bg-mandy-500 hover:cursor-pointer flex-nowrap`

const StatusText = tw.p`text-white`

const NetworkErrorIcon = tw(AlertTriangle)`w-4 h-4 text-white`

export const Web3Status: React.FC = () => {
  const { account, error, activate, library } = useEthersWeb3React()

  if (error || !library) {
    return (
      <StatusFrame>
        <NetworkErrorIcon />
        <StatusText>
          {error instanceof UnsupportedChainIdError
            ? 'Incorrect Network'
            : 'Error'}
        </StatusText>
      </StatusFrame>
    )
  }

  if (account) {
    return (
      <StatusFrame>
        <StatusText>{makeShortAddress(account)}</StatusText>
        <Avatar address={account} />
      </StatusFrame>
    )
  }

  return (
    <StatusFrame onClick={() => activate(injected)}>
      <StatusText>Connect Wallet</StatusText>
    </StatusFrame>
  )
}
