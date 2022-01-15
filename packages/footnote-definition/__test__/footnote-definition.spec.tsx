import { render } from 'enzyme'
import React from 'react'
import FootnoteDefinition from '../src'
import type { IFootnoteDefinitionProps } from '../src'

const footnoteDefinitionProps: IFootnoteDefinitionProps = {
  label: '1',
  identifier: 'footnote-1',
  children: <span>waw1</span>,
}

describe('prop types', function () {
  beforeEach(() => {
    jest.spyOn(global.console, 'error').mockImplementation((...args) => {
      throw new Error(args.join(' '))
    })
  })

  describe('className is optional', function () {
    it('default', function () {
      const node = render(<FootnoteDefinition {...footnoteDefinitionProps} />)
      expect(node.hasClass('yozora-footnote-definition')).toBeTruthy()
    })

    it('custom', function () {
      const node = render(
        <FootnoteDefinition {...footnoteDefinitionProps} className="my-footnote-definition" />,
      )
      expect(node.hasClass('yozora-footnote-definition')).toBeTruthy()
      expect(node.hasClass('my-footnote-definition')).toBeTruthy()
    })
  })

  it('style is optional', function () {
    const node = render(
      <FootnoteDefinition {...footnoteDefinitionProps} style={{ color: 'orange' }} />,
    )
    expect(node.css('color')).toEqual('orange')
  })
})

describe('snapshot', function () {
  it('basic', function () {
    const wrapper = render(
      <FootnoteDefinition
        {...footnoteDefinitionProps}
        className="custom-footnote-definition"
        style={{ marginTop: '2rem' }}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
