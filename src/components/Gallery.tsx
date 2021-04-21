import React from 'react'
import styled, { useTheme } from 'styled-components'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import { Image } from '../templates/Page'
import { useWindowSize } from '../utils/windowSize'

interface GalleryProps {
  images: Image[]
}

export default function Gallery({ images }: GalleryProps) {
  const windowSize = useWindowSize()

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

  const maxImgHeight = (height - 2 * padding - 150) / rows
  const maxImgWidth = (width - 2 * padding) / columns

  const maxImgSize = Math.min(maxImgWidth, maxImgHeight)

  return (
    <GalleryGrid width={maxImgSize} rows={rows} columns={columns}>
      {images.map((image) => (
        <GalleryItem key={image._key}>
          <GatsbyImage image={image.asset.gatsbyImageData} alt="" />
          <Caption>{image.caption}</Caption>
        </GalleryItem>
      ))}
      <IGItem>
        <a href="https://www.instagram.com/martinelamaa">
          <AbsoluteImageContainer>
            <StaticImage
              src="../images/doggo.png"
              alt=""
              placeholder="blurred"
            />
          </AbsoluteImageContainer>
          <ImageContainer>
            <StaticImage
              src="../images/igGlyph.png"
              alt=""
              placeholder="blurred"
            />
          </ImageContainer>
          <IGText>@martinelamaa</IGText>
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
  bottom: 0;
  padding: 10px;
  background-color: #00000091;
  width: 100%;
  color: white;
  display: none;
`

const GalleryItem = styled.div`
  position: relative;
  :hover {
    ${Caption} {
      display: block;
    }
  }
`

const IGItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  padding-bottom: 10px;
  grid-column: 2;
  grid-row: 2;

  @media (min-width: ${(props) => props.theme.breakpoints.tabletBreakpoint}px) {
    grid-column: 3;
    grid-row: 1;
  }

  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    position: relative;
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
  top: -53%;
  left: 16%;
  right: 26%;

  @media (min-width: ${(props) => props.theme.breakpoints.tabletBreakpoint}px) {
    top: -34%;
    left: 7%;
    right: 37%;
  }
`

const IGText = styled.div`
  font-family: 'Neucha', sans-serif;
  font-size: 1.5em;
  margin-top: 5px;
`
