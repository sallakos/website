import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql, useStaticQuery } from 'gatsby'

export const SEO = () => {
  const query = graphql`
    query {
      allSanityImageAsset {
        nodes {
          originalFilename
          url
        }
      }
    }
  `

  const data: QueryResult = useStaticQuery(query)

  const metaImageUrl = data.allSanityImageAsset.nodes.filter(
    (image) => image.originalFilename === 'sallakoskinen.png'
  )[0].url

  const title = 'Salla Koskinen'
  const description =
    'Data-addikti ja krooninen matkakuumeilija, jonka intohimon kohteita ovat liikunta, tekniset härpäkkeet, excelöinti ja sarjojen tykittäminen Netflixistä.'
  const shortDescription = 'Data-addikti ja krooninen matkakuumeilija.'

  return (
    <Helmet defaultTitle={title}>
      <html lang="fi" />
      <title>{title}</title>
      <link href="https://sallakoskinen.fi" rel="canonical" />
      <meta name="description" content={description} />
      <meta name="image" content={metaImageUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:description" content={shortDescription} />
      <meta property="og:url" content="https://sallakoskinen.fi" />
      <meta property="og:image" content={metaImageUrl} />
      <meta property="og:site_name" content={title} />
      <meta property="og:locale" content="fi_FI" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={metaImageUrl} />
    </Helmet>
  )
}

interface QueryResult {
  allSanityImageAsset: {
    nodes: ImageNode[]
  }
}

interface ImageNode {
  originalFilename: string
  url: string
}
