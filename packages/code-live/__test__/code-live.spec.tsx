import React from 'react'
import { act } from 'react-dom/test-utils'
import { mount, render } from 'enzyme'
import { DefaultTheme, ThemeProvider } from 'styled-components'
import CodeLive, { CodeRendererProps } from '../src'


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
    return <span data-type="jsx">{ v }</span>
  }

  it('forward ref', () => {
    const ref = React.createRef<HTMLDivElement>()
    const wrapper = mount(
      <CodeLive
        ref={ ref }
        lang="jsx"
        value="const a = 1 + 2; return a;"
        CodeRenderer={ JsxRenderer }
        data-value="waw"
      />
    )

    const o = wrapper.getDOMNode()
    expect(o).toEqual(ref.current)
    expect(o.getAttribute('data-value')).toEqual('waw')
  })

  it('change and debounce', async () => {
    const code1 = 'return 3'
    const code2 = 'return 4'

    const wrapper = mount(
      <CodeLive
        lang="jsx"
        value={ code1 }
        CodeRenderer={ JsxRenderer }
      />
    )

    expect(wrapper.find('textarea').text()).toEqual(code1)
    expect(wrapper.find('[data-type="jsx"]').text()).toEqual('3')

    // change code
    wrapper.find('textarea').simulate('change', { target: { value: code2 } })
    expect(wrapper.find('textarea').text()).toEqual(code2)
    expect(wrapper.find('[data-type="jsx"]').text()).toEqual('3')

    // await debounce
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
    })
    expect(wrapper.find('textarea').text()).toEqual(code2)
    expect(wrapper.find('[data-type="jsx"]').text()).toEqual('4')
  })

  it('snapshot', () => {
    const code = `
      const a = 1 + 2;
      return a * a
    `

    const wrapper = render(
      <CodeLive
        lang="jsx"
        value={ code }
        CodeRenderer={ JsxRenderer }
      />
    )

    expect(wrapper.find('textarea').text()).toEqual(code)
    expect(wrapper.find('[data-type="jsx"]').text()).toEqual('9')
    expect(wrapper).toMatchSnapshot()
  })

  it('snapshot with theme', () => {
    const theme: DefaultTheme = {
      yozora: {
        codeLive: {
          margin: '1rem 0',
          editorBackground: 'pink',
          editorCaretColor: 'white',
          editorFontSize: '18px',
        },
        codeEmbed: {
          errorBackground: 'red',
        }
      }
    }

    const code = `
      const a = 1 + 2;
      return a * a
    `

    const wrapper = render(
      <ThemeProvider theme={ theme }>
        <CodeLive
          lang="jsx"
          value={ code }
          CodeRenderer={ JsxRenderer }
        />
      </ThemeProvider>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
