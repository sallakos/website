import React, { useEffect, useRef, useState } from 'react'
import { graphql } from 'gatsby'
import styled, { ThemeProvider, useTheme } from 'styled-components'
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { blocksToParagraphs, BlockProps } from '../utils/utils'
import { useScrollPosition } from '../utils/scrollPosition'
import { useWindowWidth } from '../utils/windowSize'

import Gallery from '../components/Gallery'
import { SEO } from '../components/SEO'

import { websiteTheme } from '../assets/theme'
import '../assets/style.css'
import { GlobalStyle } from '../assets/style'
import BackgroundImage from '../images/meshGradient.png'
import { ContactLink } from '../components/ContactLink'

export default function Page({ data }: Props) {
  const page = data.sanityPage
  const gallery = data.sanityGallery

  const theme = useTheme()
  const width = useWindowWidth()
  const scrollPosition = useScrollPosition()

  const titleRef = useRef<HTMLHeadingElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)

  const [scaleStart, setScaleStart] = useState(0)
  const [scaleLength, setScaleLength] = useState(0)
  const [positionLength, setPositionLength] = useState(0)
  const [qMarkStart, setQMarkStart] = useState(0)
  const [qMarkLength, setQMarkLength] = useState(0)

  useEffect(() => {
    setScaleStart(linksRef.current.offsetTop)
    setScaleLength(
      introRef.current.offsetTop +
        introRef.current.offsetHeight -
        linksRef.current.offsetTop -
        50
    )
    setPositionLength(titleRef.current.offsetTop)
    setQMarkStart(introRef.current.offsetTop)
    setQMarkLength((window.innerHeight / 4) * 3)
  })

  const scale = parseFloat(
    Math.min(
      Math.max(0, (scrollPosition?.bottom - scaleStart) / scaleLength),
      1
    ).toFixed(2)
  )

  const qMarkPosition = parseFloat(
    Math.min(
      Math.max(0, (scrollPosition?.bottom - qMarkStart) / qMarkLength),
      1
    ).toFixed(2)
  )

  return (
    <ThemeProvider theme={websiteTheme}>
      <SEO />
      <GlobalStyle />
      <BGWrap>
        <FirstBlock>
          <div>
            <h1 ref={titleRef}>{page.title}</h1>
            <Description>{page.description}</Description>
          </div>
          <ImageContainer>
            <GatsbyImage
              image={page.mainImage.asset.gatsbyImageData}
              alt=""
              imgClassName="mainImg"
            />
          </ImageContainer>
        </FirstBlock>
        <Block ref={introRef}>
          <h2>
            Kuka
            <span
              style={{
                display: 'inline-block',
                transform: `translateY(-${(1 - qMarkPosition) * 50}px)`,
              }}
            >
              ?
            </span>{' '}
            Mitä
            <span
              style={{
                display: 'inline-block',
                transform: `rotate(${(1 - qMarkPosition) * 90}deg) translateX(${
                  (1 - qMarkPosition) * 20
                }px) translateY(-${(1 - qMarkPosition) * 20}px)`,
              }}
            >
              ?
            </span>
          </h2>
          <div>{blocksToParagraphs(page.introduction)}</div>
          <Links ref={linksRef}>
            <ContactLink
              href="https://github.com/sallakos"
              icon={faGithub}
              scale={
                width >= websiteTheme.breakpoints.tabletBreakpoint
                  ? scale
                  : null
              }
            />
            <ContactLink
              href="https://www.linkedin.com/in/sallakos"
              icon={faLinkedin}
              scale={
                width >= websiteTheme.breakpoints.tabletBreakpoint
                  ? 2 - scale
                  : null
              }
            />
          </Links>
        </Block>
        <Block ref={galleryRef}>
          <GalleryTitle>{gallery.title}</GalleryTitle>
          <Gallery images={gallery.images} block={galleryRef} />
        </Block>
      </BGWrap>
    </ThemeProvider>
  )
}

const BGWrap = styled.div`
  width: 100vw;
  overflow-x: hidden;
  background: url(${BackgroundImage});
  background-color: #adffdc;
  background-size: cover;
  background-position: center top;
  background-attachment: scroll;
`

const Block = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
  text-align: center;

  @media (min-width: ${(props) => props.theme.breakpoints.mobileBreakpoint}px) {
    padding: 50px;
  }
  @media (min-width: ${(props) => props.theme.breakpoints.tabletBreakpoint}px) {
    padding: 100px;
  }
`

const Description = styled.div`
  font-family: 'Architects Daughter';
`

const FirstBlock = styled(Block)`
  > div {
    flex: 0 0 auto;
  }
  .mainImg {
    border-radius: 50%;
  }
  @media (min-width: ${(props) => props.theme.breakpoints.mobileBreakpoint}px) {
    flex-direction: row;
    > div {
      flex: 1 1 50%;
    }
  }

  h1 {
    animation: slideFromTopMobile 1s ease-in-out;
  }
  @media (min-width: ${(props) => props.theme.breakpoints.tabletBreakpoint}px) {
    h1 {
      animation: slideFromTop 1.5s ease-in-out;
    }
  }

  ${Description} {
    animation: slideFromRight 1.5s ease-out;
    @media (min-width: ${(props) =>
        props.theme.breakpoints.tabletBreakpoint}px) {
      animation: slideFromBottom 2s ease-out;
    }
  }
`

const ImageContainer = styled.div`
  margin-top: 30px;
  animation: slideFromBottom 2s;
  @media (min-width: ${(props) => props.theme.breakpoints.tabletBreakpoint}px) {
    animation: slideFromRight 2s ease-out;
  }
`

const Links = styled.div`
  margin-top: 30px;
  a:last-of-type {
    margin-left: 30px;
  }
`

const GalleryTitle = styled.h2`
  margin-bottom: 2em;
  font-family: 'Covered By Your Grace', serif;
`

interface Props {
  data: {
    sanityPage: PageData
    sanityGallery: GalleryData
  }
}

interface PageData {
  title: string
  description: string
  mainImage: {
    asset: {
      gatsbyImageData: IGatsbyImageData
    }
  }
  introduction: BlockProps[]
}

interface GalleryData {
  title: string
  images: Image[]
}

export interface Image {
  _key: string
  asset: {
    gatsbyImageData: IGatsbyImageData
  }
  caption: string
}

export const query = graphql`
  query Page($id: String) {
    sanityPage(id: { eq: $id }) {
      title
      description
      mainImage {
        asset {
          gatsbyImageData(
            placeholder: BLURRED
            layout: CONSTRAINED
            height: 300
            aspectRatio: 1
          )
        }
      }
      introduction {
        children {
          _key
          text
        }
      }
    }
    sanityGallery(title: { eq: "Välähdyksiä." }) {
      title
      images {
        _key
        asset {
          gatsbyImageData(
            placeholder: BLURRED
            layout: CONSTRAINED
            height: 500
            width: 500
          )
        }
        caption
      }
    }
  }
`
