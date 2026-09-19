import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { vi } from 'vitest'
import { Markdown, MarkdownProvider } from '../src'

test('GFM renders base nodes and references without enabling extension renderers', () => {
  const ast = {
    type: 'root' as const,
    children: [
      {
        type: 'blockquote',
        children: [
          {
            type: 'paragraph',
            children: [{ type: 'strong', children: [{ type: 'text', value: 'Base' }] }],
          },
        ],
      },
      { type: 'code', lang: 'typescript', meta: '', value: 'const value = 1' },
      {
        type: 'linkReference',
        identifier: 'docs',
        label: 'Docs',
        referenceType: 'full',
        children: [{ type: 'text', value: 'Docs' }],
      },
      {
        type: 'list',
        ordered: false,
        children: [
          {
            type: 'listItem',
            status: 'done',
            children: [{ type: 'paragraph', children: [{ type: 'text', value: 'Task text' }] }],
          },
        ],
      },
      { type: 'delete', children: [{ type: 'text', value: 'Not in the base preset' }] },
      { type: 'table', columns: [], children: [] },
      { type: 'html', value: '<script>unsafe()</script>' },
    ],
  }
  const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
  try {
    const html = renderToStaticMarkup(
      <MarkdownProvider
        definitionMap={{
          docs: { type: 'definition', identifier: 'docs', label: 'Docs', url: '/docs' },
        }}
      >
        <Markdown ast={ast} />
      </MarkdownProvider>,
    )
    const doc = new DOMParser().parseFromString(html, 'text/html')
    expect(doc.querySelector('blockquote strong')?.textContent).toContain('Base')
    expect(doc.querySelector('code')?.textContent).toContain('const value = 1')
    expect(doc.querySelector('a')?.getAttribute('href')).toBe('/docs')
    expect(doc.querySelector('li')?.textContent).toContain('Task text')
    expect(doc.querySelector('input, del, table, script, footer')).toBeNull()
    expect(
      warn.mock.calls
        .filter(([message]) => String(message).startsWith('Cannot find renderer for'))
        .map(([, node]) => node.type),
    ).toEqual(['delete', 'table'])
  } finally {
    warn.mockRestore()
  }
})
