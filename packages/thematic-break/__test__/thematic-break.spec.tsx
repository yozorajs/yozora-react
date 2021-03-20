import { mount, render } from 'enzyme'
import React from 'react'
import type { DefaultTheme } from 'styled-components'
import { ThemeProvider } from 'styled-components'
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
    const wrapper = render(<ThematicBreak className={className} />)
    expect(wrapper.hasClass(className)).toEqual(true)
  })

  it('forward ref', () => {
    const ref = React.createRef<HTMLHRElement>()
    const wrapper = mount(<ThematicBreak ref={ref} data-value="waw" />)

    const o = wrapper.getDOMNode()
    expect(o).toEqual(ref.current)
    expect(o.getAttribute('data-value')).toEqual('waw')
  })

  it('snapshot', () => {
    const wrapper = render(
      <ThematicBreak style={{ color: 'orange', fontSize: '16px' }} />,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('snapshot with theme', () => {
    const theme: DefaultTheme = {
      yozora: {
        thematicBreak: {
          borderColor: 'orange',
          // outline: '1px dash red',
          margin: '2rem 0',
        },
      },
    }

    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <ThematicBreak style={{ color: 'orange', fontSize: '16px' }} />
      </ThemeProvider>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
