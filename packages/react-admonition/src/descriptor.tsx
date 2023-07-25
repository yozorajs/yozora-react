import React from 'react'
import {
  AdmonitionCautionIcon,
  AdmonitionDangerIcon,
  AdmonitionInfoIcon,
  AdmonitionNoteIcon,
  AdmonitionTipIcon,
} from './icons'

interface IAdmonitionDescriptor {
  modifier: string
  title: string
  icon: React.ReactElement
}

const descriptors = {
  note: {
    modifier: 'note',
    title: 'NOTE',
    icon: <AdmonitionNoteIcon />,
  },
  info: {
    modifier: 'info',
    title: 'INFO',
    icon: <AdmonitionInfoIcon />,
  },
  tip: {
    modifier: 'tip',
    title: 'TIP',
    icon: <AdmonitionTipIcon />,
  },
  caution: {
    modifier: 'caution',
    title: 'CAUTION',
    icon: <AdmonitionCautionIcon />,
  },
  danger: {
    modifier: 'danger',
    title: 'DANGER',
    icon: <AdmonitionDangerIcon />,
  },
} as const

export function getDescriptor(keyword = 'default'): IAdmonitionDescriptor {
  const modifier = keyword.trim().toLowerCase()
  switch (modifier) {
    case '':
    case 'default':
    case 'note':
      return descriptors.note
    case 'important':
    case 'info':
      return descriptors.info
    case 'success':
    case 'tip':
      return descriptors.tip
    case 'warning':
    case 'caution':
      return descriptors.caution
    case 'error':
    case 'danger':
      return descriptors.danger
    default:
      return {
        modifier,
        title: modifier.toUpperCase(),
        icon: <React.Fragment />,
      }
  }
}
