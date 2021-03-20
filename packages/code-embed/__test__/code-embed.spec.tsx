import { mount, render } from 'enzyme'
import React from 'react'
import type { DefaultTheme } from 'styled-components'
import { ThemeProvider } from 'styled-components'
import type { CodeRendererProps } from '../src'
import CodeEmbed from '../src'

describe('basic rendering case', () => {
  const errorLogger = jest
    .spyOn(global.console, 'error')
    .mockImplementation((...args) => {
      throw new Error(args.join(' '))
    })

  afterAll(() => {
    errorLogger.mockRestore()
  })

  const JsxRenderer = ({ value }: CodeRendererProps): React.ReactElement => {
    // eslint-disable-next-line no-new-func
    const f = new Function(value)
    const v = f()
    return <span data-type="jsx">{v}</span>
  }

  it('forward ref', () => {
    const ref = React.createRef<HTMLDivElement>()
    const wrapper = mount(
      <CodeEmbed
        ref={ref}
        lang="jsx"
        value="const a = 1 + 2; return a;"
        CodeRenderer={JsxRenderer}
        data-value="waw"
      />,
    )

    const o = wrapper.getDOMNode()
    expect(o).toEqual(ref.current)
    expect(o.getAttribute('data-value')).toEqual('waw')
  })

  it('snapshot', () => {
    const code = `
      const a = 1 + 2;
      return a * a
    `

    const wrapper = render(
      <CodeEmbed lang="jsx" value={code} CodeRenderer={JsxRenderer} />,
    )

    expect(wrapper.find('[data-type="jsx"]').text()).toEqual('9')
    expect(wrapper).toMatchSnapshot()
  })

  it('snapshot with theme', () => {
    const theme: DefaultTheme = {
      yozora: {
        codeEmbed: {
          padding: '2px',
          border: 'none',
          background: '#fff',
          color: '#ccc',
          errorBackground: 'red',
          errorColor: '#f8f8f2',
          errorFontSize: '0.9em',
        },
      },
    }

    const code = `
      const a = 1 + 2;
      return a * a
    `

    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <CodeEmbed lang="jsx" value={code} CodeRenderer={JsxRenderer} />
      </ThemeProvider>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
