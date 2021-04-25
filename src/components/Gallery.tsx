import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'

import { useWindowSize } from '../utils/windowSize'
import { useScrollPosition } from '../utils/scrollPosition'

import { Image } from '../templates/Page'
import { IGMore } from './IGMore'
import { Arrow } from './Arrow'
import { scaleValue } from '../utils/utils'

export default function Gallery({ images, block }: GalleryProps) {
  const windowSize = useWindowSize()
  const scrollPosition = useScrollPosition()

  const gallery = useRef<HTMLDivElement>(null)
  const igUser = useRef<HTMLDivElement>(null)

  const [opacityStart, setOpacityStart] = useState(0)
  const [opacityLength, setOpacityLength] = useState(0)

  useEffect(() => {
    setOpacityStart(gallery.current.offsetTop)
    setOpacityLength(
      (document.body.offsetHeight - gallery.current.offsetTop) / 2
    )
  })

  useEffect(() => {
    if (opacity(5) >= 1) {
      igUser.current.classList.add('animate')
    }
  })

  const width = windowSize?.width || 0
  const height = windowSize?.height || 0

  const theme = useTheme()
  const rows = width >= theme.breakpoints.tabletBreakpoint ? 2 : 3
  const columns = width >= theme.breakpoints.tabletBreakpoint ? 3 : 2
  const padding =
    width >= theme.breakpoints.tabletBreakpoint
      ? 100
      : width >= theme.breakpoints.mobileBreakpoint
      ? 50
      : 40

  const wideArrow = width >= theme.breakpoints.tabletBreakpoint ? true : false

  const maxImgHeight = (height - 2 * padding - 150) / rows
  const maxImgWidth = (width - 2 * padding) / columns

  const maxImgSize = Math.min(maxImgWidth, maxImgHeight)

  const opacity = (index: number) => {
    const offset = (index * opacityLength) / 5
    const value = scaleValue(
      opacityStart + offset,
      opacityLength,
      scrollPosition?.bottom
    )

    return isNaN(value) ? 0 : value
  }

  return (
    <GalleryGrid width={maxImgSize} rows={rows} columns={columns} ref={gallery}>
      {images.map((image, index) => (
        <GalleryItem key={image._key} opacity={opacity(index)}>
          <GatsbyImage image={image.asset.gatsbyImageData} alt="" />
          <Caption>{image.caption}</Caption>
        </GalleryItem>
      ))}
      <IGItem opacity={opacity(5)}>
        <a href="https://www.instagram.com/martinelamaa">
          <AbsoluteImageContainer>
            <Arrow animate={opacity(5)} wide={wideArrow} />
            <IGMore animate={opacity(5)} />
          </AbsoluteImageContainer>
          <ImageContainer>
            <StaticImage
              src="../images/igGlyph.png"
              alt=""
              placeholder="blurred"
              className="igImageContainer"
            />
          </ImageContainer>
          <IGText ref={igUser}>@martinelamaa</IGText>
        </a>
      </IGItem>
    </GalleryGrid>
  )
}

const GalleryGrid = styled.div<{
  width: number
  rows: number
  columns: number
}>`
  display: grid;
  grid-template-columns: ${(props) =>
    `repeat(${props.columns}, ${props.width}px)`};
  grid-template-rows: ${(props) => `repeat(${props.rows}, ${props.width}px)`};
`

const Caption = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  padding: 10px;
  background-color: #00000091;
  width: 100%;
  color: white;
  opacity: 0;
  transition: opacity 250ms ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Shadows Into Light Two';
`

const GalleryItem = styled.div.attrs((props: GalleryItemProps) => ({
  style: { opacity: props.opacity },
}))<GalleryItemProps>`
  position: relative;
  :hover {
    ${Caption} {
      opacity: 1;
    }
  }
`

const IGItem = styled.div.attrs((props: GalleryItemProps) => ({
  style: { opacity: props.opacity },
}))<GalleryItemProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  padding-bottom: 10px;

  grid-column: 2;
  grid-row: 1;

  @media (min-width: ${(props) =>
      props.theme.breakpoints.smallMobileBreakpoint}px) {
    grid-column: 2;
    grid-row: 2;
  }
  @media (min-width: ${(props) => props.theme.breakpoints.tabletBreakpoint}px) {
    grid-column: 3;
    grid-row: 1;
  }

  .igImageContainer {
    transform: scale(1);
    transition: transform 250ms ease-in-out;
  }

  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    position: relative;
  }

  a:hover .igImageContainer {
    transform: scale(1.02);
  }

  a:hover .arrow {
    stroke: #063e3b;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.tabletBreakpoint}px) {
    padding-bottom: 0;
    justify-content: center;
    a {
      justify-content: center;
    }
  }
`

const ImageContainer = styled.div`
  max-width: 40%;
  @media (min-width: ${(props) => props.theme.breakpoints.tabletBreakpoint}px) {
    max-width: 70%;
  }
`

const AbsoluteImageContainer = styled.div`
  position: absolute;
  overflow: visible;
  top: -42%;
  left: -75%;
  width: 200%;

  @media (min-width: ${(props) => props.theme.breakpoints.tabletBreakpoint}px) {
    top: -25%;
    left: -10%;
    width: 80%;
  }
`

const IGText = styled.div`
  font-family: 'Sue Ellen Francisco', sans-serif;
  font-size: 1.5em;
  line-height: 0.8;

  &.animate {
    animation: expandText 1s;
    animation-delay: 3s;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.tabletBreakpoint}px) {
    line-height: initial;
    font-size: 2em;
  }
`

interface GalleryProps {
  images: Image[]
  block: MutableRefObject<HTMLDivElement>
}

interface GalleryItemProps {
  opacity: number
}
