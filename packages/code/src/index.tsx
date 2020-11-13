import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import CodeHighlighter from '@yozora/react-code-highlighter'
import './styled-components'
import { defaultCodeTheme, getCodeStyle } from './theme'
export * from './theme'


/**
 * Props for Code
 */
export interface CodeProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Source code contents
   */
  value: string
  /**
   * Code language
   */
  lang?: string
}


const Container = styled.div`
  padding: ${ getCodeStyle('padding') };
  border: ${ getCodeStyle('border') };
  margin: ${ getCodeStyle('margin') };
  background: ${ getCodeStyle('background') };
`


Container.defaultProps = {
  theme: { yozora: { code: defaultCodeTheme } }
}


/**
 * Render `code` content
 *
 * @param props
 */
export const Code = React.forwardRef<HTMLDivElement, CodeProps>(
  (props, forwardRef): React.ReactElement => {
    const { lang, value, ...divProps } = props
    const [lineCount, setLineCount] = useState<number>(0)
    const linenoWidth = `${ Math.max(2, ('' + lineCount).length) + 0.5 }em`

    return (
      <Container { ...divProps } ref={ forwardRef }>
        <pre>
          <CodeHighlighter
            lang={ lang }
            value={ value }
            linenoWidth={ linenoWidth }
            onLineCountChange={ setLineCount }
          />
        </pre>
      </Container>
    )
  }
)


Code.displayName = 'Code'


Code.propTypes = {
  value: PropTypes.string.isRequired,
  lang: PropTypes.string,
}


export default Code
