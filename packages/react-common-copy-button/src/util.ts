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

    if (typeof window === 'undefined') return false

    // For old browsers like explorer 11.
    if ((window as any).clipboardData?.setData) {
      ;(window as any).clipboardData.setData('Text', text)
      return true
    }

    if (copyThroughExecCommand(text)) return true
    console.error('Failed to write into clipboard. text:', text)
  } catch (error) {
    console.error('Failed to write into clipboard. error:', error)
  }

  return false
}

/**
 * Try use `exec` command to writing text into system clipboard.
 * @param text
 * @returns
 */
function copyThroughExecCommand(text: string): boolean {
  if (typeof document === 'undefined') return false

  // Put the text to copy into a <textarea>
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.style.position = 'absolute'
  textarea.style.opacity = '0'

  document.body.appendChild(textarea)
  textarea.select()

  // Copy text to the clipboard
  let success = false
  try {
    success = document.execCommand('copy')
  } finally {
    document.body.removeChild(textarea)
  }
  return success
}
