import React, { useEffect, useRef, useState } from 'react'
import { graphql } from 'gatsby'
import styled, { ThemeProvider } from 'styled-components'
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { blocksToParagraphs, BlockProps } from '../utils/utils'
import { useScrollPosition } from '../utils/scrollPosition'

import Gallery from '../components/Gallery'
import { SEO } from '../components/SEO'

import { websiteTheme } from '../assets/theme'
import '../assets/fonts.css'
import { GlobalStyle } from '../assets/style'
import BackgroundImage from '../images/meshGradient.png'
import { useWindowSize } from '../utils/windowSize'
import { ContactLink } from '../components/ContactLink'

export default function Page({ data }: Props) {
  const page = data.sanityPage
  const gallery = data.sanityGallery

  const windowSize = useWindowSize()
  const scrollPosition = useScrollPosition()

  const titleRef = useRef<HTMLHeadingElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)

  const [scaleStart, setScaleStart] = useState(0)
  const [scaleLength, setScaleLength] = useState(0)
  const [positionLength, setPositionLength] = useState(0)

  useEffect(() => {
    setScaleStart(linksRef.current.offsetTop)
    setScaleLength(
      introRef.current.offsetTop +
        introRef.current.offsetHeight -
        linksRef.current.offsetTop -
        50
    )
    setPositionLength(titleRef.current.offsetTop)
  })

  const position = Math.round(
    Math.min(Math.max(0, scrollPosition?.top / positionLength), 1) * 50
  )

  const scale = parseFloat(
    Math.min(
      Math.max(0, (scrollPosition?.bottom - scaleStart) / scaleLength),
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
          <ImageContainer style={{ transform: `translateX(${position}vw)` }}>
            <GatsbyImage
              image={page.mainImage.asset.gatsbyImageData}
              alt=""
              imgClassName="mainImg"
            />
          </ImageContainer>
        </FirstBlock>
        <Block ref={introRef}>
          <h2>Kuka? Mitä?</h2>
          <div>{blocksToParagraphs(page.introduction)}</div>
          <Links ref={linksRef}>
            <ContactLink
              href="https://github.com/sallakos"
              icon={faGithub}
              scale={scale}
            />
            <ContactLink
              href="https://www.linkedin.com/in/sallakos"
              icon={faLinkedin}
              scale={2 - scale}
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
    animation: slideFromTop 1.5s ease-in-out;
  }

  ${Description} {
    animation: slideFromBottom 2s ease-out;
  }

  @keyframes slideFromTop {
    from {
      transform: translateY(-50vh);
    }

    to {
      transform: translateY(0%);
    }
  }
  @keyframes slideFromBottom {
    from {
      transform: translate3d(-50vw, 50vh, 0);
    }

    to {
      transform: translate3d(0, 0, 0);
    }
  }
`

const ImageContainer = styled.div`
  margin-top: 30px;
  animation: slideFromRight 2.5s;
  @keyframes slideFromRight {
    from {
      transform: translateX(100%);
    }

    to {
      transform: translateX(0%);
    }
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
