import React from 'react'

/** Create a stable, client-only renderer with a local loading boundary. */
export function createLazyRenderer<TComponent extends React.ComponentType<any>>(
  load: () => Promise<{ default: TComponent }>,
): React.ForwardRefExoticComponent<
  React.PropsWithoutRef<React.ComponentProps<TComponent>> &
    React.RefAttributes<React.ComponentRef<TComponent>>
> {
  const Renderer = React.lazy(load)
  const LazyRenderer = React.forwardRef<
    React.ComponentRef<TComponent>,
    React.ComponentProps<TComponent>
  >(function LazyRenderer(props, ref) {
    const [mounted, setMounted] = React.useState(false)
    React.useEffect(() => setMounted(true), [])

    /** Keep server output and the initial hydration render identical, including React 17. */
    if (!mounted) return null

    const rendererProps = { ...props, ref } as React.ComponentPropsWithRef<TComponent>
    return (
      <React.Suspense fallback={null}>
        {React.createElement(Renderer, rendererProps)}
      </React.Suspense>
    )
  })

  LazyRenderer.displayName = 'YozoraLazyRenderer'
  return LazyRenderer
}
