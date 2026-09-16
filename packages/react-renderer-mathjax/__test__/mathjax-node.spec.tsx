import { render, waitFor } from '@testing-library/react'
import React from 'react'
import type { IMathJax } from '../src'
import { MathJaxNodeWithoutContext, TexLang } from '../src'

interface IMathJaxMock extends IMathJax {
  typesetClear: ReturnType<typeof vi.fn>
  typesetPromise: ReturnType<typeof vi.fn>
}

function createMathJax(): IMathJaxMock {
  return {
    typesetClear: vi.fn(),
    typesetPromise: vi.fn().mockResolvedValue(undefined),
  } as unknown as IMathJaxMock
}

describe('MathJaxNodeWithoutContext', () => {
  test('clears tracked math before updates and unmounting', async () => {
    const MathJax = createMathJax()
    const view = render(
      <MathJaxNodeWithoutContext
        MathJax={MathJax}
        language={TexLang.TEX}
        formula="x"
        inline={false}
      />,
    )
    const node = view.container.firstElementChild

    await waitFor(() => expect(MathJax.typesetPromise).toHaveBeenCalledWith([node]))

    view.rerender(
      <MathJaxNodeWithoutContext
        MathJax={MathJax}
        language={TexLang.TEX}
        formula="y"
        inline={false}
      />,
    )

    await waitFor(() => expect(MathJax.typesetPromise).toHaveBeenCalledTimes(2))
    expect(MathJax.typesetClear).toHaveBeenCalledWith([node])

    view.unmount()
    expect(MathJax.typesetClear).toHaveBeenCalledTimes(2)
    expect(MathJax.typesetClear).toHaveBeenLastCalledWith([node])
  })
})
