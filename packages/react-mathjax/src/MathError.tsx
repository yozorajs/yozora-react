import { css } from '@emotion/css'
import { CommonTokenNames, TokenNames } from '@yozora/core-react-constant'
import PropTypes from 'prop-types'
import React from 'react'
import { TexLang } from './types'

interface IProps {
  /**
   * Formula language.
   */
  lang: TexLang
  /**
   * The literal formula string.
   */
  formula: string
  /**
   * Whether to render the formulas in inline mode.
   */
  inline: boolean
  /**
   * Mathjax render settings.
   */
  error: string
}

export class MathError extends React.PureComponent<IProps> {
  public static readonly displayName = 'MathError'
  public static readonly propTypes = {
    lang: PropTypes.oneOf([TexLang.MML, TexLang.TEX]).isRequired,
    formula: PropTypes.string.isRequired,
    inline: PropTypes.bool.isRequired,
    error: PropTypes.any.isRequired,
  }

  public override render(): React.ReactElement {
    const { lang, formula, inline, error } = this.props

    if (inline) {
      return (
        <span className={classes.error}>
          <span className={classes.errorDetails}>{error}</span>
          <span className={classes.meta}>
            [lang: {lang}, inline: {String(inline)}]
          </span>
          <code className={classes.source}>{formula}</code>
        </span>
      )
    }

    return (
      <div className={classes.error}>
        <div className={classes.errorDetails}>{error}</div>
        <div className={classes.meta}>
          [lang: {lang}, inline: {String(inline)}]
        </div>
        <pre className={classes.source}>{formula}</pre>
      </div>
    )
  }
}

const vars = {
  border: `1px solid var(${TokenNames.colorBorderError}, red)`,
  errorColor: `var(${TokenNames.colorBorderError}, red)`,
  metaColor: `var(${TokenNames.colorCodeTitle}, '#333')`,
  sourceColor: `var(${TokenNames.colorMath}, 'blue')`,
  fontFamilyCode: `var(${CommonTokenNames.fontFamilyCode}, Consolas, 'Source Code Pro', 'Roboto Mono', monospace, sans-serif)`,
  fontSizeCode: `var(${CommonTokenNames.fontSizeCode}, 1rem)`,
}

export const classes = {
  error: css({
    display: 'block',
    width: '100%',
    height: '100%',
    color: vars.errorColor,
    fontFamily: vars.fontFamilyCode,
    fontWeight: 'normal',
    fontSize: '16px',
    border: vars.border,
  }),
  errorDetails: css({
    display: 'block',
    width: '100%',
    minHeight: '100%',
    padding: '0.5rem',
    background: 'transparent',
    whiteSpace: 'pre-wrap',
    textAlign: 'left',
  }),
  meta: css({
    padding: 8,
    margin: 0,
    color: vars.metaColor,
  }),
  source: css({
    overflow: 'auto',
    padding: 8,
    margin: 0,
    color: vars.sourceColor,
    fontFamily: vars.fontFamilyCode,
    fontSize: vars.fontSizeCode,
  }),
}
