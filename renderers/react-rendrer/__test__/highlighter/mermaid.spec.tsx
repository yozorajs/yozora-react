import { render } from '@testing-library/react'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { CodeHighlighter, ThemeProvider } from '../../src'

test('Mermaid flowcharts highlight comments, labels and arrows with theme colors', () => {
  const value = '%% Overview\nflowchart LR\n  A[Markdown] -->|render| B{SVG}'
  const content = <CodeHighlighter lang="mermaid" value={value} />
  const view = render(
    <ThemeProvider theme="vsc" variant="dark-modern">
      {content}
    </ThemeProvider>,
  )
  expect(view.container.querySelector('.token.comment')).toHaveTextContent('%% Overview')
  expect(view.container.querySelector('.token.keyword')).toHaveTextContent('flowchart')
  expect(view.container.querySelector('.token.arrow.operator')).toHaveTextContent('-->')
  expect(view.container.querySelector('.token.label.property')).toHaveTextContent('|render|')
  expect(view.container.querySelector('.token.text.string')).toHaveTextContent('[Markdown]')
  const dark = view.container.querySelector<HTMLElement>('.token.keyword')!.style.color
  expect(dark).not.toBe('')
  view.rerender(
    <ThemeProvider theme="vsc" variant="light-modern">
      {content}
    </ThemeProvider>,
  )
  const light = view.container.querySelector<HTMLElement>('.token.keyword')!.style.color
  expect(light).not.toBe('')
  expect(light).not.toBe(dark)
})

test('Mermaid sequence diagrams retain their source text during SSR', () => {
  const value = 'sequenceDiagram\n  participant Alice\n  Alice->>Bob: Hello <world>'
  const html = renderToStaticMarkup(
    <CodeHighlighter lang="mermaid" value={value} showLineNo={false} />,
  )
  const doc = new DOMParser().parseFromString(html, 'text/html')
  expect([...doc.querySelectorAll('.token.keyword')].map(node => node.textContent)).toEqual([
    'sequenceDiagram',
    'participant',
  ])
  expect(doc.querySelector('.token.arrow.operator')?.textContent).toBe('->>')
  expect([...doc.querySelectorAll('.token-line')].map(node => node.textContent).join('\n')).toBe(
    value,
  )
  expect(doc.querySelector('world')).toBeNull()
})
