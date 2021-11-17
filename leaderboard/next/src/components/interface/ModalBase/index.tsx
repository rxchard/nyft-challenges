import React from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import { useTransition, animated } from 'react-spring'
import { DialogOverlay, DialogContent } from '@reach/dialog'
import { Modal } from '@/modules/state/modal'
import { useIsActiveModal } from '@/modules/state/modal/hooks'

export interface ModalProps {
  modal: Modal
}

const StyledOverlay = tw(
  DialogOverlay,
)`z-10 bg-opacity-50 bg-darked-900 flex items-center justify-center`

const AnimatedOverlay = animated(StyledOverlay)

const ContentStyle = tw`w-full max-w-xl p-0 m-8 text-white border-2 rounded-xl border-darked-700 bg-darked-900`

const StyledContent = styled(DialogContent).attrs({ 'aria-label': 'dialog' })(
  ContentStyle,
)

export const ModalBase: React.FC<ModalProps> = ({ modal, children }) => {
  const active = useIsActiveModal(modal)

  const trans = useTransition(active, {
    config: { duration: 100 },
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  return (
    <>
      {trans(
        (style, item) =>
          item && (
            <AnimatedOverlay style={style}>
              <StyledContent>{children}</StyledContent>
            </AnimatedOverlay>
          ),
      )}
    </>
  )
}
