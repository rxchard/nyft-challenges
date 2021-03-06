import React from 'react'
import tw from 'twin.macro'
import { Avatar } from '../Avatar'
import { makeShortAddress } from '@/modules/util/address'
import { OwnerQuery } from '@/modules/hooks/graph'

const Container = tw.div`inline-flex flex-row items-center bg-gradient-to-r from-primary-4 via-primary-5 to-primary-6 rounded-xl`

const Content = tw.div`flex flex-row items-center p-1 pl-4 pr-4 space-x-2 flex-nowrap`
const MainContent = tw(
  Content,
)`bg-white bg-opacity-20 rounded-xl hover:cursor-pointer`

const Text = tw.p`text-white whitespace-nowrap`

export interface Web3StatusProps {
  address?: string | null
  info?: OwnerQuery['findOwner']
  onAcivate?: () => any
  onWantEdit?: () => any
}

export const Web3StatusBase: React.FC<Web3StatusProps> = ({
  address,
  info,
  onAcivate,
  onWantEdit,
}) => {
  if (address) {
    return (
      <Container>
        {info && info.idx !== -1 && (
          <Content>
            <Text># {info.idx + 1}</Text>
          </Content>
        )}
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
