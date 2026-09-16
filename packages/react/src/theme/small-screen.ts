/** Shared by the static stylesheet build and custom media styles rendered with the component. */
export function getSmallScreenStyles(suffix = ':where(:not([data-yozora-breakpoint]))'): string {
  return `.yozora-theme-root${suffix} { --yozora_paragraphLineHeight: 1.6; }`
}
