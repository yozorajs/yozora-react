/**
 * See https://github.com/FormidableLabs/prism-react-renderer/blob/d307f34360ecc4f0b4aadde4f72d09fd6dbf0132/src/utils/normalizeTokens.js
 */
import type { Token, TokenStream } from 'prismjs'
import type { IToken } from '../types/prism'

const newlineRegex = /\r\n|\r|\n/

// Empty lines need to contain a single empty token, denoted with { empty: true }
const normalizeEmptyLines = (line: IToken[]): void => {
  if (line.length === 0) {
    line.push({
      types: ['plain'],
      content: '\n',
      empty: true,
    })
  } else if (line.length === 1 && line[0].content === '') {
    // eslint-disable-next-line no-param-reassign
    line[0].content = '\n'
    // eslint-disable-next-line no-param-reassign
    line[0].empty = true
  }
}

const appendTypes = (types: string[], add: string[] | string): string[] => {
  const typesSize = types.length
  if (typesSize > 0 && types[typesSize - 1] === add) {
    return types
  }

  return types.concat(add)
}

// Takes an array of Prism's tokens and groups them by line, turning plain
// strings into tokens as well. tokens can become recursive in some cases,
// which means that their types are concatenated. Plain-string tokens however
// are always of type "plain".
// This is not recursive to avoid exceeding the call-stack limit, since it's unclear
// how nested Prism's tokens can become
export const normalizeTokens = (tokens: TokenStream): IToken[][] => {
  const typeArrStack: string[][] = [[]]
  const tokenArrStack: TokenStream[] = [tokens]
  const tokenArrIndexStack = [0]
  const tokenArrSizeStack = [tokens.length]

  let currentLine: IToken[] = []
  const acc = [currentLine]

  for (let stackIndex = 0; stackIndex > -1; --stackIndex) {
    // eslint-disable-next-line no-cond-assign, no-plusplus
    for (let i = 0; (i = tokenArrIndexStack[stackIndex]++) < tokenArrSizeStack[stackIndex]; ) {
      let content: TokenStream
      let types = typeArrStack[stackIndex]

      const tokenArr = tokenArrStack[stackIndex]
      const token = (tokenArr as Array<string | Token>)[i]

      // Determine content and append type to types if necessary
      if (typeof token === 'string') {
        types = stackIndex > 0 ? types : ['plain']
        content = token
      } else {
        types = appendTypes(types, token.type)
        if (token.alias) {
          types = appendTypes(types, token.alias)
        }
        content = token.content
      }

      // If token.content is an array, increase the stack depth and repeat this while-loop
      if (typeof content !== 'string') {
        stackIndex += 1
        typeArrStack.push(types)
        tokenArrStack.push(content)
        tokenArrIndexStack.push(0)
        tokenArrSizeStack.push(content.length)
        continue
      }

      // Split by newlines
      const splitByNewlines = content.split(newlineRegex)
      const newlineCount = splitByNewlines.length

      currentLine.push({ types, content: splitByNewlines[0] })

      // Create a new line for each string on a new line
      for (let i = 1; i < newlineCount; i++) {
        normalizeEmptyLines(currentLine)
        acc.push((currentLine = []))
        currentLine.push({ types, content: splitByNewlines[i] })
      }
    }

    // Decrease the stack depth
    typeArrStack.pop()
    tokenArrStack.pop()
    tokenArrIndexStack.pop()
    tokenArrSizeStack.pop()
  }

  normalizeEmptyLines(currentLine)
  return acc
}
