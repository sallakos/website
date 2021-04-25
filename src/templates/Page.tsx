import React, { useEffect, useRef, useState } from 'react'
import { graphql } from 'gatsby'
import styled, { ThemeProvider } from 'styled-components'
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { blocksToParagraphs, BlockProps, scaleValue } from '../utils/utils'
import { useScrollPosition } from '../utils/scrollPosition'
import { useWindowWidth } from '../utils/windowSize'

import Gallery from '../components/Gallery'
import { SEO } from '../components/SEO'

import { websiteTheme } from '../assets/theme'
import '../assets/style.css'
import { GlobalStyle } from '../assets/style'
import BackgroundImage from '../images/meshDesk.png'
import MobileBackgroundImage from '../images/meshMob.png'
import { ContactLink } from '../components/ContactLink'
import { Heading } from '../components/Heading'
import { QMark } from '../components/QMark'

export default function Page({ data }: Props) {
  const page = data.sanityPage
  const gallery = data.sanityGallery

  const width = useWindowWidth()
  const scrollPosition = useScrollPosition()

  const introRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)

  const [scaleStart, setScaleStart] = useState(0)
  const [scaleLength, setScaleLength] = useState(0)
  const [qMarkStart, setQMarkStart] = useState(0)
  const [dotStart, setDotStart] = useState(0)
  const [animationLength, setAnimationLength] = useState(0)

  useEffect(() => {
    setScaleStart(linksRef.current.offsetTop)
    setScaleLength(
      introRef.current.offsetTop +
        introRef.current.offsetHeight -
        linksRef.current.offsetTop -
        50
    )
    setQMarkStart(introRef.current.offsetTop)
    setDotStart(galleryRef.current.offsetTop)
    setAnimationLength((window.innerHeight / 4) * 3)
  })

  const scale = scaleValue(scaleStart, scaleLength, scrollPosition?.bottom)
  const qMarkPosition = scaleValue(
    qMarkStart,
    animationLength,
    scrollPosition?.bottom
  )
  const dotPosition = scaleValue(
    dotStart,
    animationLength,
    scrollPosition?.bottom
  )

  return (
    <ThemeProvider theme={websiteTheme}>
      <SEO />
      <GlobalStyle />
      <BGWrap>
        <FirstBlock>
          <div>
            <Heading />
            <Description>{page.description}</Description>
          </div>
          <ImageContainer>
            <GatsbyImage
              image={page.mainImage.asset.gatsbyImageData}
              alt=""
              style={{ borderRadius: '50%' }}
              imgClassName="mainImg"
            />
          </ImageContainer>
        </FirstBlock>
        <Block ref={introRef}>
          <h2>
            Kuka
            <QMark
              transform={`translateY(-${(1 - qMarkPosition) * 50}px)`}
            />{' '}
            Mitä
            <QMark
              transform={`rotate(${(1 - qMarkPosition) * 90}deg) translateX(${
                (1 - qMarkPosition) * 20
              }px) translateY(-${(1 - qMarkPosition) * 20}px)`}
            />
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
          <GalleryTitle>
            {gallery.title}
            <QMark transform={`translateY(-${(1 - dotPosition) * 50}px)`} dot />
          </GalleryTitle>
          <Gallery images={gallery.images} block={galleryRef} />
        </Block>
      </BGWrap>
    </ThemeProvider>
  )
}

const BGWrap = styled.div`
  width: 100vw;
  overflow-x: hidden;
  background-color: #95ffe9;
  background: linear-gradient(101deg, #94ffea 0%, #62c5ba 41%, #217a7c 57%);
  background: url(${MobileBackgroundImage});
  background-size: cover;
  background-position: 40% top;

  @media (min-width: ${(props) => props.theme.breakpoints.tabletBreakpoint}px) {
    background-color: #95ffe9;
    background: linear-gradient(101deg, #94ffea 0%, #62c5ba 41%, #217a7c 57%);
    background: url(${BackgroundImage});
    background-size: cover;
    background-position: center top;
  }
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

  ${Description} {
    animation: opacity 2s ease-in-out;
    @media (min-width: ${(props) =>
        props.theme.breakpoints.tabletBreakpoint}px) {
      animation: expand 2s ease-in-out;
    }
  }
`

const ImageContainer = styled.div`
  margin-top: 30px;
  animation: expandImage 2s ease-in-out, opacity 2.5s;
  @media (min-width: ${(props) => props.theme.breakpoints.tabletBreakpoint}px) {
    animation: rotate 2s ease-in-out;
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
    sanityGallery(title: { eq: "Välähdyksiä" }) {
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
