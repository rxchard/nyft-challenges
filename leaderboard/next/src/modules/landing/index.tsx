import type { NextPage } from 'next'
import React from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'

import { DefaultLayout } from '../layouts/Default'
import { HeadController } from '@/components/HeadController'
import { Leaderboard } from '@/components/interface/Leaderboard'
import { Container } from '@/components/interface/util/Container'
import { DetailsModal } from '@/components/interface/DetailsModal'

const LandingContainer = styled(Container)`
  margin-top: 450px;
  ${tw`flex flex-col items-center h-full`}
`

const Title = tw.h1`p-8 text-3xl text-center text-white uppercase sm:text-5xl`

export const LandingPage: NextPage = () => (
  <>
    <HeadController title="Leaderboard" />
    <DetailsModal />
    <DefaultLayout>
      <LandingContainer>
        <Title>Legendary Leaderboard</Title>
        <Leaderboard />
      </LandingContainer>
    </DefaultLayout>
  </>
)
