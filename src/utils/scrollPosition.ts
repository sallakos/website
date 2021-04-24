import React from 'react'

interface ScrollPosition {
  top: number
  bottom: number
}

export function useScrollPosition(): ScrollPosition | undefined {
  const [scrollPosition, setScrollPosition] = React.useState<
    ScrollPosition | undefined
  >(undefined)

  // Determine the real size after mounting on the client-side
  React.useEffect(() => {
    setScrollPosition(getCurrentPosition())
  }, [])

  React.useEffect(() => {
    const callback = () => {
      const newPosition = getCurrentPosition()
      if (
        scrollPosition === undefined ||
        newPosition.top !== scrollPosition.top ||
        newPosition.bottom !== scrollPosition.bottom
      ) {
        setScrollPosition(newPosition)
      }
    }

    window.addEventListener('scroll', callback)
    return () => {
      window.removeEventListener('scroll', callback)
    }
  })

  return scrollPosition
}

function getCurrentPosition(): ScrollPosition {
  return {
    top: window.pageYOffset,
    bottom: window.pageYOffset + window.innerHeight,
  }
}
