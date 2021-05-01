import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { blocksToParagraphs, scaleValue } from '../utils/utils'
import { useScrollPosition } from '../utils/scrollPosition'
import { useWindowWidth } from '../utils/windowSize'

import { Block, PageData, GalleryData } from '../templates/Page'
import Gallery from '../components/Gallery'
import { ContactLink } from '../components/ContactLink'
import { QMark } from '../components/QMark'

interface BlocksProps {
  page: PageData
  gallery: GalleryData
  breakpoints: {
    smallMobileBreakpoint: number
    mobileBreakpoint: number
    tabletBreakpoint: number
  }
}

export const Blocks = ({ page, gallery, breakpoints }: BlocksProps) => {
  const width = useWindowWidth()
  const scrollPosition = useScrollPosition()

  const isDesktop = width >= breakpoints.tabletBreakpoint

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
  }, [])

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
    <>
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
            scale={isDesktop ? scale : null}
          />
          <ContactLink
            href="https://www.linkedin.com/in/sallakos"
            icon={faLinkedin}
            scale={isDesktop ? 2 - scale : null}
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
    </>
  )
}

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
