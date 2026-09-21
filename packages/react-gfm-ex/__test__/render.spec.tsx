import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { vi } from 'vitest'
import { Markdown, MarkdownProvider } from '../src'

test('GFM-Ex enables tables, strikethrough, links and task lists without Yozora nodes', () => {
  const ast = {
    type: 'root' as const,
    children: [
      {
        type: 'paragraph',
        children: [
          { type: 'delete', children: [{ type: 'text', value: 'Removed' }] },
          {
            type: 'link',
            url: 'https://example.com',
            children: [{ type: 'text', value: 'example.com' }],
          },
        ],
      },
      {
        type: 'table',
        columns: [{ align: 'left' }],
        children: [
          {
            type: 'tableRow',
            children: [{ type: 'tableCell', children: [{ type: 'text', value: 'Header' }] }],
          },
        ],
      },
      {
        type: 'list',
        ordered: false,
        children: ['todo', 'doing', 'done'].map(status => ({
          type: 'listItem',
          status,
          children: [{ type: 'paragraph', children: [{ type: 'text', value: status }] }],
        })),
      },
      { type: 'math', value: 'x^2' },
      { type: 'admonition', keyword: 'note', title: [], children: [] },
    ],
  }
  const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
  try {
    const html = renderToStaticMarkup(
      <MarkdownProvider showTableColumnLines={false}>
        <Markdown ast={ast} />
      </MarkdownProvider>,
    )
    const doc = new DOMParser().parseFromString(html, 'text/html')
    expect(doc.querySelector('del')?.textContent).toContain('Removed')
    expect(doc.querySelector('a')?.getAttribute('href')).toBe('https://example.com')
    expect(doc.querySelector('table th')?.textContent).toContain('Header')
    expect(doc.querySelector('table')?.getAttribute('data-column-lines')).toBe('false')
    expect(doc.querySelectorAll('input[type="checkbox"]')).toHaveLength(3)
    expect(doc.querySelectorAll('input[checked]')).toHaveLength(1)
    expect(doc.querySelector('[data-status="doing"]')).not.toBeNull()
    expect(doc.querySelector('.yozora-math, .yozora-admonition, footer')).toBeNull()
    expect(
      warn.mock.calls
        .filter(([message]) => String(message).startsWith('Cannot find renderer for'))
        .map(([, node]) => node.type),
    ).toEqual(['math', 'admonition'])
  } finally {
    warn.mockRestore()
  }
})
