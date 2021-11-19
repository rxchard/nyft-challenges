import React from 'react'
import tw from 'twin.macro'

import { Link } from '@/components/Link'
import { Container } from '../util/Base'
import { Web3Status } from '../Web3Status'

const HeaderFrame = tw.div`flex flex-row justify-end`

const NavList = tw.div`flex items-center space-x-8 text-xl text-white`

export const Header: React.FC = () => {
  return (
    <Container>
      <HeaderFrame>
        <NavList>
          <Link external={true} url="https://niftyisland.com">
            Metaverse
          </Link>
          <Web3Status />
        </NavList>
      </HeaderFrame>
    </Container>
  )
}
