import { CommonTokenNames, TokenNames } from '@yozora/core-react-constant'
import PropTypes from 'prop-types'
import React from 'react'
import { TexLang } from './types'

interface IStyles {
  readonly error: React.CSSProperties
  readonly errorDetails: React.CSSProperties
  readonly meta: React.CSSProperties
  readonly source: React.CSSProperties
}

interface IProps {
  /**
   * Formula language.
   */
  readonly lang: TexLang
  /**
   * The literal formula string.
   */
  readonly formula: string
  /**
   * Whether to render the formulas in inline mode.
   */
  readonly inline: boolean
  /**
   * Mathjax render settings.
   */
  readonly error: string
}

const vars = {
  border: `1px solid var(${TokenNames.colorBorderError}, red)`,
  errorColor: `var(${TokenNames.colorBorderError}, red)`,
  metaColor: `var(${TokenNames.colorCodeTitle}, '#333')`,
  sourceColor: `var(${TokenNames.colorMath}, 'blue')`,
  fontFamilyCode: `var(${CommonTokenNames.fontFamilyCode}, Consolas, 'Source Code Pro', 'Roboto Mono', monospace, sans-serif)`,
  fontSizeCode: `var(${CommonTokenNames.fontSizeCode}, 1rem)`,
}

const styles: IStyles = {
  error: {
    display: 'block',
    width: '100%',
    height: '100%',
    color: vars.errorColor,
    fontFamily: vars.fontFamilyCode,
    fontWeight: 'normal',
    fontSize: '16px',
    border: vars.border,
  },
  errorDetails: {
    display: 'block',
    width: '100%',
    minHeight: '100%',
    padding: '0.5rem',
    background: 'transparent',
    whiteSpace: 'pre-wrap',
    textAlign: 'left',
  },
  meta: {
    padding: 8,
    margin: 0,
    color: vars.metaColor,
  },
  source: {
    overflow: 'auto',
    padding: 8,
    margin: 0,
    color: vars.sourceColor,
    fontFamily: vars.fontFamilyCode,
    fontSize: vars.fontSizeCode,
  },
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
        <span style={styles.error}>
          <span style={styles.errorDetails}>{error}</span>
          <span style={styles.meta}>
            [lang: {lang}, inline: {String(inline)}]
          </span>
          <code style={styles.source}>{formula}</code>
        </span>
      )
    }

    return (
      <div style={styles.error}>
        <div style={styles.errorDetails}>{error}</div>
        <div style={styles.meta}>
          [lang: {lang}, inline: {String(inline)}]
        </div>
        <pre style={styles.source}>{formula}</pre>
      </div>
    )
  }
}
