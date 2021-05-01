import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql, useStaticQuery } from 'gatsby'

export const SEO = () => {
  const query = graphql`
    query {
      allSanityGallery {
        nodes {
          images {
            metaImage
            asset {
              url
            }
          }
        }
      }
    }
  `

  const data: QueryResult = useStaticQuery(query)

  const metaImageUrl = data.allSanityGallery.nodes[0].images.filter(
    (image) => image.metaImage
  )[0].asset.url

  const title = 'Salla Koskinen'
  const description =
    'Data-addikti ja krooninen matkakuumeilija, jonka intohimon kohteita ovat liikunta, tekniset härpäkkeet, excelöinti ja sarjojen tykittäminen Netflixistä.'

  return (
    <Helmet>
      <html lang="fi" />
      <title>{title}</title>
      <link href="https://sallakoskinen.fi" rel="canonical" />
      <meta name="description" content={description} />
      <meta name="image" content={metaImageUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={metaImageUrl} />
      <meta property="og:site_name" content={title} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={metaImageUrl} />
      <meta name="robots" content="noindex" />
    </Helmet>
  )
}

interface QueryResult {
  allSanityGallery: {
    nodes: ImageNode[]
  }
}

interface ImageNode {
  images: ImageProps[]
}

interface ImageProps {
  metaImage: boolean
  asset: {
    url: string
  }
}
