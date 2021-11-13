import React, { MutableRefObject, useEffect, useRef, useState } from 'react'

export interface ScrollObserverProps {
  doEnter: () => any
}

export const ScrollObserver: React.FC<ScrollObserverProps> = ({ doEnter }) => {
  const doEnterRef = useRef(doEnter)

  useEffect(() => {
    doEnterRef.current = doEnter
  }, [doEnter])

  const [viewed, setViewed] = useState(false)

  const observerRef = useRef(
    new IntersectionObserver(async ([entry]) => {
      const visible = entry.isIntersecting
      if (visible && !viewed) await doEnterRef.current()
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

  return <div ref={trigger} />
}
