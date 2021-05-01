import { IGatsbyImageData } from 'gatsby-plugin-image'

declare module '*.svg' {
  const t: string
  export = t
}

declare module '*.png' {
  const t: string
  export = t
}

declare module '*.jpg' {
  const t: string
  export = t
}

declare module 'gbimage-bridge' {
  export interface IBgImageProps {
    image?: IGatsbyImageData
    style?: React.CSSProperties
  }
}
