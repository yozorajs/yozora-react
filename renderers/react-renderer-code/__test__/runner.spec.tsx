import { fireEvent, render } from '@testing-library/react'
import { EcmaImportType, MathType } from '@yozora/ast'
import { CodeRendererJsx } from '@yozora/react-embed-jsx'
import type { ICodeRunnerScope } from '@yozora/react-renderer'
import React from 'react'
import { vi } from 'vitest'
import {
  Code,
  CodeEmbed,
  createGraphvizRunner,
  createMathRunner,
  createUseJsxRunner,
  dynamicImport,
} from '../src'

describe('runner integration', () => {
  test('passes Graphviz metadata and reports renderer errors through CodeEmbed', () => {
    const GraphvizRunner = createGraphvizRunner(({ code, engine, onError }) => (
      <div>
        <output data-testid="graphviz" data-engine={engine}>
          {code}
        </output>
        <button type="button" onClick={() => onError?.('Invalid graph')}>
          fail
        </button>
      </div>
    ))
    const view = render(
      <CodeEmbed
        lang="dot"
        value="digraph {}"
        meta={{ engine: 'neato' }}
        runner={GraphvizRunner}
      />,
    )
    expect(view.getByTestId('graphviz')).toHaveTextContent('digraph {}')
    expect(view.getByTestId('graphviz')).toHaveAttribute('data-engine', 'neato')

    fireEvent.click(view.getByRole('button', { name: 'fail' }))
    expect(view.getByText('Invalid graph')).toBeInTheDocument()
    expect(view.queryByTestId('graphviz')).not.toBeInTheDocument()
  })

  test('uses a math runner through Code and strips surrounding delimiters', () => {
    const MathRunner = createMathRunner(({ type, value }) => (
      <output data-testid="math" data-type={type}>
        {value}
      </output>
    ))
    const view = render(
      <Code
        lang="latex"
        meta="embed"
        value="  $$ x^2 + y^2 $$  "
        runners={[{ title: 'math', pattern: /^latex$/, runner: MathRunner }]}
      />,
    )
    expect(view.getByTestId('math')).toHaveTextContent('x^2 + y^2')
    expect(view.getByTestId('math')).toHaveAttribute('data-type', MathType)
  })

  test('creates an interactive JSX runner with its preset scope', () => {
    const useJsxRunner = createUseJsxRunner({
      presetJsxScope: { React, label: 'preset' },
      rules: [],
      JsxRenderer: CodeRendererJsx,
      defaultRenderMode: 'inline',
    })
    const code = `function Demo() {
      const [count, setCount] = React.useState(0)
      return <button onClick={() => setCount(c => c + 1)}>{label}: {count}</button>
    }`
    function Preview(): React.ReactElement {
      const JsxRunner = useJsxRunner([])
      return <CodeEmbed lang="jsx" value={code} runner={JsxRunner} />
    }
    const view = render(<Preview />)
    fireEvent.click(view.getByRole('button', { name: 'preset: 0' }))
    expect(view.getByRole('button', { name: 'preset: 1' })).toBeInTheDocument()
  })

  test('loads default and aliased named components from a JSX import', async () => {
    const scope: ICodeRunnerScope = {}
    const load = vi.fn(async () => ({
      default: () => <span>default widget</span>,
      Badge: () => <span>named badge</span>,
    }))
    const pending = dynamicImport(
      {
        type: EcmaImportType,
        moduleName: './widgets.tsx',
        defaultImport: 'Widget',
        namedImports: [{ src: 'Badge', alias: 'Label' }],
      },
      scope,
      [
        {
          regex: /^\.\/widgets\.tsx$/,
          importFunc: () => load,
        },
      ],
    )
    expect(pending).toBeNull()
    expect(load).not.toHaveBeenCalled()
    const Widget = scope.Widget as React.ComponentType
    const Label = scope.Label as React.ComponentType
    const view = render(
      <>
        <Widget />
        <Label />
      </>,
    )
    expect(await view.findByText('default widget')).toBeInTheDocument()
    expect(await view.findByText('named badge')).toBeInTheDocument()
    expect(load).toHaveBeenCalledTimes(1)
  })

  test('loads JavaScript named imports without mounting a component', async () => {
    const scope: ICodeRunnerScope = {}
    const pending = dynamicImport(
      {
        type: EcmaImportType,
        moduleName: './data.ts',
        defaultImport: null,
        namedImports: [{ src: 'answer', alias: 'value' }],
      },
      scope,
      [{ regex: /^\.\/data\.ts$/, importFunc: () => async () => ({ answer: 42 }) }],
    )
    expect(pending).toBeInstanceOf(Promise)
    expect(scope.value).toBeUndefined()
    await pending
    expect(scope.value).toBe(42)
  })
})
