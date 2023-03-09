/**
 * @see https://github.com/PrismJS/prism/blob/master/components/prism-yaml.js
 */

import Prism from 'prismjs'

// https://yaml.org/spec/1.2/spec.html#c-ns-anchor-property
// https://yaml.org/spec/1.2/spec.html#c-ns-alias-node
const anchorOrAlias = /[*&][^\s[\]{},]+/
// https://yaml.org/spec/1.2/spec.html#c-ns-tag-property
const tag = /!(?:<[\w\-%#;/?:@&=+$,.!~*'()[\]]+>|(?:[a-zA-Z\d-]*!)?[\w\-%#;/?:@&=+$.~*'()]+)?/
// https://yaml.org/spec/1.2/spec.html#c-ns-properties(n,c)
const properties =
  '(?:' +
  tag.source +
  '(?:[ \t]+' +
  anchorOrAlias.source +
  ')?|' +
  anchorOrAlias.source +
  '(?:[ \t]+' +
  tag.source +
  ')?)'
// https://yaml.org/spec/1.2/spec.html#ns-plain(n,c)
// This is a simplified version that doesn't support "#" and multiline keys
// All these long scarry character classes are simplified versions of YAML's characters
const plainKey =
  // eslint-disable-next-line no-control-regex
  /(?:[^\s\x00-\x08\x0e-\x1f!"#%&'*,\-:>?@[\]`{|}\x7f-\x84\x86-\x9f\ud800-\udfff\ufffe\uffff]|[?:-]<PLAIN>)(?:[ \t]*(?:(?![#:])<PLAIN>|:<PLAIN>))*/.source.replace(
    /<PLAIN>/g,
    // eslint-disable-next-line no-control-regex
    () => /[^\s\x00-\x08\x0e-\x1f,[\]{}\x7f-\x84\x86-\x9f\ud800-\udfff\ufffe\uffff]/.source,
  )
const string = /"(?:[^"\\\r\n]|\\.)*"|'(?:[^'\\\r\n]|\\.)*'/.source

function createValuePattern(value: string, flags0?: string): RegExp {
  const flags = (flags0 || '').replace(/m/g, '') + 'm' // add m flag
  const pattern =
    /([:\-,[{]\s*(?:\s<<prop>>[ \t]+)?)(?:<<value>>)(?=[ \t]*(?:$|,|\]|\}|(?:[\r\n]\s*)?#))/.source
      .replace(/<<prop>>/g, function () {
        return properties
      })
      .replace(/<<value>>/g, function () {
        return value
      })
  return RegExp(pattern, flags)
}

Prism.languages.yaml = {
  scalar: {
    pattern: RegExp(
      /([-:]\s*(?:\s<<prop>>[ \t]+)?[|>])[ \t]*(?:((?:\r?\n|\r)[ \t]+)\S[^\r\n]*(?:\2[^\r\n]+)*)/.source.replace(
        /<<prop>>/g,
        function () {
          return properties
        },
      ),
    ),
    lookbehind: true,
    alias: 'string',
  },
  comment: /#.*/,
  key: {
    pattern: RegExp(
      /((?:^|[:\-,[{\r\n?])[ \t]*(?:<<prop>>[ \t]+)?)<<key>>(?=\s*:\s)/.source
        .replace(/<<prop>>/g, function () {
          return properties
        })
        .replace(/<<key>>/g, function () {
          return '(?:' + plainKey + '|' + string + ')'
        }),
    ),
    lookbehind: true,
    greedy: true,
    alias: 'atrule',
  },
  directive: {
    pattern: /(^[ \t]*)%.+/m,
    lookbehind: true,
    alias: 'important',
  },
  datetime: {
    pattern: createValuePattern(
      /\d{4}-\d\d?-\d\d?(?:[tT]|[ \t]+)\d\d?:\d{2}:\d{2}(?:\.\d*)?(?:[ \t]*(?:Z|[-+]\d\d?(?::\d{2})?))?|\d{4}-\d{2}-\d{2}|\d\d?:\d{2}(?::\d{2}(?:\.\d*)?)?/
        .source,
    ),
    lookbehind: true,
    alias: 'number',
  },
  boolean: {
    pattern: createValuePattern(/false|true/.source, 'i'),
    lookbehind: true,
    alias: 'important',
  },
  null: {
    pattern: createValuePattern(/null|~/.source, 'i'),
    lookbehind: true,
    alias: 'important',
  },
  string: {
    pattern: createValuePattern(string),
    lookbehind: true,
    greedy: true,
  },
  number: {
    pattern: createValuePattern(
      /[+-]?(?:0x[\da-f]+|0o[0-7]+|(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?|\.inf|\.nan)/.source,
      'i',
    ),
    lookbehind: true,
  },
  tag: tag,
  important: anchorOrAlias,
  punctuation: /---|[:[\]{}\-,|>?]|\.\.\./,
}

Prism.languages.yml = Prism.languages.yaml
