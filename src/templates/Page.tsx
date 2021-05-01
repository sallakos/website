import React from 'react'
import { graphql } from 'gatsby'
import styled, { ThemeProvider } from 'styled-components'
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'
import { BgImage } from 'gbimage-bridge'
import { BlockProps } from '../utils/utils'
import { useWindowWidth } from '../utils/windowSize'

import { SEO } from '../components/SEO'

import { websiteTheme } from '../assets/theme'
import '../assets/style.css'
import { GlobalStyle } from '../assets/style'
import { Heading } from '../components/Heading'
import { Blocks } from '../components/Blocks'

export default function Page({ data }: Props) {
  const page = data.sanityPage
  const gallery = data.sanityGallery
  const bgImage = data.bgImage
  const mobileBgImage = data.mobileBgImage

  const width = useWindowWidth()
  const isDesktop = width >= websiteTheme.breakpoints.tabletBreakpoint

  const desktopBg = bgImage?.childImageSharp?.gatsbyImageData
  const mobileBg = mobileBgImage?.childImageSharp?.gatsbyImageData

  const bg = isDesktop ? desktopBg : mobileBg

  return (
    <ThemeProvider theme={websiteTheme}>
      <SEO />
      {console.log('render')}
      <GlobalStyle />
      <BgImage
        image={bg}
        style={{ backgroundPosition: isDesktop ? 'center top' : '40% top' }}
      >
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
          <Blocks
            page={page}
            gallery={gallery}
            breakpoints={websiteTheme.breakpoints}
          />
        </BGWrap>
      </BgImage>
    </ThemeProvider>
  )
}

export const BGWrap = styled.div`
  width: 100vw;
  overflow-x: hidden;
  min-height: 100vh;
`

export const Block = styled.div`
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

interface Props {
  data: {
    sanityPage: PageData
    sanityGallery: GalleryData
    bgImage: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData
      }
    }
    mobileBgImage: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData
      }
    }
  }
}

export interface PageData {
  title: string
  description: string
  mainImage: {
    asset: {
      gatsbyImageData: IGatsbyImageData
    }
  }
  introduction: BlockProps[]
}

export interface GalleryData {
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
    bgImage: file(name: { eq: "meshDesk" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 100)
      }
    }
    mobileBgImage: file(name: { eq: "meshMob" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 100)
      }
    }
  }
`
