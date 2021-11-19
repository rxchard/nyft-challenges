import type { NextPage } from 'next'
import React from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'

import { DefaultLayout } from '../layouts/Default'
import { HeadController } from '@/components/HeadController'
import { Leaderboard } from '@/components/interface/Leaderboard'
import { Container } from '@/components/interface/util/Base'
import { DetailsModal } from '@/components/interface/DetailsModal'
import { WalletModal } from '@/components/interface/WalletModal'
import { Heading } from '@/components/interface/Leaderboard/Heading'

const LandingContainer = styled(Container)`
  margin-top: 420px;
  ${tw`flex flex-col items-center h-full`}
`

export const LandingPage: NextPage = () => (
  <>
    <HeadController title="Leaderboard" />
    <DetailsModal />
    <WalletModal />
    <DefaultLayout>
      <LandingContainer>
        <Heading />
        <Leaderboard />
      </LandingContainer>
    </DefaultLayout>
  </>
)
