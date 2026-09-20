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
  test.each([true, false])(
    'retries a corrected formula after an error (inline=%s)',
    async inline => {
      const MathJax = createMathJax()
      MathJax.typesetPromise
        .mockRejectedValueOnce(new Error('font loading failed'))
        .mockImplementationOnce(async ([node]: HTMLElement[]) => {
          expect(node.isConnected).toBe(true)
          expect(node.tagName).toBe(inline ? 'SPAN' : 'DIV')
          expect(node.textContent).toBe(inline ? '$x^2$' : '$$x^2$$')
          node.textContent = 'typeset x squared'
        })
      const props = {
        MathJax,
        language: TexLang.TEX,
        inline,
        className: 'equation',
        style: { color: 'red' },
      }
      const view = render(<MathJaxNodeWithoutContext {...props} formula="x" />)
      await view.findByText('Typesetting failed: font loading failed')

      view.rerender(<MathJaxNodeWithoutContext {...props} formula="x^2" />)

      const result = await view.findByText('typeset x squared')
      expect(result).toHaveClass('equation')
      expect(result).toHaveStyle({ color: 'rgb(255, 0, 0)' })
      expect(view.queryByText(/Typesetting failed/)).not.toBeInTheDocument()
      expect(MathJax.typesetPromise).toHaveBeenCalledTimes(2)
      view.unmount()
      expect(MathJax.typesetClear).toHaveBeenLastCalledWith([result])
    },
  )

  test('retries after an error when switching display mode', async () => {
    const MathJax = createMathJax()
    MathJax.typesetPromise
      .mockRejectedValueOnce(new Error('layout failed'))
      .mockImplementationOnce(async ([node]: HTMLElement[]) => {
        expect(node.tagName).toBe('SPAN')
        expect(node.textContent).toBe('$x$')
        node.textContent = 'inline result'
      })
    const view = render(
      <MathJaxNodeWithoutContext
        MathJax={MathJax}
        language={TexLang.TEX}
        formula="x"
        inline={false}
      />,
    )
    await view.findByText('Typesetting failed: layout failed')
    view.rerender(
      <MathJaxNodeWithoutContext
        MathJax={MathJax}
        language={TexLang.TEX}
        formula="x"
        inline={true}
      />,
    )
    expect(await view.findByText('inline result')).toBeInTheDocument()
    expect(MathJax.typesetPromise).toHaveBeenCalledTimes(2)
  })

  test('retries with a replacement MathJax instance after an error', async () => {
    const previous = createMathJax()
    previous.typesetPromise.mockRejectedValue(new Error('engine failed'))
    const replacement = createMathJax()
    replacement.typesetPromise.mockImplementation(async ([node]: HTMLElement[]) => {
      expect(node.isConnected).toBe(true)
      node.textContent = 'replacement result'
    })
    const view = render(
      <MathJaxNodeWithoutContext
        MathJax={previous}
        language={TexLang.TEX}
        formula="x"
        inline={false}
      />,
    )
    await view.findByText('Typesetting failed: engine failed')
    view.rerender(
      <MathJaxNodeWithoutContext
        MathJax={replacement}
        language={TexLang.TEX}
        formula="x"
        inline={false}
      />,
    )
    expect(await view.findByText('replacement result')).toBeInTheDocument()
    expect(previous.typesetPromise).toHaveBeenCalledTimes(1)
    expect(replacement.typesetPromise).toHaveBeenCalledTimes(1)
  })

  test('retains repeated failures without automatic retry and recovers on a later correction', async () => {
    const MathJax = createMathJax()
    MathJax.typesetPromise
      .mockRejectedValueOnce(new Error('first failure'))
      .mockRejectedValueOnce(new Error('second failure'))
      .mockImplementationOnce(async ([node]: HTMLElement[]) => {
        node.textContent = 'recovered result'
      })
    const props = { MathJax, language: TexLang.TEX, inline: false }
    const view = render(<MathJaxNodeWithoutContext {...props} formula="x" />)
    await view.findByText('Typesetting failed: first failure')
    view.rerender(<MathJaxNodeWithoutContext {...props} formula="x" className="new-class" />)
    expect(view.getByText('Typesetting failed: first failure')).toBeInTheDocument()
    expect(MathJax.typesetPromise).toHaveBeenCalledTimes(1)

    view.rerender(<MathJaxNodeWithoutContext {...props} formula="y" />)
    await view.findByText('Typesetting failed: second failure')
    expect(MathJax.typesetPromise).toHaveBeenCalledTimes(2)

    view.rerender(<MathJaxNodeWithoutContext {...props} formula="z" />)
    expect(await view.findByText('recovered result')).toBeInTheDocument()
    expect(MathJax.typesetPromise).toHaveBeenCalledTimes(3)
  })

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
