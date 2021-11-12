import React from 'react'
import { UnsupportedChainIdError } from '@web3-react/core'
import { AlertTriangle } from 'react-feather'
import tw from 'twin.macro'
import { Avatar } from '../Avatar'
import { makeShortAddress } from '@/modules/util/address'

const Container = tw.div`inline-flex flex-row items-center bg-darked-800 rounded-xl`

const Content = tw.div`flex flex-row items-center p-1 pl-4 pr-4 space-x-2 flex-nowrap`
const MainContent = tw(Content)`bg-mandy-500 rounded-xl hover:cursor-pointer`

const Text = tw.p`text-white whitespace-nowrap`

const NetworkErrorIcon = tw(AlertTriangle)`w-4 h-4 text-white`

export interface Web3StatusProps {
  address?: string | null
  rank?: number | null
  error?: Error
  onAcivate?: () => any
  onWantEdit?: () => any
}

export const Web3StatusBase: React.FC<Web3StatusProps> = ({
  address,
  error,
  rank,
  onAcivate,
  onWantEdit,
}) => {
  if (error) {
    return (
      <Container>
        <MainContent>
          <NetworkErrorIcon />
          <Text>
            {error instanceof UnsupportedChainIdError
              ? 'Incorrect Network'
              : 'Error'}
          </Text>
        </MainContent>
      </Container>
    )
  }

  if (address) {
    return (
      <Container>
        <Content>{rank && <Text># {rank}</Text>}</Content>
        <MainContent onClick={onWantEdit}>
          <Text>{makeShortAddress(address)}</Text>
          <Avatar address={address} />
        </MainContent>
      </Container>
    )
  }

  return (
    <Container onClick={onAcivate}>
      <MainContent>
        <Text>Connect Wallet</Text>
      </MainContent>
    </Container>
  )
}
