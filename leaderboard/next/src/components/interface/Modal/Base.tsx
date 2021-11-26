import React from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import { useTransition, animated } from 'react-spring'
import { DialogOverlay, DialogContent } from '@reach/dialog'

export interface BaseModalProps {
  isActive: boolean
}

const StyledOverlay = tw(
  DialogOverlay,
)`z-10 bg-opacity-50 bg-black flex items-center justify-center`

const AnimatedOverlay = animated(StyledOverlay)

const ContentStyle = tw`w-full max-w-lg p-0 m-8 text-white border rounded-xl border-secondary-800 bg-secondary-900`

const StyledContent = styled(DialogContent).attrs({ 'aria-label': 'dialog' })(
  ContentStyle,
)

export const BaseModal: React.FC<BaseModalProps> = ({ isActive, children }) => {
  const trans = useTransition(isActive, {
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
