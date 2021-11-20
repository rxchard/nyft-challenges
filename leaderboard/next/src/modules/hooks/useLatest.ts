import { useEffect, useRef } from 'react'

// modified, https://github.com/streamich/react-use/blob/master/docs/useLatest.md
export function useLatest<T>(value: T) {
  const ref = useRef<T>(value)

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref
}
