import React from 'react'
import { mount, render } from 'enzyme'
import ThematicBreak from '../src'


describe('basic rendering case', () => {
  const errorLogger = jest
    .spyOn(global.console, 'error')
    .mockImplementation((...args) => {
      throw new Error(args.join(' '))
    })

  afterAll(() => {
    errorLogger.mockRestore()
  })

  it('render with custom className', () => {
    const className = 'custom-thematic-break'
    const wrapper = render(
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
    const wrapper = mount(
      <ThematicBreak
        style={ { color: 'orange', fontSize: '16px' } }
      />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
