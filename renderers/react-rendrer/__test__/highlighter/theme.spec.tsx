import { render } from '@testing-library/react'
import React from 'react'
import { CodeHighlighter, ThemeProvider } from '../../src'

test('highlighting follows named variants through a PureComponent boundary', () => {
  const code = <CodeHighlighter lang="typescript" value={'const value = "hello"'} />
  const view = render(
    <ThemeProvider theme="catppuccin" variant="mocha">
      {code}
    </ThemeProvider>,
  )
  expect(view.container.querySelector('.token.keyword')).toHaveStyle({ color: '#CBA6F7' })
  expect(view.container.querySelector('.token.string')).toHaveStyle({ color: '#A6E3A1' })
  view.rerender(
    <ThemeProvider theme="catppuccin" variant="latte">
      {code}
    </ThemeProvider>,
  )
  expect(view.container.querySelector('.token.keyword')).toHaveStyle({ color: '#8839EF' })
  expect(view.container.querySelector('.token.string')).toHaveStyle({ color: '#40A02B' })
  view.rerender(
    <ThemeProvider theme="vsc" variant="dark-modern">
      {code}
    </ThemeProvider>,
  )
  expect(view.container.querySelector('.token.keyword')).toHaveStyle({ color: '#569CD6' })
})

test('explicit highlighter options override the provider and standalone defaults stay dark', () => {
  const view = render(<CodeHighlighter lang="typescript" value="const x = 1" />)
  expect(view.container.querySelector('.token.keyword')).toHaveStyle({ color: '#569CD6' })
  view.rerender(
    <ThemeProvider theme="catppuccin" variant="mocha">
      <CodeHighlighter lang="typescript" value="const x = 1" darken={false} />
    </ThemeProvider>,
  )
  expect(view.container.querySelector('.token.keyword')).toHaveStyle({ color: '#0000ff' })
  view.rerender(
    <ThemeProvider theme="catppuccin" variant="mocha">
      <CodeHighlighter
        lang="typescript"
        value="const x = 1"
        darken={false}
        theme={{ plain: {}, styles: [{ types: ['keyword'], style: { color: '#ff00ff' } }] }}
      />
    </ThemeProvider>,
  )
  expect(view.container.querySelector('.token.keyword')).toHaveStyle({ color: '#ff00ff' })
})

test('a provider without theme props uses the modern light palette', () => {
  const view = render(
    <ThemeProvider>
      <CodeHighlighter lang="typescript" value="const x = 1" />
    </ThemeProvider>,
  )
  expect(view.container.querySelector('.token.keyword')).toHaveStyle({ color: '#0000FF' })
})
