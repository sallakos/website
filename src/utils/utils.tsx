import React from 'react'

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

export interface BlockProps {
  children: Child[]
}

interface Child {
  _key: string
  text: string
}
