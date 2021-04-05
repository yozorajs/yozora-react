import { mount, render } from 'enzyme'
import React from 'react'
import Heading from '../src'

describe('prop types', function () {
  beforeEach(() => {
    jest.spyOn(global.console, 'error').mockImplementation((...args) => {
      throw new Error(args.join(' '))
    })
  })

  it('forward ref', () => {
    const ref = React.createRef<HTMLDivElement>()
    const level = 1
    const wrapper = mount(
      <Heading
        level={level}
        ref={ref}
        identifier={`heading-${level}`}
        data-name="yozora-heading"
      >
        Heading {level}
      </Heading>,
    )

    const o = wrapper.getDOMNode()
    expect(o).toEqual(ref.current)
    expect(o.getAttribute('data-name')).toEqual('yozora-heading')
  })

  it('children is optional', () => {
    for (const value of [undefined, null] as any[]) {
      expect(() => {
        render(
          <Heading level={1} identifier="heading-1">
            {value}
          </Heading>,
        )
      }).not.toThrow()
    }
  })

  it('className is optional', function () {
    expect(
      render(<Heading level={1}>Heading contents.</Heading>).hasClass(
        'yozora-heading',
      ),
    ).toEqual(true)

    expect(
      render(
        <Heading level={1} className="my-heading">
          Heading contents.
        </Heading>,
      ).hasClass('my-heading'),
    ).toEqual(true)
  })

  it('level is a required enum number', () => {
    for (const level of [0, '1', 1.2, 7] as any[]) {
      expect(() => {
        render(
          <Heading level={level} identifier={`heading-${level}`}>
            heading {level}
          </Heading>,
        )
      }).toThrow(/Invalid prop `level`/i)
    }
  })
})

describe('snapshot', function () {
  it('default', () => {
    const level = 2
    const wrapper = render(
      <Heading
        level={level}
        identifier={`heading-${level}`}
        style={{ color: 'orange', fontSize: '16px' }}
      >
        Waw -- {level}, 中文标题“这”
      </Heading>,
    )
    expect(wrapper).toMatchSnapshot(`level ${level}`)
  })

  it('custom', () => {
    const level = 1
    const wrapper = mount(
      <Heading
        level={level}
        identifier={`heading-${level}`}
        className="custom-class"
        data-name="yozora-heading"
        style={{ color: 'orange', fontSize: '16px' }}
      >
        Waw -- {level}, 中文标题“这”
      </Heading>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
