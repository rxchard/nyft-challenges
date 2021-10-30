import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { injected } from '@/modules/util/connectors'

// Inspired by https://github.com/NoahZinsmeister/web3-react/blob/v6/example/hooks.ts
//
export function useEagerConnect() {
  const { activate, active } = useWeb3React()
  const [tried, setTried] = useState(false)

  useEffect(() => {
    injected.isAuthorized().then(auth => {
      // only activate if already authorized
      if (!auth) {
        setTried(true)
        return
      }

      activate(injected, undefined, true).catch(
        () => setTried(true), // Failed
      )
    })
    // disable eslint (for now)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // [] mount only

  // await active change and set flag tried
  useEffect(() => {
    if (active) setTried(true)
  }, [active])

  return tried
}
