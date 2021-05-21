import { render } from 'enzyme'
import React from 'react'
import FootnoteDefinitions from '../src'
import type { FootnoteItem } from '../src'

const nodes: FootnoteItem[] = [
  {
    label: '1',
    identifier: 'footnote-1',
    children: <span>waw</span>,
  },
  {
    label: '2',
    identifier: 'footnote-2',
    children: <span>waw2</span>,
  },
]

describe('prop types', function () {
  beforeEach(() => {
    jest.spyOn(global.console, 'error').mockImplementation((...args) => {
      throw new Error(args.join(' '))
    })
  })

  describe('className is optional', function () {
    it('default', function () {
      const node = render(<FootnoteDefinitions nodes={nodes} />)
      expect(node.hasClass('yozora-footnote-definitions')).toBeTruthy()
    })

    it('custom', function () {
      const node = render(
        <FootnoteDefinitions
          nodes={nodes}
          className="my-footnote-definitions"
        />,
      )
      expect(node.hasClass('yozora-footnote-definitions')).toBeTruthy()
      expect(node.hasClass('my-footnote-definitions')).toBeTruthy()
    })
  })

  it('style is optional', function () {
    const node = render(
      <FootnoteDefinitions nodes={nodes} style={{ color: 'orange' }} />,
    )
    expect(node.css('color')).toEqual('orange')
  })
})

describe('snapshot', function () {
  it('basic', function () {
    const wrapper = render(
      <FootnoteDefinitions
        nodes={nodes}
        className="custom-footnote-definitions"
        style={{ marginTop: '2rem' }}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
