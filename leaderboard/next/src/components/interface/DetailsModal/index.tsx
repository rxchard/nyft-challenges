import React from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import { ArrowLeft, X } from 'react-feather'
import { Modal } from '@/modules/state/modal'
import { ModalBase } from '../ModalBase'
import { useToggleModal } from '@/modules/state/modal/hooks'
import { DetailsInput } from './DetailsInput'

const ModalCaption = tw.div`flex flex-row justify-between w-full p-4`

const IconStyle = tw`w-6 h-6 cursor-pointer`

const icons = {
  Dismiss: styled(X)(IconStyle),
  Back: styled(ArrowLeft)(IconStyle),
}

const Title = tw.h1`text-white`

const ContentFrame = tw.div`p-4 space-y-8`

const Disclaimer = tw.div`p-4 border rounded-xl bg-darked-700 border-darked-600`

export const DetailsModal: React.FC = () => {
  const modal = Modal.DETAILS
  const toggleSelf = useToggleModal(modal)

  return (
    <ModalBase modal={modal}>
      <ModalCaption>
        <Title>Edit your details</Title>
        <icons.Dismiss onClick={toggleSelf} />
      </ModalCaption>
      <ContentFrame>
        <Disclaimer>
          {`Note: After confirming, you'll be asked to sign a message with your wallet to confirm your identity. Display names take priority over your ENS name.`}
        </Disclaimer>
        <DetailsInput />
      </ContentFrame>
    </ModalBase>
  )
}
