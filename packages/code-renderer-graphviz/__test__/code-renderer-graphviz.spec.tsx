import { mount } from 'enzyme'
import React from 'react'
import CodeRendererGraphviz from '../src'

describe('basic rendering case', () => {
  beforeAll(() => {
    /**
     * Mock out the `getTotalLength` method for SVG as this is not currently
     * implemented by JSDOM.
     *
     * @see https://github.com/jsdom/jsdom/issues/1330
     * @see https://github.com/jsdom/jsdom/issues/1423
     */
    ;(SVGElement.prototype as any).getTotalLength = jest.fn()

    /**
     * Intercepting error messages and throw it as an unexpected error.
     */
    jest.spyOn(global.console, 'error').mockImplementation((...args) => {
      throw new Error(args.join(' '))
    })
  })

  it('snapshot', () => {
    const code = `
      digraph finite_state_machine {
        rankdir=LR;
        size="8,5"
        node [shape = doublecircle]; 0 3 4 8;
        node [shape = circle];
        0 -> 2 [label = "SS(B)"];
        0 -> 1 [label = "SS(S)"];
        1 -> 3 [label = "S($end)"];
        2 -> 6 [label = "SS(b)"];
        2 -> 5 [label = "SS(a)"];
        2 -> 4 [label = "S(A)"];
        5 -> 7 [label = "S(b)"];
        5 -> 5 [label = "S(a)"];
        6 -> 6 [label = "S(b)"];
        6 -> 5 [label = "S(a)"];
        7 -> 8 [label = "S(b)"];
        7 -> 5 [label = "S(a)"];
        8 -> 6 [label = "S(b)"];
        8 -> 5 [label = "S(a)"];
      }
    `

    expect(mount(<CodeRendererGraphviz code={code} />)).toMatchSnapshot(
      'finite state machine',
    )
  })
})
