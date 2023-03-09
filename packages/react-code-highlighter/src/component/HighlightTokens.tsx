import { cx } from '@emotion/css'
import PropTypes from 'prop-types'
import React from 'react'
import { classes } from '../style'
import type {
  ILineInputProps,
  ILineOutputProps,
  IToken,
  ITokenInputProps,
  ITokenOutputProps,
} from '../types/prism'
import { areSameArray } from '../util/misc'

export interface IHighlightTokensProps {
  tokens: IToken[][]
  highlightLinenos: number[] | undefined
  getLineProps(input: ILineInputProps): ILineOutputProps
  getTokenProps(input: ITokenInputProps): ITokenOutputProps
}

export class HighlightTokens extends React.Component<IHighlightTokensProps> {
  public static propTypes = {
    tokens: PropTypes.array.isRequired,
    highlightLinenos: PropTypes.array,
    getLineProps: PropTypes.func.isRequired,
    getTokenProps: PropTypes.func.isRequired,
  }

  public override render(): React.ReactElement {
    const { tokens, highlightLinenos = [], getLineProps, getTokenProps } = this.props
    return (
      <React.Fragment>
        {tokens.map((line, lineNo) => {
          const isHighlight = highlightLinenos.includes(lineNo + 1)
          const lineProps = getLineProps({ line })
          return (
            <div
              {...lineProps}
              key={lineNo}
              className={cx(
                classes.line,
                classes.codeLine,
                { [classes.highlightLine]: isHighlight },
                lineProps.className,
              )}
            >
              {line.map((token, key) => (
                <span {...getTokenProps({ token })} key={key} />
              ))}
            </div>
          )
        })}
      </React.Fragment>
    )
  }

  public override shouldComponentUpdate(nextProps: Readonly<IHighlightTokensProps>): boolean {
    const props = this.props
    return (
      props.getLineProps !== nextProps.getLineProps ||
      props.getTokenProps !== nextProps.getTokenProps ||
      !areSameArray(props.tokens, nextProps.tokens) ||
      !areSameArray(props.highlightLinenos, nextProps.highlightLinenos)
    )
  }
}
