import React from 'react'
import { mount, render, shallow } from 'enzyme'
import ThematicBreak from '../src'


describe('test suite: Test component', () => {
  const errorLogger = jest
    .spyOn(global.console, 'error')
    .mockImplementation((...args) => {
      throw new Error(args.join(' '))
    })

  afterAll(() => {
    errorLogger.mockRestore()
  })

  it('expect render with custom className', () => {
    const className = 'custom-thematic-break'
    const wrapper = shallow(
      <ThematicBreak className={ className } />
    )
    expect(wrapper.hasClass(className)).toEqual(true)
  })

  it('forward ref', () => {
    const ref = React.createRef<HTMLHRElement>()
    const wrapper = mount(
      <ThematicBreak ref={ ref } data-value="waw" />
    )

    const o = wrapper.getDOMNode()
    expect(o).toEqual(ref.current)
    expect(o.getAttribute('data-value')).toEqual('waw')
  })

  it('snapshot', () => {
    const wrapper = render(
      <ThematicBreak
        style={ { color: 'orange', fontSize: '16px' } }
      />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
