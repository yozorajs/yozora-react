/**
 * @see https://github.com/PrismJS/prism/blob/master/components/prism-jsx.js
 */

import type { Grammar, Token } from 'prismjs'
import Prism from 'prismjs'
import './prism-javascript'

const javascript = Prism.util.clone(Prism.languages.javascript)

const space = /(?:\s|\/\/.*(?!.)|\/\*(?:[^*]|\*(?!\/))\*\/)/.source
const braces = /(?:\{(?:\{(?:\{[^{}]*\}|[^{}])*\}|[^{}])*\})/.source
let spread = /(?:\{<S>*\.{3}(?:[^{}]|<BRACES>)*\})/.source

function re(source: string, flags?: string): RegExp {
  const resolvedSource = source
    .replace(/<S>/g, () => space)
    .replace(/<BRACES>/g, () => braces)
    .replace(/<SPREAD>/g, () => spread)
  return RegExp(resolvedSource, flags)
}

spread = re(spread).source

Prism.languages.jsx = Prism.languages.extend('markup', javascript)
const jsx = Prism.languages.jsx as Grammar & { tag: any }

jsx.tag.pattern = re(
  /<\/?(?:[\w.:-]+(?:<S>+(?:[\w.:$-]+(?:=(?:"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|[^\s{'"/>=]+|<BRACES>))?|<SPREAD>))*<S>*\/?)?>/
    .source,
)
jsx.tag.inside['tag'].pattern = /^<\/?[^\s>/]*/
jsx.tag.inside['attr-value'].pattern =
  /=(?!\{)(?:"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|[^\s'">]+)/
jsx.tag.inside['tag'].inside['class-name'] = /^[A-Z]\w*(?:\.[A-Z]\w*)*$/
jsx.tag.inside['comment'] = javascript['comment']

Prism.languages.insertBefore(
  'inside',
  'attr-name',
  {
    spread: {
      pattern: re(/<SPREAD>/.source),
      inside: Prism.languages.jsx,
    },
  },
  jsx.tag,
)

Prism.languages.insertBefore(
  'inside',
  'special-attr',
  {
    script: {
      // Allow for two levels of nesting
      pattern: re(/=<BRACES>/.source),
      alias: 'language-javascript',
      inside: {
        'script-punctuation': {
          pattern: /^=(?=\{)/,
          alias: 'punctuation',
        },
        rest: Prism.languages.jsx,
      },
    },
  },
  jsx.tag,
)

// The following will handle plain text inside tags
const stringifyToken = function (token: string | Token): string {
  if (!token) {
    return ''
  }
  if (typeof token === 'string') {
    return token
  }
  if (typeof token.content === 'string') {
    return token.content
  }
  return (token.content as Token[]).map(stringifyToken).join('')
}

const walkTokens = function (tokens: Array<Token | string>): void {
  const openedTags = []
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]
    let notTagNorBrace = false

    if (typeof token !== 'string') {
      if (token.type === 'tag' && token.content[0] && token.content[0].type === 'tag') {
        // We found a tag, now find its kind

        if (token.content[0].content[0].content === '</') {
          // Closing tag
          if (
            openedTags.length > 0 &&
            openedTags[openedTags.length - 1].tagName ===
              stringifyToken(token.content[0].content[1])
          ) {
            // Pop matching opening tag
            openedTags.pop()
          }
        } else {
          if (token.content[token.content.length - 1].content === '/>') {
            // Autoclosed tag, ignore
          } else {
            // Opening tag
            openedTags.push({
              tagName: stringifyToken(token.content[0].content[1]),
              openedBraces: 0,
            })
          }
        }
      } else if (openedTags.length > 0 && token.type === 'punctuation' && token.content === '{') {
        // Here we might have entered a JSX context inside a tag
        openedTags[openedTags.length - 1].openedBraces += 1
      } else if (
        openedTags.length > 0 &&
        openedTags[openedTags.length - 1].openedBraces > 0 &&
        token.type === 'punctuation' &&
        token.content === '}'
      ) {
        // Here we might have left a JSX context inside a tag
        openedTags[openedTags.length - 1].openedBraces -= 1
      } else {
        notTagNorBrace = true
      }
    }

    if (notTagNorBrace || typeof token === 'string') {
      if (openedTags.length > 0 && openedTags[openedTags.length - 1].openedBraces === 0) {
        // Here we are inside a tag, and not inside a JSX context.
        // That's plain text: drop any tokens matched.
        let plainText = stringifyToken(token)

        // And merge text with adjacent text
        if (
          i < tokens.length - 1 &&
          (typeof tokens[i + 1] === 'string' || (tokens[i + 1] as Token).type === 'plain-text')
        ) {
          plainText += stringifyToken(tokens[i + 1])
          tokens.splice(i + 1, 1)
        }
        if (
          i > 0 &&
          (typeof tokens[i - 1] === 'string' || (tokens[i - 1] as Token).type === 'plain-text')
        ) {
          plainText = stringifyToken(tokens[i - 1]) + plainText
          tokens.splice(i - 1, 1)
          i -= 1
        }

        // eslint-disable-next-line no-param-reassign
        tokens[i] = new Prism.Token('plain-text', plainText, undefined, plainText)
      }
    }

    if (typeof token !== 'string') {
      if (token.content && typeof token.content !== 'string') {
        walkTokens(token.content as Token[])
      }
    }
  }
}

Prism.hooks.add('after-tokenize', function (env) {
  if (env.language !== 'jsx' && env.language !== 'tsx') {
    return
  }
  walkTokens(env.tokens)
})
