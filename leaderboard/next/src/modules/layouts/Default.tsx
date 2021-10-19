import React from 'react'

import { Header } from '../Header'

export const DefaultLayout: React.FC<{}> = ({ children }) => (
  <>
    <Header />
    {children}
  </>
)
