import type { Definition, FootnoteDefinition, YastNode } from '@yozora/ast'
import type { CodeRunnerItem } from '@yozora/react-code-runners'
import React from 'react'
import type { PreviewImageItem } from './types'

/**
 * Data type provided by YozoraMarkdownContext.
 */
export interface YozoraMarkdownContextData {
  /**
   * Whether if to enable the dark mode.
   */
  darken: boolean
  /**
   * Code runners.
   */
  codeRunners: ReadonlyArray<CodeRunnerItem>
  /**
   * Image items.
   */
  images: PreviewImageItem[]
  /**
   * Whether if the image viewer is visible.
   */
  imageViewerVisible: boolean
  /**
   * Index of the current previewing image.
   */
  activatedImageIndex: number
}

/**
 * Side-effect funcs provided by the YozoraMarkdownContext
 */
export interface YozoraMarkdownContextState extends YozoraMarkdownContextData {
  /**
   * Update the context data.
   */
  dispatch: React.Dispatch<
    React.SetStateAction<Partial<Omit<YozoraMarkdownContextData, 'dispatch'>>>
  >
  /**
   * Get link / image reference definition through the given identifier.
   * @param identifier
   */
  getDefinition(identifier: string): Readonly<Definition> | undefined
  /**
   * Get all of footnote reference definitions.
   */
  getFootnoteDefinitions(): ReadonlyArray<FootnoteDefinition>
  /**
   * Add a preview image item.
   * @param item
   * @returns callback funcs to toggle the visible state of images.
   */
  addPreviewImage(item: PreviewImageItem): (visible?: boolean) => void
  /**
   * Render yozora AST nodes into React nodes.
   * @param children
   */
  renderYozoraNodes(yozoraNodes?: YastNode[]): React.ReactNode[]
}

/**
 * Create yozora markdown context.
 */
export const YozoraMarkdownContext: React.Context<YozoraMarkdownContextState> =
  React.createContext({
    darken: false,
    codeRunners: [],
    images: [],
    imageViewerVisible: false,
    activatedImageIndex: -1,
    dispatch: (): never => {
      throw new Error(`No available dispatch prepared yet.`)
    },
    getDefinition: () => {},
    getFootnoteDefinitions: () => [],
    addPreviewImage: () => () => {},
    renderYozoraNodes: () => [],
  } as YozoraMarkdownContextState)
