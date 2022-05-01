import { css, cx } from '@emotion/css'
import type { FootnoteDefinition } from '@yozora/ast'
import { useNodeRendererContext } from '@yozora/core-react-renderer'
import { useThemeContext } from '@yozora/core-react-theme'
import React from 'react'
import { FootnoteDefinitionRenderer } from './renderer/footnoteDefinition'

export interface IFootnoteDefinitionsProps {
  /**
   * Title of the footnote definitions.
   */
  footnoteDefinitionsTitle?: React.ReactNode
  /**
   * If true, then the footnote definitions wont be render.
   */
  dontNeedFootnoteDefinitions?: boolean
}

export const FootnoteDefinitions: React.FC<IFootnoteDefinitionsProps> = props => {
  const { footnoteDefinitionsTitle, dontNeedFootnoteDefinitions = false } = props
  const { footnoteDefinitionMap } = useNodeRendererContext()
  const classes = useStyles()

  const children = React.useMemo<React.ReactNode>(() => {
    // Get all of footnote reference definitions.
    const footnoteDefinitions: ReadonlyArray<FootnoteDefinition> =
      Object.values(footnoteDefinitionMap)
    if (footnoteDefinitions.length <= 0) return null

    return footnoteDefinitions.map(item => (
      <li key={item.identifier} id={item.identifier}>
        <FootnoteDefinitionRenderer {...item} />
      </li>
    ))
  }, [footnoteDefinitionMap])

  if (dontNeedFootnoteDefinitions || children === null) return null

  return (
    <div className={cx('yozora-footnote-definitions', classes.container)}>
      <div className={classes.title}>{footnoteDefinitionsTitle}</div>
      <ul className={classes.main}>{children}</ul>
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useStyles = () => {
  const { themeStyle } = useThemeContext()
  const { colors } = themeStyle
  return {
    container: css({
      marginTop: '2rem',
      fontSize: '0.8rem',
    }),
    title: css({
      padding: 0,
      borderBottom: `1px solid ${colors.border.heading}`,
      margin: '0 0 1rem',
      fontStyle: 'italic',
    }),
    main: css({
      padding: 0,
      margin: 0,
      listStyle: 'none',
    }),
  }
}
