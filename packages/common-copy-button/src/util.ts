/**
 * Copy contents to clipboard.
 * @param text
 * @see https://stackoverflow.com/a/61166899/14797950
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    // For major browsers.
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }

    // For old browsers like explorer 11.
    if ((window as any).clipboardData?.setData) {
      ;(window as any).clipboardData.setData('Text', text)
      return true
    }

    console.error('Failed to write into clipboard. text:', text)
  } catch (error) {
    console.error('Failed to write into clipboard. error:', error)
  }

  return false
}
