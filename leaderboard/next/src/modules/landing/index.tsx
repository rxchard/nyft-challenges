import type { NextPage } from 'next'
import tw from 'twin.macro'

import { DefaultLayout } from '../layouts/Default'
import { HeadController } from '@/components/HeadController'
import { Leaderboard } from '@/components/interface/Leaderboard'
import { Container } from '@/components/interface/util/Container'

const LandingFrame = tw.div`z-10 flex flex-col items-center h-full`

const Title = tw.h1`p-8 text-4xl text-center uppercase text-nlight`

export const LandingPage: NextPage = () => (
  <>
    <HeadController title="Leaderboard" />
    <DefaultLayout>
      <Container>
        <LandingFrame>
          <Title>Legendary Leaderboard</Title>
          <Leaderboard />
        </LandingFrame>
      </Container>
    </DefaultLayout>
  </>
)
