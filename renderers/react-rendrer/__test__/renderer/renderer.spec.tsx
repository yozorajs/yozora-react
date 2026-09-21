import { fireEvent, render, screen } from '@testing-library/react'
import type {
  Blockquote,
  Code,
  Definition,
  Image,
  LinkReference,
  Paragraph,
  Table,
  Text,
} from '@yozora/ast'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import type { IImageViewerProps } from '../../src'
import { NodeRendererProvider, NodesRenderer, ThemeProvider } from '../../src'

test('the merged entry renders nested AST nodes and provider-themed code during SSR', () => {
  const text: Text = { type: 'text', value: 'Nested content' }
  const paragraph: Paragraph = { type: 'paragraph', children: [text] }
  const quote: Blockquote = { type: 'blockquote', children: [paragraph] }
  const code: Code = {
    type: 'code',
    lang: 'typescript',
    meta: '',
    value: 'const value: number = 1',
  }
  const html = renderToStaticMarkup(
    <ThemeProvider theme="catppuccin" variant="mocha">
      <NodeRendererProvider showCodeLineno={false}>
        <NodesRenderer nodes={[quote, code]} />
      </NodeRendererProvider>
    </ThemeProvider>,
  )
  const doc = new DOMParser().parseFromString(html, 'text/html')
  expect(doc.querySelector('blockquote p')?.textContent).toBe('Nested content')
  expect(doc.querySelector<HTMLElement>('.token.keyword')?.style.color).toBe('rgb(203, 166, 247)')
  expect(doc.querySelector('.yozora-code-highlighter__linenos')).toBeNull()
})

test('renderer and reference updates reach stable child elements', () => {
  const text: Text = { type: 'text', value: 'Docs' }
  const reference: LinkReference = {
    type: 'linkReference',
    identifier: 'docs',
    label: 'Docs',
    referenceType: 'full',
    children: [text],
  }
  const paragraph: Paragraph = { type: 'paragraph', children: [reference] }
  const child = <NodesRenderer nodes={[paragraph]} />
  const first: Definition = { type: 'definition', identifier: 'docs', label: 'Docs', url: '/first' }
  const second: Definition = { ...first, url: '/second' }
  const view = render(
    <NodeRendererProvider definitionMap={{ docs: first }}>{child}</NodeRendererProvider>,
  )
  expect(screen.getByRole('link', { name: 'Docs' })).toHaveAttribute('href', '/first')

  view.rerender(
    <NodeRendererProvider definitionMap={{ docs: second }}>{child}</NodeRendererProvider>,
  )
  expect(screen.getByRole('link', { name: 'Docs' })).toHaveAttribute('href', '/second')

  view.rerender(
    <NodeRendererProvider customRendererMap={{ paragraph: () => <p>Custom renderer</p> }}>
      {child}
    </NodeRendererProvider>,
  )
  expect(screen.getByText('Custom renderer')).toBeInTheDocument()
  expect(screen.queryByRole('link')).toBeNull()
})

test('image activation and closing share the merged renderer context', () => {
  function ImageViewer({
    visible,
    images,
    activeIndex,
    onClose,
  }: IImageViewerProps): React.ReactElement {
    return (
      <div role="dialog" hidden={!visible}>
        <span>{activeIndex === undefined ? '' : images[activeIndex].src}</span>
        <button type="button" onClick={onClose}>
          Close preview
        </button>
      </div>
    )
  }
  const image = { src: '/preview.png', alt: 'Preview image' }
  const node: Image = { type: 'image', url: image.src, alt: image.alt }
  render(
    <NodeRendererProvider images={[image]} ImageViewer={ImageViewer}>
      <NodesRenderer nodes={[node]} />
    </NodeRendererProvider>,
  )
  expect(screen.queryByRole('dialog')).toBeNull()
  fireEvent.click(screen.getByAltText('Preview image'))
  expect(screen.getByRole('dialog')).toHaveTextContent('/preview.png')
  fireEvent.click(screen.getByRole('button', { name: 'Close preview' }))
  expect(screen.queryByRole('dialog')).toBeNull()
})

const table: Table = {
  type: 'table',
  columns: [{ align: 'left' }, { align: 'right' }],
  children: [
    ['Name', 'Value'],
    ['Alpha', '42'],
  ].map(row => ({
    type: 'tableRow',
    children: row.map(value => ({ type: 'tableCell', children: [{ type: 'text', value }] })),
  })),
}

test.each([undefined, false, true])(
  'table column lines honor %s during SSR',
  showTableColumnLines => {
    const html = renderToStaticMarkup(
      <NodeRendererProvider showTableColumnLines={showTableColumnLines}>
        <NodesRenderer nodes={[table]} />
      </NodeRendererProvider>,
    )
    const doc = new DOMParser().parseFromString(html, 'text/html')
    expect(doc.querySelector('table')?.getAttribute('data-column-lines')).toBe(
      String(showTableColumnLines ?? true),
    )
    expect(doc.querySelectorAll('th')).toHaveLength(2)
    expect(doc.querySelectorAll('td')).toHaveLength(2)
    expect(doc.querySelector('td[align="right"]')?.textContent).toBe('42')
  },
)

test('table column lines update stable AST children and reset to the default', () => {
  const child = <NodesRenderer nodes={[table]} />
  const view = render(<NodeRendererProvider>{child}</NodeRendererProvider>)
  const element = view.getByRole('table')
  expect(element).toHaveAttribute('data-column-lines', 'true')
  view.rerender(<NodeRendererProvider showTableColumnLines={false}>{child}</NodeRendererProvider>)
  expect(view.getByRole('table')).toBe(element)
  expect(element).toHaveAttribute('data-column-lines', 'false')
  view.rerender(<NodeRendererProvider>{child}</NodeRendererProvider>)
  expect(element).toHaveAttribute('data-column-lines', 'true')
})
