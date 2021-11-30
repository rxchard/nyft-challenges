import tw from 'twin.macro'
import styled from 'styled-components'
import { AlertTriangle, ArrowLeft, X } from 'react-feather'
import React from 'react'
import { Heading } from '../util/Base'

const IconStyle = tw`w-6 h-6 cursor-pointer`

export const Icons = {
  Dismiss: styled(X)(IconStyle),
  Back: styled(ArrowLeft)(IconStyle),
  Error: styled(AlertTriangle)(IconStyle),
}

const CaptionContainer = tw.div`flex flex-row items-center justify-between w-full p-4`

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

export interface ModalErrorProps {
  error: string
}

const ErrorContainer = tw.div`flex flex-row items-center p-4 space-x-2 border text-secondary-200 border-secondary-200 rounded-xl`

export const ModalError: React.FC<ModalErrorProps> = ({ error }) =>
  error ? (
    <ErrorContainer>
      <Icons.Error />
      <span>{error}</span>
    </ErrorContainer>
  ) : null
