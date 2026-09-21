import { constrainCrop, dragCrop, rotatedSize, sourcePoint } from '../../src/preview/geometry'

test.each([
  [0, 40, 15],
  [90, 85, 40],
  [180, 160, 85],
  [270, 15, 160],
])('maps a stretched point back to source coordinates at %i degrees', (rotation, x, y) => {
  const transform = { rotation, stretchX: 2, stretchY: 0.5 }
  expect(sourcePoint(x, y, 100, 200, transform)).toEqual({ x: 20, y: 30 })
  expect(rotatedSize(100, 200, transform)).toEqual(
    rotation % 180 === 0 ? { width: 200, height: 100 } : { width: 100, height: 200 },
  )
})

test('constrains crop dimensions and position to the image', () => {
  expect(constrainCrop({ x: -10, y: 400, width: 500, height: 0 }, 100, 200)).toEqual({
    x: 0,
    y: 199,
    width: 100,
    height: 1,
  })
})

test('draws in either direction and moves without changing the crop size', () => {
  const rect = { x: 10, y: 20, width: 30, height: 40 }
  expect(dragCrop(rect, { x: 80, y: 90 }, { x: 20, y: 10 }, 'new', 100, 100)).toEqual({
    x: 20,
    y: 10,
    width: 60,
    height: 80,
  })
  expect(dragCrop(rect, { x: 15, y: 25 }, { x: 100, y: 100 }, 'move', 100, 100)).toEqual({
    x: 70,
    y: 60,
    width: 30,
    height: 40,
  })
})

test.each([
  ['nw', { x: 5, y: 15, width: 35, height: 45 }],
  ['ne', { x: 10, y: 15, width: 25, height: 45 }],
  ['sw', { x: 5, y: 20, width: 35, height: 35 }],
  ['se', { x: 10, y: 20, width: 25, height: 35 }],
] as const)('resizes the %s corner, keeping the opposite corner fixed', (corner, expected) => {
  const rect = { x: 10, y: 20, width: 30, height: 40 }
  expect(dragCrop(rect, { x: 10, y: 10 }, { x: 5, y: 5 }, corner, 100, 100)).toEqual(expected)
})

test('a resize cannot invert a selection or escape the source bounds', () => {
  const rect = { x: 10, y: 20, width: 30, height: 40 }
  expect(dragCrop(rect, { x: 0, y: 0 }, { x: 200, y: 200 }, 'nw', 100, 100)).toEqual({
    x: 39,
    y: 59,
    width: 1,
    height: 1,
  })
  expect(dragCrop(rect, { x: 0, y: 0 }, { x: 200, y: 200 }, 'se', 100, 100)).toEqual({
    x: 10,
    y: 20,
    width: 90,
    height: 80,
  })
})
