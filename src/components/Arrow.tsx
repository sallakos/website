import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

export const Arrow = ({ animate, wide }: ArrowProps) => {
  const arrowRef = useRef<SVGPathElement>(null)
  const arrowHeadRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    if (animate >= 1) {
      arrowRef.current.classList.add('animate')
      arrowHeadRef.current.classList.add('animate')
    }
  })

  return (
    <AnimationDiv>
      <svg
        height={wide ? 100 : 50}
        width={wide ? 100 : 50}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
      >
        <path
          fill="none"
          strokeMiterlimit="10"
          strokeWidth="3"
          d="M 90.813153,5.0438075 C 3.9783901,14.253815 14.244447,86.758076 14.244447,86.758076 v 0 0"
          className="arrow"
          ref={arrowRef}
        />
        <path
          fill="none"
          strokeMiterlimit="10"
          strokeWidth="3"
          d="M 3.5525884,71.697693 14.244447,86.758075 26.159969,72.989545 v 0 0"
          className="arrow head"
          ref={arrowHeadRef}
        />
      </svg>
    </AnimationDiv>
  )
}

const AnimationDiv = styled.div`
  transform: rotate(-27deg);
  @media (min-width: ${(props) => props.theme.breakpoints.tabletBreakpoint}px) {
    transform: rotate(0);
  }

  .animate {
    animation: draw 0.75s linear forwards;
  }
  .arrow {
    stroke: black;
    stroke-dasharray: 150;
    stroke-dashoffset: 150;
    transition: stroke 250ms ease-in-out;
  }
  .arrow.head {
    animation-delay: 0.75s;
  }
  .text {
    stroke-dasharray: 20;
    stroke-dashoffset: 20;
    animation: draw 5s linear forwards;
  }

  @keyframes draw {
    to {
      stroke-dashoffset: 0;
    }
  }
`

interface ArrowProps {
  animate: number
  wide?: boolean
}
