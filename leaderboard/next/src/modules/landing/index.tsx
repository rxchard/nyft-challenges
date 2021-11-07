import type { NextPage } from 'next'
import Image from 'next/image'
import React from 'react'
import tw from 'twin.macro'

import { DefaultLayout } from '../layouts/Default'
import { HeadController } from '@/components/HeadController'
import { Leaderboard } from '@/components/interface/Leaderboard'
import { Container } from '@/components/interface/util/Container'
import { DetailsModal } from '@/components/interface/DetailsModal'
import { Modal } from '../state/modal'
import { useToggleModal } from '../state/modal/hooks'

const BackgroundFrame = tw.div`absolute top-0 left-0 right-0 w-full h-full overflow-hidden`

const BackgroundImage: React.FC = () => {
  return (
    <BackgroundFrame>
      <Image
        alt=""
        src="/pixel_top.png"
        layout="fill"
        objectFit="none"
        objectPosition="top"
        quality={100}
      />
    </BackgroundFrame>
  )
}

const LandingContainer = tw(Container)`z-10 flex flex-col items-center h-full`

const Title = tw.h1`p-8 text-4xl text-center uppercase text-mandy-500`

export const LandingPage: NextPage = () => {
  const toggleModal = useToggleModal(Modal.DETAILS)

  return (
    <>
      <HeadController title="Leaderboard" />
      <DetailsModal />
      <DefaultLayout>
        <LandingContainer>
          <Title onClick={toggleModal}>Legendary Leaderboard</Title>
          <Leaderboard />
        </LandingContainer>
      </DefaultLayout>
    </>
  )
}
