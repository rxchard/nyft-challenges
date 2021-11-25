import React from 'react'
import tw from 'twin.macro'
import { Modal } from '@/modules/state/modal'
import { ManagedModal } from '../Modal'
import { DetailsInput } from './DetailsInput'

const Disclaimer = tw.div`p-4 leading-snug border bg-tertiary-800 rounded-xl border-tertiary-700`

export const DetailsModal: React.FC = () => (
  <ManagedModal modal={Modal.DETAILS} title={'Edit your details'}>
    <Disclaimer>
      {`After confirming, you'll be asked to sign a message with your connected wallet to confirm your identity. Customized display names take priority over your ENS name.`}
    </Disclaimer>
    <DetailsInput />
  </ManagedModal>
)
