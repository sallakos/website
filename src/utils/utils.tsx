import React from 'react'
import { useScrollPosition } from './scrollPosition'

export const blocksToText = (blocks: BlockProps[]) => {
  return blocks.map((block: BlockProps) =>
    block.children.map((child: Child) => child.text).join('')
  )
}

export const blocksToParagraphs = (blocks: BlockProps[]) => {
  return blocks.map((block: BlockProps) =>
    block.children.map((child: Child) => <p key={child._key}>{child.text}</p>)
  )
}

export const scaleValue = (
  start: number,
  length: number,
  scrollPosition: number
) => {
  return parseFloat(
    Math.min(Math.max(0, (scrollPosition - start) / length), 1).toFixed(2)
  )
}

export interface BlockProps {
  children: Child[]
}

interface Child {
  _key: string
  text: string
}
