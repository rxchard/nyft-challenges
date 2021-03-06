import { configureStore } from '@reduxjs/toolkit'
import { modal } from './modal'

export const store = configureStore({
  reducer: {
    modal,
  },
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
