import tw from 'twin.macro'
import styled from 'styled-components'
import { ArrowLeft, X } from 'react-feather'
import React from 'react'
import { Heading } from '../util/Base'

const IconStyle = tw`w-6 h-6 cursor-pointer`

export const Icons = {
  Dismiss: styled(X)(IconStyle),
  Back: styled(ArrowLeft)(IconStyle),
}

const CaptionContainer = tw.div`flex flex-row justify-between w-full p-4`

export interface ModalCaptionProps {
  title: string
  onAction: () => any
}

export const ModalCaption: React.FC<ModalCaptionProps> = ({
  title,
  onAction,
}) => (
  <CaptionContainer>
    <Heading>{title}</Heading>
    <Icons.Dismiss onClick={onAction} />
  </CaptionContainer>
)

export const ModalContent = tw.div`p-4 space-y-4`
