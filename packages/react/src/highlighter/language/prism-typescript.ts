/**
 * @see https://github.com/PrismJS/prism/blob/master/components/prism-typescript.js
 */

import type { Grammar, TokenObject } from 'prismjs'
import Prism from 'prismjs'

Prism.languages.typescript = Prism.languages.extend('javascript', {
  'class-name': {
    pattern:
      /(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,
    lookbehind: true,
    greedy: true,
    inside: null, // see below
  },
  builtin: /\b(?:Array|Function|Promise|any|boolean|console|never|number|string|symbol|unknown)\b/,
} as unknown as Grammar)

// The keywords TypeScript adds to JavaScript
;(Prism.languages.typescript.keyword as Array<RegExp | TokenObject>).push(
  /\b(?:abstract|declare|is|keyof|readonly|require)\b/,
  // keywords that have to be followed by an identifier
  /\b(?:asserts|infer|interface|module|namespace|type)\b(?=\s*(?:[{_$a-zA-Z\xA0-\uFFFF]|$))/,
  // This is for `import type *, {}`
  /\btype\b(?=\s*(?:[{*]|$))/,
)

// doesn't work with TS because TS is too complex
delete (Prism.languages.typescript as any).parameter
delete (Prism.languages.typescript as any)['literal-property']

// a version of typescript specifically for highlighting types
const typeInside = Prism.languages.extend('typescript', {})
delete typeInside['class-name']
;(Prism.languages.typescript['class-name'] as TokenObject).inside = typeInside

Prism.languages.insertBefore('typescript', 'function', {
  decorator: {
    pattern: /@[$\w\xA0-\uFFFF]+/,
    inside: {
      at: {
        pattern: /^@/,
        alias: 'operator',
      },
      function: /^[\s\S]+/,
    },
  },
  'generic-function': {
    // e.g. foo<T extends "bar" | "baz">( ...
    pattern:
      /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/,
    greedy: true,
    inside: {
      function: /^#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/,
      generic: {
        pattern: /<[\s\S]+/, // everything after the first <
        alias: 'class-name',
        inside: typeInside,
      },
    },
  },
})

Prism.languages.ts = Prism.languages.typescript
