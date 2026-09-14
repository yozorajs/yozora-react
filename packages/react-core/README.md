# @yozora/react-core

Shared theme tokens, code-runner contracts, and utilities for Yozora React.

```ts
import { CommonTokenNames, TokenNames, clsx, parseCodeMeta, tokens } from '@yozora/react-core'
import type { ICodeMetaData, ICodeRunner, ICodeRunnerProps } from '@yozora/react-core'
```

## Migration

This package replaces `@yozora/core-react-constant`, `@yozora/core-react-types`, and
`@yozora/core-react-util`. Update dependencies and import specifiers to
`@yozora/react-core`; existing exported names and behavior are preserved. ESM,
CommonJS, and TypeScript declarations are available through the package root.

Source modules are grouped under `constant`, `types`, and `util` inside the package.
The public import entry is `@yozora/react-core`.

## Class names

```tsx
import { clsx } from '@yozora/react-core'

clsx('button', ['rounded', false], { active: true }) // 'button rounded active'
```

`clsx(...values)` accepts strings, numbers, booleans, null, undefined, conditional
objects, and readonly nested arrays. Falsy values (including `0` and `NaN`) and
booleans are ignored. Objects contribute their own enumerable nonempty string keys
whose values are truthy; inherited and symbol keys are ignored. Arrays must be acyclic.

Input order, duplicates, and existing whitespace are preserved. It does not merge
conflicting Tailwind utilities. `ClassValue` and `IClassDictionary` are exported for
typed wrappers. The implementation concatenates directly without intermediate
filtered or flattened arrays and adds no dependencies.

Run the benchmark from the repository root with `node script/bench-clsx.mjs`.
It covers short/flat strings, conditional objects, nested arrays, and mixed inputs,
comparing against filter/collect-and-join references. Pass paths to local ESM modules
exporting `clsx` to compare additional implementations with identical inputs:

```sh
node script/bench-clsx.mjs /path/to/before.mjs /path/to/official-clsx.mjs
```

The benchmark warms each implementation, rotates execution order, and reads a
character from every output. Results depend on the JavaScript engine and workload.
