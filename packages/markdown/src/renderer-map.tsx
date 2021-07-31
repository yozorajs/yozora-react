import {
  AdmonitionType,
  BlockquoteType,
  BreakType,
  CodeType,
  DefinitionType,
  DeleteType,
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
import type { Definition, Image, ImageReference } from '@yozora/ast'
import AdmonitionRenderer from '@yozora/react-admonition'
import BlockquoteRenderer from '@yozora/react-blockquote'
import BreakRenderer from '@yozora/react-break'
import type { CodeRunnerItem } from '@yozora/react-code'
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
import type { TokenRendererMap } from './types'

/**
 * Create a markdown renderer map.
 */
export function useRendererMap(
  customRendererMap?: Partial<TokenRendererMap>,
  codeRunners?: ReadonlyArray<CodeRunnerItem>,
): TokenRendererMap {
  const rendererMap: TokenRendererMap = useMemo<TokenRendererMap>(
    () => ({
      [AdmonitionType]: function renderAdmonition(admonition, key, ctx) {
        const title = ctx.renderNodes(admonition.title)
        return (
          <AdmonitionRenderer
            key={key}
            keyword={admonition.keyword}
            title={title}
          >
            {ctx.renderNodes(admonition.children)}
          </AdmonitionRenderer>
        )
      },
      [BlockquoteType]: function renderBlockquote(blockquote, key, ctx) {
        return (
          <BlockquoteRenderer key={key}>
            {ctx.renderNodes(blockquote.children)}
          </BlockquoteRenderer>
        )
      },
      [BreakType]: function renderBreak(o, key) {
        return <BreakRenderer key={key} />
      },
      [CodeType]: function renderCode(code, key, ctx) {
        const { lang, value, meta } = code

        // Remove trailing line endings.
        const formattedValue = value.replace(/[\r\n]*$/, '')
        return (
          <CodeRenderer
            key={key}
            lang={lang}
            value={formattedValue}
            meta={meta}
            runners={codeRunners}
          />
        )
      },
      [DeleteType]: function renderDelete(_delete, key, ctx) {
        return (
          <DeleteRenderer key={key}>
            {ctx.renderNodes(_delete.children)}
          </DeleteRenderer>
        )
      },
      [DefinitionType]: () => null,
      [EmphasisType]: function renderEmphasis(emphasis, key, ctx) {
        return (
          <EmphasisRenderer key={key}>
            {ctx.renderNodes(emphasis.children)}
          </EmphasisRenderer>
        )
      },
      [FootnoteDefinitionType]: () => null,
      [FootnoteType]: () => null,
      [FootnoteReferenceType]: function renderFootnoteReference(
        footnoteReference,
        key,
      ) {
        const { identifier, label } = footnoteReference
        return (
          <FootnoteReferenceRenderer
            key={key}
            identifier={identifier}
            label={label}
          />
        )
      },
      [HeadingType]: function renderHeading(heading, key, ctx) {
        const { depth, identifier } = heading
        return (
          <HeadingRenderer key={key} identifier={identifier} level={depth}>
            {ctx.renderNodes(heading.children)}
          </HeadingRenderer>
        )
      },
      [HtmlType]: function renderHtml(html, key, ctx) {
        return null
      },
      [ImageType]: function renderImage(image, key, ctx) {
        const {
          url: src,
          alt,
          title,
          srcSet,
          sizes,
          loading,
        } = image as Image & React.ImgHTMLAttributes<HTMLElement>
        ctx.addPreviewImage({ src, alt })
        return (
          <ImageRenderer
            key={key}
            src={src}
            alt={alt}
            title={title}
            srcSet={srcSet}
            sizes={sizes}
            loading={loading}
            onClick={() => ctx.setImageVisible(true)}
          />
        )
      },
      [ImageReferenceType]: function renderImageReference(
        imageReference,
        key,
        ctx,
      ) {
        const definition: Omit<Definition, 'type'> =
          ctx.getDefinition(imageReference.identifier) ?? ({} as any)

        const {
          alt,
          src = definition.url,
          title = definition.title,
          srcSet,
          sizes,
          loading,
        } = imageReference as ImageReference &
          React.ImgHTMLAttributes<HTMLElement>

        ctx.addPreviewImage({ src, alt })
        return (
          <ImageRenderer
            key={key}
            src={src}
            title={title}
            alt={alt}
            srcSet={srcSet}
            sizes={sizes}
            loading={loading}
            onClick={() => ctx.setImageVisible(true)}
          />
        )
      },
      [InlineCodeType]: function renderInlineCode(inlineCode, key) {
        const { value } = inlineCode
        return <InlineCodeRenderer key={key} value={value} />
      },
      [InlineMathType]: function renderInlineMath(inlineMath, key) {
        const { value } = inlineMath
        return <InlineMathRenderer key={key} value={value} />
      },
      [LinkType]: function renderLink(link, key, ctx) {
        const { url, title } = link
        return (
          <LinkRenderer key={key} url={url} title={title}>
            {ctx.renderNodes(link.children)}
          </LinkRenderer>
        )
      },
      [LinkReferenceType]: function renderLinkReference(
        linkReference,
        key,
        ctx,
      ) {
        const definition: Omit<Definition, 'type'> =
          ctx.getDefinition(linkReference.identifier) ?? ({} as any)
        const { url = '', title } = definition
        return (
          <LinkRenderer key={key} url={url} title={title}>
            {ctx.renderNodes(linkReference.children)}
          </LinkRenderer>
        )
      },
      [ListType]: function renderList(list, key, ctx) {
        const { ordered, orderType, start } = list
        return (
          <ListRenderer
            key={key}
            ordered={ordered}
            start={start}
            orderType={orderType}
          >
            {ctx.renderNodes(list.children)}
          </ListRenderer>
        )
      },
      [ListItemType]: function renderListItem(listItem, key, ctx) {
        const { status } = listItem
        return (
          <ListItemRenderer key={key} status={status}>
            {ctx.renderNodes(listItem.children)}
          </ListItemRenderer>
        )
      },
      [MathType]: function renderMath(math, key) {
        const { value } = math
        return <MathRenderer key={key} value={value} />
      },
      [ParagraphType]: function renderParagraph(paragraph, key, ctx) {
        let className = undefined

        // If there is only one inline element in the paragraph, then center it.
        const { children } = paragraph
        if (children.length === 1) {
          const childType = children[0].type
          if ([ImageType, ImageReferenceType].includes(childType)) {
            className = 'yozora-paragraph yozora-paragraph--display'
          }
        }

        return (
          <ParagraphRenderer key={key} className={className}>
            {ctx.renderNodes(paragraph.children)}
          </ParagraphRenderer>
        )
      },
      [StrongType]: function renderStrong(strong, key, ctx) {
        return (
          <StrongRenderer key={key}>
            {ctx.renderNodes(strong.children)}
          </StrongRenderer>
        )
      },
      [TableType]: function renderTable(table, key, ctx) {
        const { columns, children: rows } = table
        const tableRows: React.ReactNode[][] = rows.map(row =>
          row.children.map(node => ctx.renderNodes(node.children)),
        )

        const [ths, ...tds] = tableRows
        const aligns = columns.map(col => col.align ?? undefined)
        return <TableRenderer key={key} aligns={aligns} ths={ths} tds={tds} />
      },
      [TextType]: function renderText(text, key) {
        const { value } = text
        return <TextRenderer key={key} value={value} />
      },
      [ThematicBreakType]: function renderThematicBreak(thematicBreak, key) {
        return <ThematicBreakRenderer key={key} />
      },
      _fallback: function renderFallback(node, key) {
        console.warn(
          `Cannot find render for \`${node.type}\` type node with key \`${key}\`:`,
          node,
        )
        return null
      },
      ...customRendererMap,
    }),
    [customRendererMap, codeRunners],
  )
  return rendererMap
}
