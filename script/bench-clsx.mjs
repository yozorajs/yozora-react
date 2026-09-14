import assert from 'node:assert/strict'
import path from 'node:path'
import { performance } from 'node:perf_hooks'
import { pathToFileURL } from 'node:url'
import { clsx } from '../packages/react-core/src/util/clsx.ts'

function collectAndJoin(...values) {
  const names = []
  function collect(items) {
    for (const value of items) {
      if (!value) continue
      if (typeof value === 'string' || typeof value === 'number') names.push(value)
      else if (Array.isArray(value)) collect(value)
      else if (typeof value === 'object') {
        for (const key of Object.keys(value)) {
          if (key && value[key]) names.push(key)
        }
      }
    }
  }
  collect(values)
  return names.join(' ')
}

const flat = Array.from({ length: 128 }, (_, i) => [
  'yozora-code-live',
  'yozora-code-live__container',
  i % 2 === 0 && 'active',
  i % 3 === 0 ? 'custom-' + i : undefined,
])
const mixed = flat.map((values, i) => [
  values[0],
  [values[1], [values[2], null]],
  { selected: i % 2 === 0, disabled: i % 3 === 0 },
  values[3],
])
const cases = [
  {
    name: 'short',
    inputs: flat.map(values => ['button', values[2], values[3]]),
    baseline: (...values) => values.filter(Boolean).join(' '),
  },
  { name: 'flat', inputs: flat, baseline: (...values) => values.filter(Boolean).join(' ') },
  {
    name: 'objects',
    inputs: flat.map((_, i) => [
      { button: true, active: i % 2 === 0, disabled: i % 3 === 0, rounded: i % 5 === 0 },
    ]),
    baseline: collectAndJoin,
  },
  {
    name: 'arrays',
    inputs: flat.map(values => [[values[0], [values[1], [false, values[2]]]], [values[3]]]),
    baseline: collectAndJoin,
  },
  { name: 'mixed', inputs: mixed, baseline: collectAndJoin },
]

// Optional local ESM modules let the same benchmark compare saved or official implementations.
const comparisons = await Promise.all(
  process.argv.slice(2).map(async file => {
    const module = await import(pathToFileURL(path.resolve(file)).href)
    assert.equal(typeof module.clsx, 'function', `${file}: expected a named clsx export`)
    return { name: path.basename(file), fn: module.clsx }
  }),
)

const iterations = 500_000
const samples = 9
let checksum = 0
function measure(fn, inputs, count) {
  const start = performance.now()
  let length = 0
  for (let i = 0; i < count; ++i) {
    const result = fn(...inputs[i % inputs.length])
    // Read a character so concatenated strings must be materialized, as in DOM usage.
    length += result.length + result.charCodeAt(result.length >> 1)
  }
  checksum += length
  return ((performance.now() - start) * 1e6) / count
}

console.log(`Node ${process.version}; ${samples} samples of ${iterations} calls; median ns/call`)
for (const { name, inputs, baseline } of cases) {
  const implementations = [
    { name: 'collect/filter + join', fn: baseline },
    { name: 'yozora', fn: clsx },
    ...comparisons,
  ]
  const timings = implementations.map(() => [])
  for (const { fn } of implementations) {
    for (const args of inputs) assert.equal(fn(...args), baseline(...args))
    measure(fn, inputs, 100_000)
  }
  for (let sample = 0; sample < samples; ++sample) {
    // Rotate execution order to reduce warm-up and scheduling bias.
    for (let i = 0; i < implementations.length; ++i) {
      const index = (i + sample) % implementations.length
      timings[index].push(measure(implementations[index].fn, inputs, iterations))
    }
  }
  const medians = timings.map(values => values.sort((a, b) => a - b)[samples >> 1])
  console.log(name)
  console.table(
    implementations.map(({ name: implementation }, i) => ({
      implementation,
      'ns/call': medians[i].toFixed(1),
      'baseline / implementation': (medians[0] / medians[i]).toFixed(2) + 'x',
    })),
  )
}
console.log(`checksum: ${checksum}`)
