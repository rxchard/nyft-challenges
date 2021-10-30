import React from 'react'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { AlertTriangle } from 'react-feather'
import tw from 'twin.macro'
import { Avatar } from '../Avatar.tsx'
import { makeShortAddress } from '../../../modules/util/address'
import { InjectedConnector } from '@web3-react/injected-connector'

const StatusFrame = tw.div`inline-flex flex-row items-center pt-1 pb-1 pl-4 pr-4 space-x-2 rounded-xl bg-mandy-500 hover:cursor-pointer flex-nowrap`

const StatusText = tw.p`text-white`

const NetworkErrorIcon = tw(AlertTriangle)`w-4 h-4 text-white`

const injected = new InjectedConnector({ supportedChainIds: [1] })

export const Web3Status: React.FC = () => {
  const { account, error, activate } = useWeb3React()

  if (error) {
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
