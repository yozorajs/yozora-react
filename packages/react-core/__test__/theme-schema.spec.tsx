import { render, screen } from '@testing-library/react'
import React from 'react'
import {
  ThemeProvider,
  TokenNames,
  getThemeSchema,
  themeSchemas,
  useThemeContext,
  vscDarkModernSchema,
} from '../src'

test('the flat catalog covers every reference scheme with complete component colors', () => {
  expect(themeSchemas.map(schema => `${schema.theme}/${schema.variant}`)).toEqual([
    'catppuccin/frappe',
    'catppuccin/latte',
    'catppuccin/macchiato',
    'catppuccin/mocha',
    'gruvbox/dark',
    'gruvbox/light',
    'kanagawa/dragon',
    'kanagawa/lotus',
    'kanagawa/wave',
    'rosepine/dawn',
    'rosepine/main',
    'rosepine/moon',
    'tokyonight/day',
    'tokyonight/moon',
    'tokyonight/night',
    'tokyonight/storm',
    'vsc/dark-modern',
    'vsc/light-modern',
  ])
  for (const schema of themeSchemas) {
    expect(Object.keys(schema.colors).sort()).toEqual(Object.values(TokenNames).sort())
    for (const color of Object.values(schema.colors)) expect(color).toEqual(expect.any(String))
    for (const value of Object.values(schema.colors))
      expect(value).toMatch(/^#(?:[\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/i)
  }
})

test('explicit variants, full names, and family defaults resolve predictably', () => {
  expect(getThemeSchema('light')).toBeUndefined()
  expect(getThemeSchema('darken')).toBeUndefined()
  expect(getThemeSchema('vsc', 'dark-modern')).toBe(vscDarkModernSchema)
  expect(getThemeSchema('vsc-dark-modern')).toBe(vscDarkModernSchema)
  expect(getThemeSchema('vsc')).toBe(vscDarkModernSchema)
  expect(getThemeSchema('catppuccin')?.variant).toBe('mocha')
  expect(getThemeSchema('catppuccin', 'latte')?.darken).toBe(false)
  expect(getThemeSchema('vsc', 'light-modern')?.darken).toBe(false)
  expect(getThemeSchema('custom', 'bespoke')).toBeUndefined()
  expect(getThemeSchema('vsc', 'unknown')).toBeUndefined()
})

function Details({ label }: { label: string }): React.ReactElement {
  const { theme, variant, schema } = useThemeContext()
  return (
    <span data-testid={label}>{`${theme}/${variant ?? ''}/${schema?.darken ?? 'custom'}`}</span>
  )
}

test('switching variants updates metadata and keeps nested providers independent', () => {
  function Example({ variant }: { variant: string }): React.ReactElement {
    return (
      <ThemeProvider theme="catppuccin" variant={variant}>
        <Details label="outer" />
        <ThemeProvider theme="vsc" variant="light-modern">
          <Details label="inner" />
        </ThemeProvider>
      </ThemeProvider>
    )
  }
  const view = render(<Example variant="mocha" />)
  expect(screen.getByTestId('outer')).toHaveTextContent('catppuccin/mocha/true')
  expect(screen.getByTestId('outer').parentElement).toHaveAttribute('data-yozora-variant', 'mocha')
  view.rerender(<Example variant="latte" />)
  expect(screen.getByTestId('outer')).toHaveTextContent('catppuccin/latte/false')
  expect(screen.getByTestId('inner')).toHaveTextContent('vsc/light-modern/false')
  expect(view.container.querySelector('style')).toBeNull()
})

test('full names normalize and custom theme metadata stays available', () => {
  const view = render(
    <ThemeProvider theme="vsc-dark-modern">
      <Details label="value" />
    </ThemeProvider>,
  )
  expect(screen.getByTestId('value')).toHaveTextContent('vsc/dark-modern/true')
  view.rerender(
    <ThemeProvider theme="custom" variant="bespoke">
      <Details label="value" />
    </ThemeProvider>,
  )
  expect(screen.getByTestId('value')).toHaveTextContent('custom/bespoke/custom')
})

test.each([
  [{}, 'light-modern'],
  [{ variant: 'dark-modern' }, 'dark-modern'],
  [{ theme: 'vsc' }, 'dark-modern'],
  [{ theme: 'vsc-light-modern' }, 'light-modern'],
])('provider defaults and explicit theme selection: %j', (props, variant) => {
  render(
    <ThemeProvider {...props}>
      <Details label="value" />
    </ThemeProvider>,
  )
  const value = screen.getByTestId('value')
  expect(value).toHaveTextContent(`vsc/${variant}/${variant === 'dark-modern'}`)
  expect(value.parentElement).toHaveAttribute('data-yozora-theme', 'vsc')
  expect(value.parentElement).toHaveAttribute('data-yozora-variant', variant)
})
