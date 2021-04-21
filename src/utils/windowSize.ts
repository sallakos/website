import React from 'react'

interface WindowSize {
  width: number
  height: number
}

export function useWindowSize(): WindowSize | undefined {
  // Use undefined initially, as we don't know the window size during SSR
  const [windowSize, setWindowSize] = React.useState<WindowSize | undefined>(
    undefined
  )

  // Determine the real size after mounting on the client-side
  React.useEffect(() => {
    setWindowSize(getCurrentSize())
  }, [])

  React.useEffect(() => {
    const callback = () => {
      const newSize = getCurrentSize()
      if (
        windowSize === undefined ||
        newSize.width !== windowSize.width ||
        newSize.height !== windowSize.height
      ) {
        setWindowSize(newSize)
      }
    }

    window.addEventListener('resize', callback)
    return () => {
      window.removeEventListener('resize', callback)
    }
  })

  return windowSize
}

export function useWindowWidth(): number | undefined {
  const windowSize = useWindowSize()
  return windowSize?.width
}

function getCurrentSize(): WindowSize {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  }
}
