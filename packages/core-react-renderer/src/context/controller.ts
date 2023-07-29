import type { NodeRendererViewModel } from './viewmodel'

interface IProps {
  readonly viewmodel: NodeRendererViewModel
}

export class NodeRendererController {
  protected readonly viewmodel: NodeRendererViewModel

  constructor(props: IProps) {
    this.viewmodel = props.viewmodel
  }

  public toggleImageVisible = (visible: boolean | undefined): void => {
    const vm = this.viewmodel
    const nextVisible = visible ?? !vm.imageViewerVisible$.getSnapshot()
    vm.imageViewerVisible$.next(nextVisible)
  }

  public addImage = (src: string, alt: string): void => {
    const vm = this.viewmodel
    if (!vm.images$.getSnapshot().some(image => image.src === src && image.alt === alt)) {
      vm.images$.next([...vm.images$.getSnapshot(), { src, alt }])
    }
  }

  public activeImage = (src: string, alt: string): void => {
    const vm = this.viewmodel
    const previousIndex = vm.imageActivatedIndex$.getSnapshot()
    const images = vm.images$.getSnapshot()
    const imageViewerVisible = vm.imageViewerVisible$.getSnapshot()

    let currentIndex: number =
      images.length > 0
        ? images.findIndex(image => image.src === src && image.alt === alt)
        : previousIndex
    if (currentIndex === -1) currentIndex = previousIndex

    if (currentIndex === previousIndex && imageViewerVisible) return

    // Update state
    vm.imageActivatedIndex$.next(currentIndex)
    vm.imageViewerVisible$.next(true)
  }
}
