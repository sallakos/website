import React, { MutableRefObject, useEffect, useRef } from 'react'
import styled from 'styled-components'

export const IGMore = ({ animate }: AnimationProps) => {
  const ref1 = useRef<HTMLSpanElement>(null)
  const ref2 = useRef<HTMLSpanElement>(null)
  const ref3 = useRef<HTMLSpanElement>(null)
  const ref4 = useRef<HTMLSpanElement>(null)
  const ref5 = useRef<HTMLSpanElement>(null)
  const ref7 = useRef<HTMLSpanElement>(null)
  const ref8 = useRef<HTMLSpanElement>(null)
  const ref9 = useRef<HTMLSpanElement>(null)
  const ref10 = useRef<HTMLSpanElement>(null)
  const ref11 = useRef<HTMLSpanElement>(null)
  const ref12 = useRef<HTMLSpanElement>(null)
  const ref13 = useRef<HTMLSpanElement>(null)
  const ref14 = useRef<HTMLSpanElement>(null)
  const ref15 = useRef<HTMLSpanElement>(null)
  const ref16 = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (animate >= 1) {
      ref1.current.classList.add('animate')
      ref2.current.classList.add('animate')
      ref3.current.classList.add('animate')
      ref4.current.classList.add('animate')
      ref5.current.classList.add('animate')
      ref7.current.classList.add('animate')
      ref8.current.classList.add('animate')
      ref9.current.classList.add('animate')
      ref10.current.classList.add('animate')
      ref11.current.classList.add('animate')
      ref12.current.classList.add('animate')
      ref13.current.classList.add('animate')
      ref14.current.classList.add('animate')
      ref15.current.classList.add('animate')
      ref16.current.classList.add('animate')
    }
  })

  return (
    <Div>
      <Letter ref={ref1} letter="l" className="c1" />
      <Letter ref={ref2} letter="i" className="c2" />
      <Letter ref={ref3} letter="s" className="c3" />
      <Letter ref={ref4} letter="ä" className="c4" />
      <Letter ref={ref5} letter="ä" className="c5" />
      <br />
      <Letter ref={ref7} letter="k" className="c7" />
      <Letter ref={ref8} letter="o" className="c8" />
      <Letter ref={ref9} letter="i" className="c9" />
      <Letter ref={ref10} letter="r" className="c10" />
      <Letter ref={ref11} letter="a" className="c11" />
      <Letter ref={ref12} letter="k" className="c12" />
      <Letter ref={ref13} letter="u" className="c13" />
      <Letter ref={ref14} letter="v" className="c14" />
      <Letter ref={ref15} letter="i" className="c15" />
      <Letter ref={ref16} letter="a" className="c16" />
    </Div>
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

const Div = styled.div`
  position: absolute;
  text-align: left;
  font-family: 'Crafty Girls', sans-serif;
  transform: rotate(-3deg);
  width: 120%;
  top: -47%;
  left: 54%;

  @media (min-width: ${(props) => props.theme.breakpoints.tabletBreakpoint}px) {
    font-size: 1.8rem;
    width: 80%;
    top: -21%;
    left: 70%;
  }
`

const Span = styled.span`
  display: inline-block;
  opacity: 1;
  &.hidden {
    opacity: 0;
  }
  &.animate {
    animation: show 0.2s;
  }
  &.c1 {
    animation-delay: 1.2s;
  }
  &.c2 {
    animation-delay: 1.3s;
  }
  &.c3 {
    animation-delay: 1.4s;
  }
  &.c4 {
    animation-delay: 1.5s;
  }
  &.c5 {
    animation-delay: 1.6s;
  }
  &.c7 {
    animation-delay: 1.7s;
  }
  &.c8 {
    animation-delay: 1.8s;
  }
  &.c9 {
    animation-delay: 1.9s;
  }
  &.c10 {
    animation-delay: 2s;
  }
  &.c11 {
    animation-delay: 2.1s;
  }
  &.c12 {
    animation-delay: 2.2s;
  }
  &.c13 {
    animation-delay: 2.3s;
  }
  &.c14 {
    animation-delay: 2.4s;
  }
  &.c15 {
    animation-delay: 2.5s;
  }
  &.c16 {
    animation-delay: 2.6s;
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

interface AnimationProps {
  animate: number
}
