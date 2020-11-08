import React, { useEffect, useState } from 'react'
import { mount, render } from 'enzyme'
import CodeHighlighter from '../src'


describe('basic rendering case', () => {
  const errorLogger = jest
    .spyOn(global.console, 'error')
    .mockImplementation((...args) => {
      throw new Error(args.join(' '))
    })

  afterAll(() => {
    errorLogger.mockRestore()
  })

  it('test lineno change', () => {
    function Wrapper() {
      const [code, setCode] = useState<string>('let a: number = 1 + 2;')
      const [lineCount, setLineCount] = useState<number>(0)
      const lineNoWidth = `${ Math.max(2, ('' + lineCount).length) + 0.5 }em`

      useEffect(() => {
        const nextCode = (
          'let a = 1, b = 2\n' +
          Array.from(new Array(100)).map((x, i) => '// ' + i).join('\n') +
          '\nlet c = 3\nconsole.log(\'c:\', c)'
        )
        setCode(nextCode)
      }, [])

      return (
        <pre data-line-count={ lineCount }>
          <CodeHighlighter
            lang="typescript"
            value={ code }
            linenoWidth={ lineNoWidth }
            onLineCountChange={ setLineCount }
          />
        </pre>
      )
    }

    const wrapper = mount(<Wrapper />)
    expect(wrapper.getDOMNode().getAttribute('data-line-count')).toEqual(String(103))

    const lines = wrapper.find({ linenoWidth: '2.5em' })
    for (let i = 0; i < lines.length; ++i) {
      const line = lines[i]
      const s = getComputedStyle(line.getDOMNode())
      expect(s.width).toEqual('3.5em')
    }
  })

  it('snapshot', () => {
    const wrapper = render(
      <pre>
        <CodeHighlighter
          lang="typescript"
          value="let a: number = 1 + 2;"
          linenoWidth="2em"
        />
      </pre>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
