import { render, screen } from '@testing-library/react'
import type { Text } from '@yozora/ast'
import { defaultNodeRendererMap } from '@yozora/react-renderer'
import React from 'react'
import { Markdown, MarkdownProvider } from '../src'

test('the kernel applies preset and override updates to stable document children', () => {
  const ast = {
    type: 'root' as const,
    children: [{ type: 'paragraph', children: [{ type: 'text', value: 'body' }] }],
  }
  const first = {
    ...defaultNodeRendererMap,
    text: ({ value }: Text) => <mark>first:{value}</mark>,
  }
  const second = { ...first, text: ({ value }: Text) => <mark>second:{value}</mark> }
  const child = <Markdown ast={ast} footer={<span>Custom footer</span>} />
  const view = render(<MarkdownProvider rendererMap={first}>{child}</MarkdownProvider>)
  expect(screen.getByText('first:body')).toBeInTheDocument()
  expect(view.container.querySelector('footer')).toHaveTextContent('Custom footer')

  view.rerender(<MarkdownProvider rendererMap={second}>{child}</MarkdownProvider>)
  expect(screen.getByText('second:body')).toBeInTheDocument()

  view.rerender(
    <MarkdownProvider rendererMap={second} customRendererMap={{ text: () => <b>Override</b> }}>
      {child}
    </MarkdownProvider>,
  )
  expect(screen.getByText('Override')).toBeInTheDocument()

  view.rerender(
    <MarkdownProvider rendererMap={second} customRendererMap={{ text: undefined }}>
      {child}
    </MarkdownProvider>,
  )
  expect(screen.getByText('second:body')).toBeInTheDocument()
})
