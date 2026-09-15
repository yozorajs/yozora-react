import React from 'react'
import { clsx } from '../util/clsx'
import { getBreakpointId } from './breakpoint'
import { getSmallScreenStyles } from './small-screen'

interface IProps {
  theme: 'light' | 'darken' | string
  query: string
  nonce?: string
  className?: string
  children: React.ReactNode
}

export class YozoraReactTheme extends React.PureComponent<IProps> {
  public override render(): React.ReactElement {
    const { theme, query, nonce, className, children } = this.props
    const cls = clsx('yozora-theme-root', className)
    const breakpoint = getBreakpointId(query)

    return (
      <div className={cls} data-yozora-theme={theme} data-yozora-breakpoint={breakpoint}>
        {children}
        {breakpoint !== undefined && (
          <style
            // Reinsertion lets the browser check CSP again when the nonce changes.
            key={nonce}
            media={`screen and ${query}`}
            nonce={nonce}
            // biome-ignore lint/security/noDangerouslySetInnerHtml: Fixed CSS and a hex-encoded id need raw output for React 17/18 SSR.
            dangerouslySetInnerHTML={{
              __html: getSmallScreenStyles(`[data-yozora-breakpoint="${breakpoint}"]`),
            }}
          />
        )}
      </div>
    )
  }
}
