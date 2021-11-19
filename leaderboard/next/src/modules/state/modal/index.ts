import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export enum Modal {
  DETAILS,
  WALLET,
}

export interface ModalState {
  active: Modal | null
}

const initialState: ModalState = {
  active: null,
}

const { reducer, actions } = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setActiveModal: (state, { payload }: PayloadAction<Modal | null>) => {
      state.active = payload
    },
  },
})

export const { setActiveModal } = actions
export const modal = reducer
