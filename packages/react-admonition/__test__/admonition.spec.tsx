import { render } from '@testing-library/react'
import React from 'react'
import Admonition from '../src'

const children = (
  <React.Fragment>
    <p>
      some text1
      <span>some text2</span>
    </p>
    <blockquote>some text3</blockquote>
  </React.Fragment>
)

describe('prop types', () => {
  const keywords = [
    undefined,
    '',
    'default',
    'note',
    'important',
    'info',
    'success',
    'tip',
    'warning',
    'caution',
    'error',
    'danger',
    'custom',
  ]

  describe('children is optional', () => {
    test('undefined', () => {
      for (const keyword of keywords) {
        expect(() => render(<Admonition keyword={keyword}>{undefined}</Admonition>)).not.toThrow()
      }
    })

    test('null', () => {
      for (const keyword of keywords) {
        expect(() => render(<Admonition keyword={keyword}>{null}</Admonition>)).not.toThrow()
      }
    })

    test('text', () => {
      for (const keyword of keywords) {
        const view = render(<Admonition keyword={keyword}>Hello, world!</Admonition>)
        expect(view.getByText('Hello, world!')).toBeInTheDocument()
        view.unmount()
      }
    })

    test('complex', () => {
      for (const keyword of keywords) {
        const view = render(<Admonition keyword={keyword}>{children}</Admonition>)
        expect(view.getByText('some text1')).toBeInTheDocument()
        expect(view.getByText('some text2')).toBeInTheDocument()
        expect(view.getByText('some text3')).toBeInTheDocument()
        view.unmount()
      }
    })
  })

  describe('snapshot', () => {
    test('default', () => {
      const view = render(<Admonition>{children}</Admonition>)
      expect(view.asFragment()).toMatchSnapshot()
      view.unmount()
    })

    test('custom', () => {
      const view = render(
        <Admonition keyword="caution" className="custom-class">
          {children}
        </Admonition>,
      )
      expect(view.asFragment()).toMatchSnapshot()
      view.unmount()
    })
  })
})
