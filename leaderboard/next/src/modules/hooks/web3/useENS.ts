import { validateAddress } from '@/modules/util/address'
import { useEffect, useState } from 'react'
import { useEthersWeb3React } from '.'

export function useENS(address: string): {
  loading: boolean
  name: string | null
} {
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState<string | null>(null)
  const { library } = useEthersWeb3React()

  useEffect(() => {
    if (!library || !validateAddress(address)) return

    console.log(`lookup ${address}`)

    library.lookupAddress(address).then(resolved => {
      setName(resolved)
      setLoading(false)
    })
  }, [library, address])

  return { loading, name }
}
