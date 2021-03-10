import React from 'react'

/**
 * Create a error boundary component
 *
 * @param Element
 * @param onError
 */
export function errorBoundary(
  Element: React.FC | React.ReactNode,
  onError: (error?: unknown) => void,
): React.ComponentClass {
  class ErrorBoundary extends React.Component {
    public componentDidCatch(error: unknown): void {
      onError(error)
    }

    public render(): React.ReactNode {
      if (typeof Element === 'function') {
        return <Element />
      }
      return Element
    }
  }

  return ErrorBoundary
}

export default errorBoundary
