import React from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import { DialogOverlay, DialogContent } from '@reach/dialog'
import { Modal } from '@/modules/state/modal'
import { useIsActiveModal } from '@/modules/state/modal/hooks'

export interface ModalProps {
  modal: Modal
}

const StyledOverlay = tw(
  DialogOverlay,
)`z-10 bg-opacity-50 bg-darked-900 flex items-center justify-center`

const ContentStyle = tw`w-1/4 p-0 text-white border-2 border-darked-700 rounded-xl bg-darked-900`

const StyledContent = styled(DialogContent).attrs({ 'aria-label': 'dialog' })(
  ContentStyle,
)

export const ModalBase: React.FC<ModalProps> = ({ modal, children }) => {
  const active = useIsActiveModal(modal)
  if (!active) return null

  return (
    <StyledOverlay>
      <StyledContent>{children}</StyledContent>
    </StyledOverlay>
  )
}
