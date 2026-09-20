import { act, render, waitFor } from '@testing-library/react'
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

function createPendingTypeset(): {
  promise: Promise<void>
  resolve(): void
  reject(error: Error): void
} {
  let resolve!: () => void
  let reject!: (error: Error) => void
  const promise = new Promise<void>((resolve0, reject0) => {
    resolve = resolve0
    reject = reject0
  })
  return { promise, resolve, reject }
}

describe('MathJaxNodeWithoutContext', () => {
  test('preserves pending output in its old container until MathJax can clear it', async () => {
    const MathJax = createMathJax()
    const pending = createPendingTypeset()
    const oldOutput = document.createElement('span')
    const clearedOutput: boolean[] = []
    oldOutput.textContent = 'old typeset result'
    MathJax.typesetPromise
      .mockImplementationOnce(([node]: HTMLElement[]) => {
        node.replaceChildren(oldOutput)
        return pending.promise
      })
      .mockImplementationOnce(async ([node]: HTMLElement[]) => {
        node.textContent = 'latest result'
      })
    MathJax.typesetClear.mockImplementation(([node]: HTMLElement[]) => {
      clearedOutput.push(node.contains(oldOutput))
    })
    const props = { MathJax, language: TexLang.TEX, inline: true }
    const view = render(<MathJaxNodeWithoutContext {...props} formula="x" />)
    const oldNode = view.container.firstElementChild!
    view.rerender(<MathJaxNodeWithoutContext {...props} formula="y" />)
    expect(oldNode.contains(oldOutput)).toBe(true)
    await act(async () => pending.resolve())
    expect(MathJax.typesetClear).toHaveBeenCalledWith([oldNode])
    expect(clearedOutput).toEqual([true])
    expect(view.getByText('latest result')).toBeInTheDocument()
  })

  test('reports the latest queued failure and still recovers after another correction', async () => {
    const MathJax = createMathJax()
    const first = createPendingTypeset()
    const second = createPendingTypeset()
    MathJax.typesetPromise
      .mockReturnValueOnce(first.promise)
      .mockReturnValueOnce(second.promise)
      .mockImplementationOnce(async ([node]: HTMLElement[]) => {
        expect(node.textContent).toBe('$z$')
        node.textContent = 'recovered result'
      })
    const props = { MathJax, language: TexLang.TEX, inline: true }
    const view = render(<MathJaxNodeWithoutContext {...props} formula="x" />)
    view.rerender(<MathJaxNodeWithoutContext {...props} formula="y" />)
    await act(async () => first.resolve())
    await act(async () => second.reject(new Error('latest failure')))
    expect(view.getByText('Typesetting failed: latest failure')).toBeInTheDocument()
    expect(MathJax.typesetPromise).toHaveBeenCalledTimes(2)
    view.rerender(<MathJaxNodeWithoutContext {...props} formula="z" />)
    expect(await view.findByText('recovered result')).toBeInTheDocument()
    expect(MathJax.typesetPromise).toHaveBeenCalledTimes(3)
  })

  test('preserves an in-flight job when only presentation changes', async () => {
    const MathJax = createMathJax()
    const pending = createPendingTypeset()
    MathJax.typesetPromise.mockReturnValueOnce(pending.promise)
    const props = { MathJax, language: TexLang.TEX, inline: true, formula: 'x' }
    const view = render(<MathJaxNodeWithoutContext {...props} />)
    const node = view.container.firstElementChild!
    view.rerender(
      <MathJaxNodeWithoutContext {...props} className="changed" style={{ color: 'red' }} />,
    )
    await act(async () => {
      node.textContent = 'completed result'
      pending.resolve()
    })
    expect(view.getByText('completed result')).toHaveClass('changed')
    expect(MathJax.typesetPromise).toHaveBeenCalledTimes(1)
    expect(MathJax.typesetClear).not.toHaveBeenCalled()
  })

  test('keeps StrictMode remount jobs serial and cleans the obsolete job', async () => {
    const MathJax = createMathJax()
    const pending = createPendingTypeset()
    MathJax.typesetPromise
      .mockReturnValueOnce(pending.promise)
      .mockImplementationOnce(async ([node]: HTMLElement[]) => {
        node.textContent = 'remounted result'
      })
    const view = render(
      <React.StrictMode>
        <MathJaxNodeWithoutContext
          MathJax={MathJax}
          language={TexLang.TEX}
          formula="x"
          inline={true}
        />
      </React.StrictMode>,
    )
    expect(MathJax.typesetPromise).toHaveBeenCalledTimes(1)
    expect(MathJax.typesetClear).not.toHaveBeenCalled()
    await act(async () => pending.resolve())
    expect(view.getByText('remounted result')).toBeInTheDocument()
    expect(MathJax.typesetPromise).toHaveBeenCalledTimes(2)
    expect(MathJax.typesetClear).toHaveBeenCalledTimes(1)
  })

  test('releases the active job when typesetPromise throws synchronously', async () => {
    const MathJax = createMathJax()
    MathJax.typesetPromise
      .mockImplementationOnce(() => {
        throw new Error('synchronous failure')
      })
      .mockImplementationOnce(async ([node]: HTMLElement[]) => {
        node.textContent = 'retry result'
      })
    const props = { MathJax, language: TexLang.TEX, inline: false }
    const view = render(<MathJaxNodeWithoutContext {...props} formula="x" />)
    await view.findByText('Typesetting failed: synchronous failure')
    view.rerender(<MathJaxNodeWithoutContext {...props} formula="y" />)
    expect(await view.findByText('retry result')).toBeInTheDocument()
    expect(MathJax.typesetPromise).toHaveBeenCalledTimes(2)
  })

  test('serializes updates and coalesces pending formulas to the latest value', async () => {
    const MathJax = createMathJax()
    const first = createPendingTypeset()
    const second = createPendingTypeset()
    const submissions: string[] = []
    const nodes: HTMLElement[] = []
    MathJax.typesetPromise
      .mockImplementationOnce(([node]: HTMLElement[]) => {
        nodes.push(node)
        submissions.push(node.textContent ?? '')
        return first.promise
      })
      .mockImplementationOnce(([node]: HTMLElement[]) => {
        nodes.push(node)
        submissions.push(node.textContent ?? '')
        return second.promise
      })
      .mockImplementationOnce(async ([node]: HTMLElement[]) => {
        submissions.push(node.textContent ?? '')
        node.textContent = 'latest result'
      })
    const props = { MathJax, language: TexLang.TEX, inline: true }
    const view = render(<MathJaxNodeWithoutContext {...props} formula="x" />)
    const node = view.container.firstElementChild!
    view.rerender(<MathJaxNodeWithoutContext {...props} formula="y" />)
    view.rerender(<MathJaxNodeWithoutContext {...props} formula="z" />)
    expect(submissions).toEqual(['$x$'])
    expect(MathJax.typesetClear).not.toHaveBeenCalled()

    await act(async () => {
      node.textContent = 'obsolete x output'
      first.resolve()
    })
    expect(submissions).toEqual(['$x$', '$z$'])
    expect(MathJax.typesetClear).toHaveBeenCalledWith([node])
    view.rerender(<MathJaxNodeWithoutContext {...props} formula="last" />)
    await act(async () => {
      nodes[1].textContent = 'obsolete z output'
      second.resolve()
    })
    expect(submissions).toEqual(['$x$', '$z$', '$last$'])
    expect(view.getByText('latest result')).toBeInTheDocument()
  })

  test('discards an obsolete rejection and typesets the newer formula', async () => {
    const MathJax = createMathJax()
    const first = createPendingTypeset()
    MathJax.typesetPromise
      .mockReturnValueOnce(first.promise)
      .mockImplementationOnce(async ([node]: HTMLElement[]) => {
        expect(node.textContent).toBe('$$y$$')
        node.textContent = 'new result'
      })
    const props = { MathJax, language: TexLang.TEX, inline: false }
    const view = render(<MathJaxNodeWithoutContext {...props} formula="x" />)
    view.rerender(<MathJaxNodeWithoutContext {...props} formula="y" />)
    await act(async () => first.reject(new Error('obsolete error')))
    expect(view.getByText('new result')).toBeInTheDocument()
    expect(view.queryByText(/obsolete error/)).not.toBeInTheDocument()
    expect(MathJax.typesetPromise).toHaveBeenCalledTimes(2)
  })

  test('cleans the old engine and node before using a replacement during a pending job', async () => {
    const previous = createMathJax()
    const replacement = createMathJax()
    const first = createPendingTypeset()
    previous.typesetPromise.mockReturnValueOnce(first.promise)
    const events: string[] = []
    previous.typesetClear.mockImplementation(() => events.push('clear previous'))
    replacement.typesetPromise.mockImplementation(async ([node]: HTMLElement[]) => {
      events.push('typeset replacement')
      expect(node.isConnected).toBe(true)
      expect(node.tagName).toBe('SPAN')
      expect(node.textContent).toBe('$y$')
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
    const oldNode = view.container.firstElementChild!
    view.rerender(
      <MathJaxNodeWithoutContext
        MathJax={replacement}
        language={TexLang.TEX}
        formula="y"
        inline={true}
      />,
    )
    const newNode = view.container.firstElementChild!
    expect(newNode).not.toBe(oldNode)
    expect(replacement.typesetPromise).not.toHaveBeenCalled()
    await act(async () => first.resolve())
    expect(events).toEqual(['clear previous', 'typeset replacement'])
    expect(previous.typesetClear).toHaveBeenCalledWith([oldNode])
    expect(view.getByText('replacement result')).toBe(newNode)
    view.unmount()
    expect(replacement.typesetClear).toHaveBeenLastCalledWith([newNode])
  })

  test.each(['resolve', 'reject'] as const)(
    'only cleans up when a pending job settles after unmount (%s)',
    async outcome => {
      const MathJax = createMathJax()
      const pending = createPendingTypeset()
      MathJax.typesetPromise.mockReturnValueOnce(pending.promise)
      const props = { MathJax, language: TexLang.TEX, inline: false }
      const view = render(<MathJaxNodeWithoutContext {...props} formula="x" />)
      const node = view.container.firstElementChild!
      view.rerender(<MathJaxNodeWithoutContext {...props} formula="y" />)
      view.unmount()
      expect(MathJax.typesetClear).not.toHaveBeenCalled()
      await act(async () => {
        if (outcome === 'resolve') {
          node.textContent = 'late result'
          pending.resolve()
        } else {
          pending.reject(new Error('late failure'))
        }
      })
      expect(MathJax.typesetPromise).toHaveBeenCalledTimes(1)
      expect(MathJax.typesetClear).toHaveBeenCalledTimes(1)
      expect(MathJax.typesetClear).toHaveBeenCalledWith([node])
      expect(view.container).toBeEmptyDOMElement()
    },
  )

  test('treats a return to the original formula as a new request', async () => {
    const MathJax = createMathJax()
    const first = createPendingTypeset()
    MathJax.typesetPromise
      .mockReturnValueOnce(first.promise)
      .mockImplementationOnce(async ([node]: HTMLElement[]) => {
        expect(node.textContent).toBe('$x$')
        node.textContent = 'fresh x result'
      })
    const props = { MathJax, language: TexLang.TEX, inline: true }
    const view = render(<MathJaxNodeWithoutContext {...props} formula="x" />)
    view.rerender(<MathJaxNodeWithoutContext {...props} formula="y" />)
    view.rerender(<MathJaxNodeWithoutContext {...props} formula="x" />)
    await act(async () => first.reject(new Error('obsolete x failure')))
    expect(view.getByText('fresh x result')).toBeInTheDocument()
    expect(MathJax.typesetPromise).toHaveBeenCalledTimes(2)
  })

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
    const updatedNode = view.container.firstElementChild

    view.unmount()
    expect(MathJax.typesetClear).toHaveBeenCalledTimes(2)
    expect(MathJax.typesetClear).toHaveBeenLastCalledWith([updatedNode])
  })
})
