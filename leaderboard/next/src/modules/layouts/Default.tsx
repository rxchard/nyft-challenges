import React from 'react'

import { Header } from '@/components/interface/Header'

export const DefaultLayout: React.FC<{}> = ({ children }) => (
  <>
    <Header />
    {children}
  </>
)
