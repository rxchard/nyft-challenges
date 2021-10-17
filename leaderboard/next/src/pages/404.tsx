import { useEffect } from 'react'
import { useRouter } from 'next/router'

function Generic() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/')
  })

  return null
}

export default Generic
