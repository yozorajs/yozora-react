import { State, ViewModel } from '@guanghechen/viewmodel'
import type { Definition, FootnoteDefinition } from '@yozora/ast'
import { unstable_batchedUpdates } from 'react-dom'
import type { INodeRendererMap, IPreviewImageItem } from '../types'
import { NodeRendererActionsType } from './constant'
import { NodeRendererController } from './controller'
import type { INodeRendererAction, INodeRendererState } from './types'

interface IProps extends INodeRendererState {}

export class NodeRendererViewModel extends ViewModel {
  public readonly images$: State<IPreviewImageItem[]>
  public readonly imageViewerVisible$: State<boolean>
  public readonly imageActivatedIndex$: State<number>
  public readonly showCodeLineno$: State<boolean>
  public readonly rendererMap$: State<Readonly<INodeRendererMap>>
  public readonly definitionMap$: State<Readonly<Record<string, Definition>>>
  public readonly footnoteDefinitionMap$: State<Readonly<Record<string, FootnoteDefinition>>>
  protected readonly _controller: NodeRendererController

  constructor(props: IProps) {
    super()

    this.images$ = new State(props.images)
    this.imageViewerVisible$ = new State(props.imageViewerVisible)
    this.imageActivatedIndex$ = new State(props.imageActivatedIndex)
    this.showCodeLineno$ = new State(props.showCodeLineno)
    this.rendererMap$ = new State(props.rendererMap)
    this.definitionMap$ = new State(props.definitionMap)
    this.footnoteDefinitionMap$ = new State(props.footnoteDefinitionMap)

    const controller = new NodeRendererController({ viewmodel: this })
    this._controller = controller
  }

  public readonly getSnapshot = (): INodeRendererState => {
    return {
      images: this.images$.getSnapshot(),
      imageViewerVisible: this.imageViewerVisible$.getSnapshot(),
      imageActivatedIndex: this.imageActivatedIndex$.getSnapshot(),
      showCodeLineno: this.showCodeLineno$.getSnapshot(),
      rendererMap: this.rendererMap$.getSnapshot(),
      definitionMap: this.definitionMap$.getSnapshot(),
      footnoteDefinitionMap: this.footnoteDefinitionMap$.getSnapshot(),
    }
  }

  public readonly dispatch = <T extends NodeRendererActionsType = NodeRendererActionsType>(
    action: INodeRendererAction<T>,
  ): void => {
    const consume = consumerMap[action.type]
    if (consume) {
      unstable_batchedUpdates(() => {
        consume(this._controller, action)
      })
    } else {
      console.error(this.constructor.name, 'Unhandled action:', action)
    }
  }
}

type IConsumer<T extends NodeRendererActionsType> = (
  controller: NodeRendererController,
  action: INodeRendererAction<T>,
) => void
const consumerMap: { [T in NodeRendererActionsType]: IConsumer<T> } = {
  [NodeRendererActionsType.TOGGLE_IMAGE_VISIBLE]: (controller, action) => {
    const visible: boolean | undefined | void = action.payload
    controller.toggleImageVisible(visible)
  },
  [NodeRendererActionsType.ADD_IMAGE]: (controller, action) => {
    const { src, alt } = action.payload
    controller.addImage(src, alt)
  },
  [NodeRendererActionsType.ACTIVE_IMAGE]: (controller, action) => {
    const { src, alt } = action.payload
    controller.activeImage(src, alt)
  },
}
