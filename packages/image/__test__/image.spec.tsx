import { render } from 'enzyme'
import React from 'react'
import Image from '../src'

const imageSrc = 'https://avatars.githubusercontent.com/u/42513619'

describe('prop types', function () {
  beforeEach(() => {
    jest.spyOn(global.console, 'error').mockImplementation((...args) => {
      throw new Error(args.join(' '))
    })
  })

  it('src is required', function () {
    for (const value of [undefined, null] as any[]) {
      expect(() => {
        render(<Image src={value} />)
      }).toThrow(/The prop `src` is marked as required/i)
    }

    expect(
      render(<Image src={imageSrc} />)
        .find('img')
        .attr('src'),
    ).toEqual(imageSrc)
  })

  describe('className is optional', function () {
    it('default', function () {
      const node = render(<Image src={imageSrc} />)
      expect(node.hasClass('yozora-image')).toBeTruthy()
    })

    it('custom', function () {
      const node = render(<Image src={imageSrc} className="my-image" />)
      expect(node.hasClass('yozora-image')).toBeTruthy()
      expect(node.hasClass('my-image')).toBeTruthy()
    })
  })

  it('style is optional', function () {
    const node = render(<Image src={imageSrc} style={{ color: 'orange' }} />).find('img')
    expect(node.css('color')).toEqual('orange')
  })
})

describe('snapshot', function () {
  it('default', function () {
    const wrapper = render(<Image src={imageSrc} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('custom', function () {
    const wrapper = render(
      <Image src={imageSrc} alt="avatar" className="custom-class" style={{ color: 'orange' }} />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
