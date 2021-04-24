import { IconDefinition } from '@fortawesome/fontawesome-common-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import styled, { useTheme } from 'styled-components'

export const ContactLink = ({ href, icon, scale }: ContactLinkProps) => (
  <a href={href}>
    <FontAwesomeIcon
      icon={icon}
      size="5x"
      style={{ transform: `scale(${scale})` }}
    />
  </a>
)

interface ContactLinkProps {
  href: string
  icon: IconDefinition
  scale: number
}
