import { render } from 'enzyme'
import React from 'react'
import type { TableProps } from '../src'
import Table from '../src'

const aligns: TableProps['aligns'] = ['center', 'left']

const ths: React.ReactNode[] = ['Name', 'Age']

const tds: React.ReactNode[][] = [
  ['Alice', 18],
  ['Bob', 19],
]

describe('prop types', function () {
  beforeEach(() => {
    jest.spyOn(global.console, 'error').mockImplementation((...args) => {
      throw new Error(args.join(' '))
    })
  })

  describe('className is optional', () => {
    it('default', function () {
      const node = render(<Table aligns={aligns} ths={ths} tds={tds} />)
      expect(node.hasClass('yozora-table')).toBeTruthy()
    })

    it('custom', function () {
      const node = render(
        <Table aligns={aligns} ths={ths} tds={tds} className="my-table" />,
      )

      expect(node.hasClass('yozora-table')).toBeTruthy()
      expect(node.hasClass('my-table')).toBeTruthy()
    })
  })

  it('style is optional', function () {
    const node = render(
      <Table aligns={aligns} ths={ths} tds={tds} style={{ color: 'orange' }} />,
    )
    expect(node.css('color')).toEqual('orange')
  })
})

it('snapshot', function () {
  const wrapper = render(
    <Table
      aligns={aligns}
      ths={ths}
      tds={tds}
      style={{ color: 'orange', fontSize: '16px' }}
    />,
  )
  expect(wrapper).toMatchSnapshot()
})
