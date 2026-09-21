import type { MermaidConfig } from 'mermaid'
import type { IMermaidPalette } from './types'

const light: IMermaidPalette = {
  node: '#edf3f9',
  border: '#bccbdb',
  text: '#283b50',
  line: '#7b8da2',
  surface: '#ffffff',
  group: '#f5f7fa',
}

const dark: IMermaidPalette = {
  node: '#273240',
  border: '#506176',
  text: '#e2eaf3',
  line: '#91a4bb',
  surface: '#1f1f1f',
  group: '#232b35',
}

/** Mermaid scopes these rules to each SVG; explicit source shapes retain their radii. */
const themeCSS = `
  .node rect.label-container:not([rx]):not([ry]) { rx: 6px; ry: 6px; }
  .flowchart-link { stroke-linecap: round; stroke-linejoin: round; }
  .edge-thickness-normal:not(.edge-thickness-thick):not(.edge-thickness-invisible) { stroke-width: 1.4px; }
  .nodeLabel, .edgeLabel, .messageText, .actor { font-weight: 500; }
  .messageLine0, .messageLine1 { stroke-width: 1.4px; stroke-linecap: round; }
  .actor-line { stroke-width: 1px; stroke-dasharray: 4 5; }
`

export function getMermaidAppearance(
  theme: NonNullable<MermaidConfig['theme']>,
  palette?: IMermaidPalette,
): Pick<MermaidConfig, 'fontFamily' | 'themeVariables' | 'themeCSS' | 'flowchart'> {
  const colors = palette ?? (theme === 'default' ? light : theme === 'dark' ? dark : undefined)
  return {
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    flowchart: { curve: 'rounded', nodeSpacing: 36, rankSpacing: 56 },
    themeCSS,
    themeVariables: {
      fontSize: '15px',
      strokeWidth: 1.25,
      ...(colors && {
        primaryColor: colors.node,
        primaryTextColor: colors.text,
        primaryBorderColor: colors.border,
        secondaryColor: colors.group,
        tertiaryColor: colors.group,
        textColor: colors.text,
        titleColor: colors.text,
        mainBkg: colors.node,
        nodeBorder: colors.border,
        nodeTextColor: colors.text,
        lineColor: colors.line,
        arrowheadColor: colors.line,
        edgeLabelBackground: colors.surface,
        clusterBkg: colors.group,
        clusterBorder: colors.border,
        actorBkg: colors.node,
        actorBorder: colors.border,
        actorTextColor: colors.text,
        actorLineColor: colors.border,
        signalColor: colors.line,
        signalTextColor: colors.text,
        labelBoxBkgColor: colors.group,
        labelBoxBorderColor: colors.border,
        labelTextColor: colors.text,
        noteBkgColor: colors.group,
        noteBorderColor: colors.border,
        noteTextColor: colors.text,
        activationBkgColor: colors.node,
        activationBorderColor: colors.border,
      }),
    },
  }
}
