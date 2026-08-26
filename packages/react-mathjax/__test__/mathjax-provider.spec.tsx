import { render, waitFor } from '@testing-library/react'
import React from 'react'
import { MathJaxContextType, MathJaxProvider } from '../src'

const DEFAULT_MATHJAX_SRC = 'https://cdn.jsdelivr.net/npm/mathjax@4.1.3/tex-mml-chtml.js'

describe('MathJaxProvider', () => {
  test('loads MathJax 4 from the default CDN', async () => {
    const ContextConsumer: React.FC = () => {
      const { MathJax } = React.useContext(MathJaxContextType)
      return <span>{MathJax ? 'ready' : 'missing'}</span>
    }

    const view = render(
      <MathJaxProvider loading={<span>loading</span>}>
        <ContextConsumer />
      </MathJaxProvider>,
    )

    expect(view.getByText('loading')).toBeInTheDocument()

    const script = await waitFor(() => {
      const element = document.querySelector<HTMLScriptElement>(
        `script[src="${DEFAULT_MATHJAX_SRC}"]`,
      )
      expect(element).not.toBeNull()
      return element as HTMLScriptElement
    })

    const mathJax = { texReset: vi.fn() }
    ;(window as any).MathJax = mathJax
    script.dispatchEvent(new Event('load'))

    await waitFor(() => expect(view.getByText('ready')).toBeInTheDocument())

    view.unmount()
    await waitFor(() => expect(mathJax.texReset).toHaveBeenCalledOnce())
    script.remove()
    delete (window as any).MathJax
  })
})
