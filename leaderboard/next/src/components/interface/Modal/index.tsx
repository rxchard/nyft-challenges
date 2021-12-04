import React from 'react'
import { Modal } from '@/modules/state/modal'
import { useIsActiveModal, useToggleModal } from '@/modules/state/modal/hooks'
import { BaseModal } from './Base'
import { ModalCaption, ModalContent } from './util'

export interface ModalProps {
  modal: Modal
  title: string
}

export const ManagedModal: React.FC<ModalProps> = ({
  modal,
  title,
  children,
}) => {
  const active = useIsActiveModal(modal)
  const toggleSelf = useToggleModal(modal)

  return (
    <BaseModal isActive={active}>
      <ModalCaption title={title} onAction={toggleSelf} />
      <ModalContent>{children}</ModalContent>
    </BaseModal>
  )
}
