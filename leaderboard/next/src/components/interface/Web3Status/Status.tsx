import React from 'react'
import { UnsupportedChainIdError } from '@web3-react/core'
import { AlertTriangle } from 'react-feather'
import tw from 'twin.macro'
import { Avatar } from '../Avatar'
import { makeShortAddress } from '@/modules/util/address'

const StatusWrapper = tw.div`inline-block bg-darked-800 rounded-xl`
const StatusFrame = tw.div`inline-flex flex-row items-center pt-1 pb-1 pl-4 pr-4 space-x-2 rounded-xl bg-mandy-500 hover:cursor-pointer flex-nowrap`

const StatusText = tw.p`text-white`

const Rank = tw.span`pl-4 pr-4 text-white`

const NetworkErrorIcon = tw(AlertTriangle)`w-4 h-4 text-white`

export interface Web3StatusProps {
  address?: string | null
  rank?: number | null
  error?: Error
  onAcivate: () => any
}

export const Web3StatusBase: React.FC<Web3StatusProps> = ({
  address,
  error,
  rank,
  onAcivate,
}) => {
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

  if (address) {
    return (
      <StatusWrapper>
        {rank && <Rank># {rank}</Rank>}
        <StatusFrame>
          <StatusText>{makeShortAddress(address)}</StatusText>
          <Avatar address={address} />
        </StatusFrame>
      </StatusWrapper>
    )
  }

  return (
    <StatusFrame onClick={onAcivate}>
      <StatusText>Connect Wallet</StatusText>
    </StatusFrame>
  )
}
