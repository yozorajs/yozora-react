import { act, render, waitFor } from '@testing-library/react'
import React from 'react'
import MermaidRenderer from '../src'

const { engine, gate, started } = vi.hoisted(() => ({
  engine: {
    startOnLoad: true,
    initialize: vi.fn(),
    render: vi.fn(),
    run: vi.fn(),
  },
  gate: Promise.withResolvers<void>(),
  started: vi.fn(),
}))

/** Mermaid installs this listener when its module is first evaluated. */
function onLoad(): void {
  if (engine.startOnLoad) engine.run()
}

vi.mock('mermaid', async () => {
  started()
  await gate.promise
  window.addEventListener('load', onLoad)
  return { default: engine }
})

test('disables auto-start when the first import finishes after unmount', async () => {
  const onError = vi.fn()
  const view = render(<MermaidRenderer code="flowchart LR; A-->B" onError={onError} />)
  try {
    await waitFor(() => expect(started).toHaveBeenCalledOnce())
    view.unmount()
    await act(async () => {
      gate.resolve()
      await vi.dynamicImportSettled()
    })
    window.dispatchEvent(new Event('load'))
    expect(engine.run).not.toHaveBeenCalled()
    expect(engine.initialize).not.toHaveBeenCalled()
    expect(engine.render).not.toHaveBeenCalled()
    expect(onError).not.toHaveBeenCalled()
    expect(view.container).toBeEmptyDOMElement()
  } finally {
    gate.resolve()
    await vi.dynamicImportSettled()
    window.removeEventListener('load', onLoad)
    view.unmount()
  }
})
