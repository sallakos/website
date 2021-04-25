import React, { MutableRefObject, useEffect, useRef } from 'react'
import styled from 'styled-components'

export const Heading = () => {
  const sRef = useRef<HTMLSpanElement>(null)
  const a1Ref = useRef<HTMLSpanElement>(null)
  const l1Ref = useRef<HTMLSpanElement>(null)
  const l2Ref = useRef<HTMLSpanElement>(null)
  const a2Ref = useRef<HTMLSpanElement>(null)
  const dotRef = useRef<HTMLSpanElement>(null)

  return (
    <h1>
      <Letter ref={sRef} letter="S" className="s" />
      <Letter ref={a1Ref} letter="a" className="a1" />
      <Letter ref={l1Ref} letter="l" className="l1" />
      <Letter ref={l2Ref} letter="l" className="l2" />
      <Letter ref={a2Ref} letter="a" className="a2" />
      <Letter ref={dotRef} letter="." className="dot" />
    </h1>
  )
}

const Letter = React.forwardRef<HTMLSpanElement, LetterProps>(
  ({ letter, className }, ref) => {
    const onAnimationEnd = (element: HTMLSpanElement) =>
      element.classList.remove('hidden')
    return (
      <Span
        ref={ref}
        className={`${className ? `${className} ` : ''}hidden`}
        onAnimationEnd={() =>
          onAnimationEnd((ref as MutableRefObject<HTMLSpanElement>).current)
        }
      >
        {letter}
      </Span>
    )
  }
)

const Span = styled.span`
  display: inline-block;
  opacity: 1;
  &.hidden {
    opacity: 0;
  }
  animation: show 1s;
  &.a1 {
    animation-delay: 0.3s;
  }
  &.l1 {
    animation-delay: 0.8s;
  }
  &.l2 {
    animation-delay: 1.1s;
  }
  &.a2 {
    animation-delay: 1.5s;
  }
  &.dot {
    animation-delay: 2s;
  }
  @keyframes show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`

interface LetterProps {
  letter: string
  className: string
}
