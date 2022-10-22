import React from 'react'

/**
 * A Hook to define an event handler with an always-stable function identity.
 * @param handler
 * @returns
 * @see https://github.com/facebook/react/issues/14099#issuecomment-440013892
 * @see https://github.com/reactjs/rfcs/blob/useevent/text/0000-useevent.md#internal-implementation
 */
export function useEventCallback<T extends (...args: any[]) => any>(handler: T): T {
  const handlerRef = React.useRef<T | null>(handler)

  // In a real implementation, this would run before layout effects
  React.useLayoutEffect(() => {
    handlerRef.current = handler
  })

  return React.useCallback((...args: any[]) => {
    // In a real implementation, this would throw if called during render
    const handle = handlerRef.current as T
    return handle(...args) as any
  }, []) as T
}
