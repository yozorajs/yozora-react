import {
  AdmonitionType,
  BlockquoteType,
  BreakType,
  CodeType,
  DefinitionType,
  DeleteType,
  EcmaImportType,
  EmphasisType,
  FootnoteDefinitionType,
  FootnoteReferenceType,
  FootnoteType,
  HeadingType,
  HtmlType,
  ImageReferenceType,
  ImageType,
  InlineCodeType,
  InlineMathType,
  LinkReferenceType,
  LinkType,
  ListItemType,
  ListType,
  MathType,
  ParagraphType,
  StrongType,
  TableType,
  TextType,
  ThematicBreakType,
} from '@yozora/ast'
import type { Image, ImageReference } from '@yozora/ast'
import AdmonitionRenderer from '@yozora/react-admonition'
import BlockquoteRenderer from '@yozora/react-blockquote'
import BreakRenderer from '@yozora/react-break'
import CodeRenderer from '@yozora/react-code'
import DeleteRenderer from '@yozora/react-delete'
import EmphasisRenderer from '@yozora/react-emphasis'
import FootnoteReferenceRenderer from '@yozora/react-footnote-reference'
import HeadingRenderer from '@yozora/react-heading'
import ImageRenderer from '@yozora/react-image'
import InlineCodeRenderer from '@yozora/react-inline-code'
import InlineMathRenderer from '@yozora/react-inline-math'
import LinkRenderer from '@yozora/react-link'
import ListRenderer from '@yozora/react-list'
import ListItemRenderer from '@yozora/react-list-item'
import MathRenderer from '@yozora/react-math'
import ParagraphRenderer from '@yozora/react-paragraph'
import StrongRenderer from '@yozora/react-strong'
import TableRenderer from '@yozora/react-table'
import TextRenderer from '@yozora/react-text'
import ThematicBreakRenderer from '@yozora/react-thematic-break'
import React, { useMemo } from 'react'
import { YozoraMarkdownContext } from './Context'
import type { TokenRendererMap } from './types'

/**
 * Create a markdown renderer map.
 */
export function useYozoraRendererMap(
  customRendererMap?: Readonly<Partial<TokenRendererMap>>,
): Readonly<TokenRendererMap> {
  const rendererMap: TokenRendererMap = useMemo<TokenRendererMap>(() => {
    if (customRendererMap == null) return defaultYozoraRendererMap

    let changedFlag = false
    const result: TokenRendererMap = {} as unknown as TokenRendererMap
    for (const [key, val] of Object.entries(customRendererMap)) {
      if (val == null) continue

      changedFlag = true
      result[key] = val
    }

    return changedFlag
      ? { ...defaultYozoraRendererMap, ...result }
      : defaultYozoraRendererMap
  }, [customRendererMap])
  return rendererMap
}

export default useYozoraRendererMap

/**
 * Default yozora renderer map.
 */
export const defaultYozoraRendererMap: Readonly<TokenRendererMap> = {
  [AdmonitionType]: function YozoraReactAdmonition(admonition) {
    return (
      <YozoraMarkdownContext.Consumer>
        {({ renderYozoraNodes }) => (
          <AdmonitionRenderer
            keyword={admonition.keyword}
            title={renderYozoraNodes(admonition.title)}
          >
            {renderYozoraNodes(admonition.children)}
          </AdmonitionRenderer>
        )}
      </YozoraMarkdownContext.Consumer>
    )
  },
  [BlockquoteType]: function YozoraReactBlockquote(blockquote) {
    return (
      <YozoraMarkdownContext.Consumer>
        {({ renderYozoraNodes }) => (
          <BlockquoteRenderer>
            {renderYozoraNodes(blockquote.children)}
          </BlockquoteRenderer>
        )}
      </YozoraMarkdownContext.Consumer>
    )
  },
  [BreakType]: BreakRenderer as React.FC,
  [CodeType]: function YozoraReactCode(code) {
    const { lang, value, meta } = code

    // Remove trailing line endings.
    const formattedValue = value.replace(/[\r\n]*$/, '')
    return (
      <YozoraMarkdownContext.Consumer>
        {({ darken, preferLinenos, codeRunners }) => (
          <CodeRenderer
            lang={lang}
            value={formattedValue}
            meta={meta}
            runners={codeRunners}
            darken={darken}
            preferLinenos={preferLinenos}
          />
        )}
      </YozoraMarkdownContext.Consumer>
    )
  },
  [DeleteType]: function YozoraReactDelete(_delete) {
    return (
      <YozoraMarkdownContext.Consumer>
        {({ renderYozoraNodes }) => (
          <DeleteRenderer>{renderYozoraNodes(_delete.children)}</DeleteRenderer>
        )}
      </YozoraMarkdownContext.Consumer>
    )
  },
  [DefinitionType]: () => null,
  [EmphasisType]: function YozoraReactEmphasis(emphasis) {
    return (
      <YozoraMarkdownContext.Consumer>
        {({ renderYozoraNodes }) => (
          <EmphasisRenderer>
            {renderYozoraNodes(emphasis.children)}
          </EmphasisRenderer>
        )}
      </YozoraMarkdownContext.Consumer>
    )
  },
  [EcmaImportType]: () => null,
  [FootnoteDefinitionType]: () => null,
  [FootnoteType]: () => null,
  [FootnoteReferenceType]: FootnoteReferenceRenderer,
  [HeadingType]: function YozoraReactHeading(heading) {
    const { depth, identifier } = heading
    return (
      <YozoraMarkdownContext.Consumer>
        {({ renderYozoraNodes }) => (
          <HeadingRenderer identifier={identifier} level={depth}>
            {renderYozoraNodes(heading.children)}
          </HeadingRenderer>
        )}
      </YozoraMarkdownContext.Consumer>
    )
  },
  [HtmlType]: () => null,
  [ImageType]: function YozoraReactImage(image) {
    const {
      url: src,
      alt,
      title,
      srcSet,
      sizes,
      loading,
    } = image as Image & React.ImgHTMLAttributes<HTMLElement>

    return (
      <YozoraMarkdownContext.Consumer>
        {({ addPreviewImage }) => {
          const toggleImageViewerVisible = addPreviewImage({ src, alt })
          return (
            <ImageRenderer
              src={src}
              alt={alt}
              title={title}
              srcSet={srcSet}
              sizes={sizes}
              loading={loading}
              onClick={() => toggleImageViewerVisible(true)}
            />
          )
        }}
      </YozoraMarkdownContext.Consumer>
    )
  },
  [ImageReferenceType]: function YozoraReactImageReference(imageReference) {
    const { alt, srcSet, sizes, loading } = imageReference as ImageReference &
      React.ImgHTMLAttributes<HTMLElement>

    return (
      <YozoraMarkdownContext.Consumer>
        {({ getDefinition, addPreviewImage }) => {
          const definition = getDefinition(imageReference.identifier)
          const src: string = definition?.url ?? ''
          const title: string | undefined = definition?.title
          const toggleImageViewerVisible = addPreviewImage({ src, alt })

          return (
            <ImageRenderer
              src={src}
              title={title}
              alt={alt}
              srcSet={srcSet}
              sizes={sizes}
              loading={loading}
              onClick={() => toggleImageViewerVisible(true)}
            />
          )
        }}
      </YozoraMarkdownContext.Consumer>
    )
  },
  [InlineCodeType]: InlineCodeRenderer,
  [InlineMathType]: InlineMathRenderer,
  [LinkType]: function YozoraReactLink(link) {
    const { url, title } = link
    return (
      <YozoraMarkdownContext.Consumer>
        {({ renderYozoraNodes }) => (
          <LinkRenderer url={url} title={title}>
            {renderYozoraNodes(link.children)}
          </LinkRenderer>
        )}
      </YozoraMarkdownContext.Consumer>
    )
  },
  [LinkReferenceType]: function YozoraReactLinkReference(linkReference) {
    return (
      <YozoraMarkdownContext.Consumer>
        {({ renderYozoraNodes, getDefinition }) => {
          const definition = getDefinition(linkReference.identifier)
          const url: string = definition?.url ?? ''
          const title: string | undefined = definition?.title
          return (
            <LinkRenderer url={url} title={title}>
              {renderYozoraNodes(linkReference.children)}
            </LinkRenderer>
          )
        }}
      </YozoraMarkdownContext.Consumer>
    )
  },
  [ListType]: function YozoraReactList(list) {
    const { ordered, orderType, start } = list
    return (
      <YozoraMarkdownContext.Consumer>
        {({ renderYozoraNodes }) => (
          <ListRenderer ordered={ordered} start={start} orderType={orderType}>
            {renderYozoraNodes(list.children)}
          </ListRenderer>
        )}
      </YozoraMarkdownContext.Consumer>
    )
  },
  [ListItemType]: function YozoraReactListItem(listItem) {
    const { status } = listItem
    return (
      <YozoraMarkdownContext.Consumer>
        {({ renderYozoraNodes }) => (
          <ListItemRenderer status={status}>
            {renderYozoraNodes(listItem.children)}
          </ListItemRenderer>
        )}
      </YozoraMarkdownContext.Consumer>
    )
  },
  [MathType]: MathRenderer,
  [ParagraphType]: function YozoraReactParagraph(paragraph) {
    const className = undefined

    // If there are some image / imageReferences element in the paragraph,
    // then wrapper the content with div to avoid the warnings such as:
    //
    //  validateDOMNesting(...): <figure> cannot appear as a descendant of <p>.
    const { children } = paragraph

    const notValidParagraph: boolean = children.some(
      child => child.type === ImageType || child.type === ImageReferenceType,
    )
    return (
      <YozoraMarkdownContext.Consumer>
        {({ renderYozoraNodes }) =>
          notValidParagraph ? (
            <div className="yozora-paragraph yozora-paragraph--display">
              {renderYozoraNodes(paragraph.children)}
            </div>
          ) : (
            <ParagraphRenderer className={className}>
              {renderYozoraNodes(paragraph.children)}
            </ParagraphRenderer>
          )
        }
      </YozoraMarkdownContext.Consumer>
    )
  },
  [StrongType]: function YozoraReactStrong(strong) {
    return (
      <YozoraMarkdownContext.Consumer>
        {({ renderYozoraNodes }) => (
          <StrongRenderer>{renderYozoraNodes(strong.children)}</StrongRenderer>
        )}
      </YozoraMarkdownContext.Consumer>
    )
  },
  [TableType]: function YozoraReactTable(table) {
    const { columns, children: rows } = table
    return (
      <YozoraMarkdownContext.Consumer>
        {({ renderYozoraNodes }) => {
          const tableRows: React.ReactNode[][] = rows.map(row =>
            row.children.map(node => renderYozoraNodes(node.children)),
          )

          const [ths, ...tds] = tableRows
          const aligns = columns.map(col => col.align ?? undefined)
          return <TableRenderer aligns={aligns} ths={ths} tds={tds} />
        }}
      </YozoraMarkdownContext.Consumer>
    )
  },
  [TextType]: TextRenderer,
  [ThematicBreakType]: ThematicBreakRenderer as React.FC,
  _fallback: function YozoraReactFallback(node, key) {
    console.warn(
      `Cannot find render for \`${node.type}\` type node with key \`${key}\`:`,
      node,
    )
    return null
  },
}
