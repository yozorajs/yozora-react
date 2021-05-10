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

    expect(render(<Image src={imageSrc} />).attr('src')).toEqual(imageSrc)
  })

  describe('className is optional', function () {
    it('default', function () {
      const node = render(<Image src={imageSrc} />)
      expect(node.hasClass('yozora-image')).toEqual(true)
    })

    it('custom', function () {
      const node = render(<Image src={imageSrc} className="my-image" />)
      expect(node.hasClass('yozora-image')).toEqual(true)
      expect(node.hasClass('my-image')).toEqual(true)
    })
  })

  it('style is optional', function () {
    const node = render(<Image src={imageSrc} style={{ color: 'orange' }} />)
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
      <Image
        src={imageSrc}
        alt="avatar"
        className="custom-class"
        style={{ color: 'orange' }}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
