/**
 * Calc link identifier for heading
 */
export function calcIdentifierForHeading(h: HTMLHeadingElement): string {
  const content = (h.textContent || '').trim()
  const identifier = content.toLowerCase()
    .replace(/(?:\s|\p{P})+/gu, '-')
    .replace(/(?:^[-]|[-]$)/g, '')
  return 'heading-' + identifier
}
