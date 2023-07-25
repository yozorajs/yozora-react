import { cx } from '@emotion/css'
import PropTypes from 'prop-types'
import React from 'react'
import { classes } from '../style'
import { areSameArray } from '../util/misc'

interface IProps {
  countOfLines: number
  highlightLinenos: number[] | undefined
}

export class HighlightLinenos extends React.Component<IProps> {
  public static readonly displayName = 'HighlightLinenos'
  public static readonly propTypes = {
    countOfLines: PropTypes.number.isRequired,
    highlightLinenos: PropTypes.array,
  }

  public override shouldComponentUpdate(nextProps: Readonly<IProps>): boolean {
    const props = this.props
    return (
      props.countOfLines !== nextProps.countOfLines ||
      !areSameArray(props.highlightLinenos, nextProps.highlightLinenos)
    )
  }

  public override render(): React.ReactElement {
    const { countOfLines, highlightLinenos = [] } = this.props
    const lines: React.ReactElement[] = []
    for (let lineno = 0; lineno < countOfLines; ++lineno) {
      const isHighlight = highlightLinenos.includes(lineno + 1)
      const line = (
        <div
          key={lineno}
          className={cx(classes.line, classes.linenoLine, isHighlight && classes.highlightLine)}
        >
          <span key={lineno}>{lineno + 1}</span>
        </div>
      )
      lines.push(line)
    }
    return <React.Fragment>{lines}</React.Fragment>
  }
}
