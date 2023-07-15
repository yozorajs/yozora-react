import React from 'react'
import {
  YozoraAdmonitionCautionIcon,
  YozoraAdmonitionDangerIcon,
  YozoraAdmonitionInfoIcon,
  YozoraAdmonitionNoteIcon,
  YozoraAdmonitionTipIcon,
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
    icon: <YozoraAdmonitionNoteIcon />,
  },
  info: {
    modifier: 'info',
    title: 'INFO',
    icon: <YozoraAdmonitionInfoIcon />,
  },
  tip: {
    modifier: 'tip',
    title: 'TIP',
    icon: <YozoraAdmonitionTipIcon />,
  },
  caution: {
    modifier: 'caution',
    title: 'CAUTION',
    icon: <YozoraAdmonitionCautionIcon />,
  },
  danger: {
    modifier: 'danger',
    title: 'DANGER',
    icon: <YozoraAdmonitionDangerIcon />,
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
