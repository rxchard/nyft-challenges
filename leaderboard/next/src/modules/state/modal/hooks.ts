import { useCallback } from 'react'
import { Modal, setActiveModal } from '.'
import { AppState } from '..'
import { useAppDispatch, useAppSelector } from '../hooks'

export function useIsActiveModal(modal: Modal) {
  return modal === useAppSelector((state: AppState) => state.modal.active)
}

export function useToggleModal(modal: Modal) {
  const active = useIsActiveModal(modal)
  const dispatch = useAppDispatch()

  return useCallback(
    () => dispatch(setActiveModal(active ? null : modal)),
    [modal, active, dispatch],
  )
}
