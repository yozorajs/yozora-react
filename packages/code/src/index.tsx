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


/**
 * Render `code` content
 *
 * @param props
 */
export const Code = React.forwardRef<HTMLDivElement, CodeProps>(
  (props, forwardRef): React.ReactElement => {
    const { lang, value, ...htmlProps } = props
    const [lineCount, setLineCount] = useState<number>(0)
    const linenoWidth = `${ Math.max(2, ('' + lineCount).length) + 0.5 }em`

    return (
      <Container { ...htmlProps } ref={ forwardRef }>
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


Code.propTypes = {
  value: PropTypes.string.isRequired,
  lang: PropTypes.string,
}


Code.displayName = 'YozoraCode'
export default Code


const Container = styled.div`
  padding: ${ getCodeStyle('padding') };
  border: ${ getCodeStyle('border') };
  margin: ${ getCodeStyle('margin') };
  background: ${ getCodeStyle('background') };
  font-family: ${ getCodeStyle('fontFamily') };
  line-height: ${ getCodeStyle('lineHeight') };
  pre {
    line-height: inherit;
    font-family: ${ getCodeStyle('fontFamily') };
    code, span {
      line-height: inherit;
    }
    code {
      background: transparent;
      margin: 0;
      padding: 0;
    }
    ::selection {
      background: ${ getCodeStyle('selectionBackground') };
    }
  }
`


Container.defaultProps = {
  theme: { yozora: { code: defaultCodeTheme } }
}


export const CodeClasses = {
  container: `${ Container }`,
}
