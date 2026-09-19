import { fireEvent, render, screen } from '@testing-library/react'
import type { ICodeRunnerProps } from '@yozora/react-renderer'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { vi } from 'vitest'
import DefaultMarkdown, { Markdown, MarkdownProvider } from '../src'

test('named and default Markdown exports preserve the class instance ref contract', () => {
  const ast = {
    type: 'root' as const,
    children: [{ type: 'paragraph', children: [{ type: 'text', value: 'First document' }] }],
  }
  const ref = React.createRef<Markdown>()
  const view = render(
    <MarkdownProvider>
      <DefaultMarkdown ref={ref} ast={ast} />
    </MarkdownProvider>,
  )
  const instance = ref.current
  expect(instance).toBeInstanceOf(Markdown)
  expect(instance?.props.ast).toBe(ast)
  expect(screen.getByText('First document')).toBeInTheDocument()

  const nextAst = {
    ...ast,
    children: [{ type: 'paragraph', children: [{ type: 'text', value: 'Second document' }] }],
  }
  view.rerender(
    <MarkdownProvider>
      <Markdown ref={ref} ast={nextAst} className="custom-document" />
    </MarkdownProvider>,
  )
  expect(ref.current).toBe(instance)
  expect(ref.current?.props.ast).toBe(nextAst)
  expect(screen.getByText('Second document')).toBeInTheDocument()
  expect(view.container.querySelector('.yozora-markdown')).toHaveClass('custom-document')
  view.unmount()
  expect(ref.current).toBeNull()
})

test('Yozora renders extensions and keeps document metadata out of the DOM', () => {
  const ast = {
    type: 'root' as const,
    children: [
      { type: 'frontmatter', lang: 'yaml', value: 'secret: metadata-only' },
      { type: 'ecmaImport', moduleName: './metadata-only', namedImports: [] },
      {
        type: 'admonition',
        keyword: 'note',
        title: [{ type: 'text', value: 'Notice' }],
        children: [
          {
            type: 'paragraph',
            children: [
              { type: 'inlineMath', value: 'x' },
              { type: 'footnoteReference', identifier: 'note', label: '1' },
            ],
          },
          { type: 'math', value: 'y^2' },
        ],
      },
      {
        type: 'list',
        ordered: false,
        children: [
          {
            type: 'listItem',
            status: 'done',
            children: [
              {
                type: 'paragraph',
                children: [{ type: 'delete', children: [{ type: 'text', value: 'Done' }] }],
              },
            ],
          },
        ],
      },
    ],
  }
  const note = {
    type: 'footnoteDefinition' as const,
    identifier: 'note',
    label: '1',
    children: [{ type: 'paragraph', children: [{ type: 'text', value: 'Footnote content' }] }],
  }
  const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
  try {
    const html = renderToStaticMarkup(
      <MarkdownProvider footnoteDefinitionMap={{ note }}>
        <Markdown ast={ast} footnoteDefinitionsTitle="Notes" />
      </MarkdownProvider>,
    )
    const doc = new DOMParser().parseFromString(html, 'text/html')
    expect(doc.querySelector('.yozora-admonition')?.textContent).toContain('Notice')
    expect(doc.querySelector('.yozora-inline-math')?.textContent).toContain('$x$')
    expect(doc.querySelector('.yozora-math')?.textContent).toContain('$$y^2$$')
    expect(doc.querySelector('.yozora-footnote-reference a')?.getAttribute('href')).toBe('#note')
    expect(doc.querySelector('footer')?.textContent).toContain('Notes')
    expect(doc.querySelector('footer #note')?.textContent).toContain('Footnote content')
    expect(doc.querySelector('input[checked]')).not.toBeNull()
    expect(doc.querySelector('del')?.textContent).toContain('Done')
    expect(html).not.toContain('metadata-only')
    expect(
      warn.mock.calls
        .filter(([message]) => String(message).startsWith('Cannot find renderer for'))
        .map(([, node]) => node.type),
    ).toEqual([])
  } finally {
    warn.mockRestore()
  }
})

test('footnote props and definitions update without replacing the AST', () => {
  const ast = { type: 'root' as const, children: [] }
  const note = {
    type: 'footnoteDefinition' as const,
    identifier: 'note',
    label: '1',
    children: [{ type: 'text', value: 'First note' }],
  }
  const view = render(
    <MarkdownProvider footnoteDefinitionMap={{ note }}>
      <Markdown ast={ast} footnoteDefinitionsTitle="First title" />
    </MarkdownProvider>,
  )
  expect(screen.getByText('First note')).toBeInTheDocument()
  const nextNote = {
    ...note,
    children: [{ type: 'text', value: 'Second note' }],
  }
  view.rerender(
    <MarkdownProvider footnoteDefinitionMap={{ note: nextNote }}>
      <Markdown ast={ast} footnoteDefinitionsTitle="Second title" />
    </MarkdownProvider>,
  )
  expect(screen.getByText('Second note')).toBeInTheDocument()
  expect(screen.getByText('Second title')).toBeInTheDocument()
  view.rerender(
    <MarkdownProvider footnoteDefinitionMap={{ note: nextNote }}>
      <Markdown ast={ast} dontNeedFootnoteDefinitions />
    </MarkdownProvider>,
  )
  expect(screen.queryByText('Second note')).toBeNull()
})

test('code runner updates and consumer overrides preserve their precedence', () => {
  const ast = {
    type: 'root' as const,
    children: [{ type: 'code', lang: 'demo', meta: 'embed', value: 'payload\n' }],
  }
  const First = ({ value }: ICodeRunnerProps): React.ReactElement => <output>first:{value}</output>
  const Second = ({ value }: ICodeRunnerProps): React.ReactElement => (
    <output>second:{value}</output>
  )
  const child = <Markdown ast={ast} />
  const first = [{ title: 'demo', pattern: /^demo$/, runner: First }]
  const second = [{ title: 'demo', pattern: /^demo$/, runner: Second }]
  const view = render(<MarkdownProvider codeRunners={first}>{child}</MarkdownProvider>)
  expect(screen.getByText('first:payload')).toBeInTheDocument()
  view.rerender(<MarkdownProvider codeRunners={second}>{child}</MarkdownProvider>)
  expect(screen.getByText('second:payload')).toBeInTheDocument()
  view.rerender(
    <MarkdownProvider codeRunners={second} customRendererMap={{ code: () => <p>Custom code</p> }}>
      {child}
    </MarkdownProvider>,
  )
  expect(screen.getByText('Custom code')).toBeInTheDocument()
  expect(screen.queryByRole('status')).toBeNull()
})

test('equivalent runner arrays preserve the mounted preview state', () => {
  const ast = {
    type: 'root' as const,
    children: [{ type: 'code', lang: 'counter', meta: 'embed', value: 'counter' }],
  }
  function Counter(): React.ReactElement {
    const [count, setCount] = React.useState(0)
    return (
      <button type="button" onClick={() => setCount(count + 1)}>
        Count:{count}
      </button>
    )
  }
  const view = render(
    <MarkdownProvider codeRunners={[{ title: 'counter', pattern: /^counter$/, runner: Counter }]}>
      <Markdown ast={ast} />
    </MarkdownProvider>,
  )
  fireEvent.click(screen.getByRole('button', { name: 'Count:0' }))
  expect(screen.getByRole('button', { name: 'Count:1' })).toBeInTheDocument()
  view.rerender(
    <MarkdownProvider codeRunners={[{ title: 'counter', pattern: /^counter$/, runner: Counter }]}>
      <Markdown ast={ast} />
    </MarkdownProvider>,
  )
  expect(screen.getByRole('button', { name: 'Count:1' })).toBeInTheDocument()
})
