export enum LightButtonType {
  /**
   *
   */
  CLOSE = 'close',
  /**
   *
   */
  MINIMIZE = 'minimize',
  /**
   *
   */
  MAXIMIZE = 'maximize',
}

export const lightButtonColorMap: Record<LightButtonType, string> = {
  [LightButtonType.CLOSE]: '#ed6c60',
  [LightButtonType.MINIMIZE]: '#f7c151',
  [LightButtonType.MAXIMIZE]: '#64c856',
}
