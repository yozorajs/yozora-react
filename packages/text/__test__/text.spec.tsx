import React from 'react'
import { shallow } from 'enzyme'
import Text from '../src'


describe('test suite: Test component', () => {
  it('expect render a text value', () => {
    const text = 'Hello, world!'
    const wrapper = shallow(
      <Text value={ text } />
    )
    expect(wrapper.text()).toEqual(text)
  })

  it('expect render with custom className', () => {
    const text = 'Hello, world!'
    const className = 'custom-text'
    const wrapper = shallow(
      <Text className={ className } value={ text } />
    )
    expect(wrapper.hasClass(className)).toEqual(true)
    expect(wrapper.text()).toEqual(text)
  })
})
