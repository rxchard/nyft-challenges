import React, { useEffect, useRef, useState } from 'react'
import { useLatest } from '@/modules/hooks/useLatest'

export interface ScrollObserverProps {
  doEnter: () => any
}

export const ScrollObserver: React.FC<ScrollObserverProps> = ({ doEnter }) => {
  const enterView = useLatest(doEnter)
  const [viewed, setViewed] = useState(false)

  const observerRef = useRef(
    new IntersectionObserver(async ([entry]) => {
      const visible = entry.isIntersecting
      console.log(entry)
      if (visible && !viewed) await enterView.current()
      setViewed(visible)
    }),
  )

  const trigger = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const [observer, element] = [observerRef.current, trigger.current]
    element && observer.observe(element)
    return () => {
      observer.disconnect()
    }
  }, [observerRef])

  // Mobile (Firefox) needs a height (Address bar not in viewport?)
  return <div style={{ width: '100%', height: '100px' }} ref={trigger} />
}
