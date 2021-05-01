import React from 'react'
import { IconDefinition } from '@fortawesome/fontawesome-common-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const ContactLink = ({ href, icon, scale, label }: ContactLinkProps) => (
  <a href={href} aria-label={label}>
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
  label: string
  scale?: number
  tranlate?: number
}
