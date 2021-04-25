import React from 'react'
import styled from 'styled-components'

export const QMark = styled(({ dot, transform, className }: QMarkProps) => (
  <span
    className={className}
    style={{
      transform: transform,
    }}
  >
    {dot ? '.' : '?'}
  </span>
))`
  display: inline-block;
`

interface QMarkProps {
  dot?: boolean
  transform: string
  className?: string
}
