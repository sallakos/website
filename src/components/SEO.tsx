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

  return (
    <Helmet>
      <html lang="fi" />
      <title>Salla Koskinen</title>
      <meta
        name="description"
        content="Data-addikti ja krooninen matkakuumeilija, jonka intohimon kohteita ovat liikunta, tekniset härpäkkeet, excelöinti ja sarjojen tykittäminen Netflixistä."
      />
      <meta name="image" content={metaImageUrl} />
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
