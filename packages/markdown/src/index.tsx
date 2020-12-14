import React from 'react'
import MathJax from 'react-mathjax'
import PropTypes from 'prop-types'
import styled, { DefaultTheme, ThemeProvider } from 'styled-components'
import MdastRenderer, { MdastRendererProps } from './ast/render'
import type { MdastPropsRoot } from './ast/types'
import { defaultTheme } from './theme'
export * from './ast/render'
export * from './ast/types'
export * from './theme'


/**
 * Props for Markdown
 */
interface MarkdownProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Markdown content
   */
  ast: MdastPropsRoot
  /**
   * Styled-components theme for @yozora/react-* components
   */
  theme?: DefaultTheme
  /**
   * Markdown renderer
   */
  render?: (props: MdastRendererProps) => React.ReactElement
}


const Container = styled.div`
  display: block;
  font-size: 1rem;
  line-height: 1.4;
  :last-child {
    margin-bottom: 0;
  }
`


/**
 *
 * @param props
 */
export const Markdown = React.forwardRef<HTMLDivElement, MarkdownProps>(
  (props, forwardRef): React.ReactElement => {
    const {
      ast,
      theme = defaultTheme,
      render: Markdown = MdastRenderer,
      ...htmlProps
    } = props
    return (
      <Container { ...htmlProps } ref={ forwardRef }>
        <ThemeProvider theme={ theme }>
          <MathJax.Provider>
            <Markdown ast={ ast } />
          </MathJax.Provider>
        </ThemeProvider>
      </Container>
    )
  }
)


Markdown.propTypes = {
  ast: PropTypes.any.isRequired,
  theme: PropTypes.any,
  render: PropTypes.oneOfType<any>([
    PropTypes.elementType,
    PropTypes.func,
  ]),
}


Markdown.displayName = 'Markdown'
export default Markdown


export const MarkdownClasses = {
  container: `${ Container }`,
}
