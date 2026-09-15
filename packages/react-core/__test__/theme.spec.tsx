import { render, screen } from '@testing-library/react'
import React from 'react'
import { renderToStaticMarkup, renderToString } from 'react-dom/server'
import type { IBreakpoints } from '../src'
import { ThemeProvider, useThemeContext } from '../src'

function ThemeValue({ label }: { label: string }): React.ReactElement {
  const { theme } = useThemeContext()
  return <span data-testid={label}>{theme}</span>
}

test('nested themes stay independent and update both CSS selection and context', () => {
  function Example({ theme }: { theme: string }): React.ReactElement {
    return (
      <ThemeProvider theme={theme} className="custom-theme">
        <ThemeValue label="outer" />
        <ThemeProvider theme="vsc" variant="light-modern">
          <ThemeValue label="inner" />
        </ThemeProvider>
      </ThemeProvider>
    )
  }

  const view = render(<Example theme="catppuccin-mocha" />)
  const outer = screen.getByTestId('outer')
  const inner = screen.getByTestId('inner')
  expect(outer).toHaveTextContent('catppuccin')
  expect(outer.parentElement).toHaveAttribute('data-yozora-theme', 'catppuccin')
  expect(outer.parentElement).toHaveAttribute('data-yozora-variant', 'mocha')
  expect(outer.parentElement).toHaveClass('yozora-theme-root', 'custom-theme')
  expect(inner.parentElement).toHaveAttribute('data-yozora-theme', 'vsc')
  expect(inner.parentElement).toHaveAttribute('data-yozora-variant', 'light-modern')

  view.rerender(<Example theme="custom" />)
  expect(outer).toHaveTextContent('custom')
  expect(outer.parentElement).toHaveAttribute('data-yozora-theme', 'custom')
  expect(inner).toHaveTextContent('vsc')
  expect(view.container.querySelector('style')).toBeNull()
})

test.each([
  { name: 'renderToString', renderSSR: renderToString },
  { name: 'renderToStaticMarkup', renderSSR: renderToStaticMarkup },
])('$name preserves scoped media CSS and updates with props', ({ renderSSR }) => {
  function Example({ query }: { query?: string }): React.ReactElement {
    const defaults = useThemeContext().breakpoints
    const breakpoints: IBreakpoints = { ...defaults, xsMinus: query ?? defaults.xsMinus }
    return (
      <ThemeProvider breakpoints={breakpoints}>
        <ThemeValue label="outer" />
        <ThemeProvider>
          <ThemeValue label="inner" />
        </ThemeProvider>
      </ThemeProvider>
    )
  }
  const html = renderSSR(<Example query="(max-width: 800px)" />)
  expect(html).not.toContain('&quot;')
  const document = new DOMParser().parseFromString(html, 'text/html')
  const outer = document.querySelector('[data-testid="outer"]')?.parentElement
  const style = document.querySelector('style')
  const id = outer?.getAttribute('data-yozora-breakpoint')
  expect(id).toBeTruthy()
  expect(style?.getAttribute('media')).toBe('screen and (max-width: 800px)')
  expect(style?.textContent).toContain(`[data-yozora-breakpoint="${id}"]`)
  expect(
    document
      .querySelector('[data-testid="inner"]')
      ?.parentElement?.hasAttribute('data-yozora-breakpoint'),
  ).toBe(false)

  const view = render(<Example query="(max-width: 800px)" />)
  expect(screen.getByTestId('outer').parentElement).toHaveAttribute('data-yozora-breakpoint', id)
  view.rerender(<Example query="(max-width: 600px)" />)
  expect(view.container.querySelectorAll('style')).toHaveLength(1)
  expect(view.container.querySelector('style')).toHaveAttribute(
    'media',
    'screen and (max-width: 600px)',
  )
  expect(screen.getByTestId('outer').parentElement).not.toHaveAttribute(
    'data-yozora-breakpoint',
    id,
  )
  view.rerender(<Example />)
  expect(view.container.querySelector('style')).toBeNull()
  expect(screen.getByTestId('outer').parentElement).not.toHaveAttribute('data-yozora-breakpoint')
})

test('nonces inherit, override, and replace style nodes when changed', () => {
  function NonceValue({ label }: { label: string }): React.ReactElement {
    return <span data-testid={label}>{useThemeContext().nonce}</span>
  }
  function Example({ nonce }: { nonce?: string }): React.ReactElement {
    const defaults = useThemeContext().breakpoints
    const breakpoints = { ...defaults, xsMinus: '(max-width: 800px)' }
    return (
      <ThemeProvider nonce={nonce}>
        <ThemeProvider breakpoints={breakpoints} className="inherited">
          <NonceValue label="inherited" />
        </ThemeProvider>
        <ThemeProvider breakpoints={breakpoints} nonce="explicit" className="overridden">
          <NonceValue label="overridden" />
        </ThemeProvider>
      </ThemeProvider>
    )
  }
  const html = renderToStaticMarkup(<Example nonce="first" />)
  const document = new DOMParser().parseFromString(html, 'text/html')
  expect([...document.querySelectorAll('style')].map(style => style.nonce)).toEqual([
    'first',
    'explicit',
  ])

  const view = render(<Example nonce="first" />)
  const inherited = view.container.querySelector<HTMLStyleElement>('.inherited > style')
  const overridden = view.container.querySelector<HTMLStyleElement>('.overridden > style')
  expect(inherited?.nonce).toBe('first')
  expect(overridden?.nonce).toBe('explicit')
  view.rerender(<Example nonce="second" />)
  const updated = view.container.querySelector<HTMLStyleElement>('.inherited > style')
  expect(updated?.nonce).toBe('second')
  expect(updated).not.toBe(inherited)
  expect(view.container.querySelector('.overridden > style')).toBe(overridden)
  expect(screen.getByTestId('inherited')).toHaveTextContent('second')
  expect(screen.getByTestId('overridden')).toHaveTextContent('explicit')
})

test('media queries cannot escape the SSR style element', () => {
  function Example(): React.ReactElement {
    const defaults = useThemeContext().breakpoints
    return (
      <ThemeProvider breakpoints={{ ...defaults, xsMinus: '</style><script>alert(1)</script>' }}>
        safe
      </ThemeProvider>
    )
  }
  const html = renderToStaticMarkup(<Example />)
  const document = new DOMParser().parseFromString(html, 'text/html')
  expect(document.querySelector('script')).toBeNull()
  expect(document.querySelectorAll('style')).toHaveLength(1)
  expect(document.querySelector('style')?.textContent).not.toContain('</style>')
})
