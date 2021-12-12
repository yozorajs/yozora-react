import { mount } from 'enzyme'
import React from 'react'
import CodeRendererJsx from '../src'

describe('basic rendering case', () => {
  const errorLogger = jest
    .spyOn(global.console, 'error')
    .mockImplementation((...args) => {
      throw new Error(args.join(' '))
    })

  afterAll(() => {
    errorLogger.mockRestore()
  })

  it('snapshot', () => {
    function Wrapper(props: {
      code: string
      inline: boolean
    }): React.ReactElement {
      const [error, setError] = React.useState<any>(null)
      return (
        <div>
          <CodeRendererJsx
            code={props.code}
            inline={props.inline}
            onError={setError}
          />
          <pre>{error}</pre>
        </div>
      )
    }

    const inlineCode = `
      (
        <div>
          <span>Hello, world</span>
        </div>
      )
    `
    expect(mount(<Wrapper code={inlineCode} inline={true} />)).toMatchSnapshot(
      'inline code',
    )

    const blockCode = `
      const Container = styled.div\`
        background: hsl(0deg, 10%, 90%);
      \`

      render(
        <Container>
          <span style={{ color: 'orange' }}>Hello, world</span>
        </Container>
      )
    `
    expect(mount(<Wrapper code={blockCode} inline={false} />)).toMatchSnapshot(
      'block code',
    )

    const badCode = `
      (<div>hello</div>)
    `
    expect(mount(<Wrapper code={badCode} inline={false} />)).toMatchSnapshot(
      'bad code',
    )
  })
})
