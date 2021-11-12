import React, { useCallback, useEffect, useRef } from 'react'

export interface ScrollObserverProps {
  doIntersect: () => any
}

export const ScrollObserver: React.FC<ScrollObserverProps> = ({
  doIntersect,
}) => {
  const trigger = useRef(null)

  const handleObserve = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries.length && entries[0].isIntersecting) doIntersect()
    },
    [doIntersect],
  )

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserve)
    trigger.current && observer.observe(trigger.current)
  }, [handleObserve])

  return <div ref={trigger} />
}
