import React from 'react'
import tw from 'twin.macro'
import { Modal } from '@/modules/state/modal'
import { ManagedModal } from '../Modal'
import { DetailsInput } from './DetailsInput'

const Disclaimer = tw.div`p-4 border rounded-xl bg-darked-700 border-darked-600`

export const DetailsModal: React.FC = () => (
  <ManagedModal modal={Modal.DETAILS} title={'Edit your details'}>
    <Disclaimer>
      {`Note: After confirming, you'll be asked to sign a message with your wallet to confirm your identity. Display names take priority over your ENS name.`}
    </Disclaimer>
    <DetailsInput />
  </ManagedModal>
)
