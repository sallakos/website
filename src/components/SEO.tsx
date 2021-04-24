import React from 'react'
import { Helmet } from 'react-helmet'

export const SEO = () => (
  <Helmet>
    <html lang="fi" />
    <title>Salla Koskinen</title>
    <meta
      name="description"
      content="Data-addikti ja krooninen matkakuumeilija, jonka intohimon kohteita ovat liikunta, tekniset härpäkkeet, excelöinti ja sarjojen tykittäminen Netflixistä."
    />
    <meta name="robots" content="noindex" />
  </Helmet>
)
