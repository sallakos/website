import React from 'react'
import { graphql } from 'gatsby'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'
import { Helmet } from 'react-helmet'
import { blocksToParagraphs, BlockProps } from '../utils/utils'
import Gallery from '../components/Gallery'
import BackgroundImage from '../images/meshGradient.png'
import { websiteTheme } from '../utils/theme'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'

import '../assets/index.css'
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

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    font-family: 'Open Sans', sans-serif;
  }
  h1, h2, h3 {
    font-family: 'Mansalva', serif; 
  }
  h1 {
    font-size: 3em;
  }
  h2 {
    font-size: 2em;
  }
  a {
    color: inherit;
    text-decoration: none;
    transition: color 250ms ease-in-out;
  }
  a:hover,
  a:focus {
    color: #063e3b;
  }
`

export default function Page({ data }: Props) {
  const page = data.sanityPage
  const gallery = data.sanityGallery

  return (
    <>
      <ThemeProvider theme={websiteTheme}>
        <>
          <Helmet>
            <html lang="fi" />
            <title>Salla Koskinen</title>
            <meta
              name="description"
              content="Data-addikti ja krooninen matkakuumeilija, jonka intohimon kohteita ovat liikunta, tekniset härpäkkeet, excelöinti ja sarjojen tykittäminen Netflixistä."
            />
            <meta name="robots" content="noindex" />
          </Helmet>
          <GlobalStyle />
          <Wrapper>
            <BGWrap>
              <FirstBlock>
                <div>
                  <h1>{page.title}</h1>
                  <div>{page.description}</div>
                </div>
                <ImageContainer>
                  <GatsbyImage
                    image={page.mainImage.asset.gatsbyImageData}
                    alt=""
                    imgClassName="mainImg"
                  />
                </ImageContainer>
              </FirstBlock>
              <Block>
                <h2>Kuka? Mitä?</h2>
                <div>{blocksToParagraphs(page.introduction)}</div>
                <Links>
                  <a href="https://github.com/sallakos">
                    <FontAwesomeIcon icon={faGithub} size="5x" />
                  </a>
                  <a href="https://www.linkedin.com/in/sallakos">
                    <FontAwesomeIcon icon={faLinkedin} size="5x" />
                  </a>
                </Links>
              </Block>
              <Block>
                <GalleryTitle>{gallery.title}</GalleryTitle>
                <Gallery images={gallery.images} />
              </Block>
            </BGWrap>
          </Wrapper>
        </>
      </ThemeProvider>
    </>
  )
}

const BGWrap = styled.div`
  background: url(${BackgroundImage});
  background-color: #adffdc;
  background-size: cover;
  background-position: center top;
  background-attachment: scroll;
`

const Wrapper = styled.div`
  width: 100%;
  // height: 100vh;
  // overflow-y: scroll;
  // scroll-snap-type: y mandatory;
`

const Block = styled.div`
  min-height: 100vh;
  // scroll-snap-align: center;
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
`

const ImageContainer = styled.div`
  margin-top: 30px;
`

const Links = styled.div``

const GalleryTitle = styled.h2`
  margin-bottom: 2em;
`

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
