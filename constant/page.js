let systemInfo = uni.getSystemInfoSync();
export const STATUS_BAR_HEIGHT = systemInfo.statusBarHeight
export const NAVBAR_HEIGHT = systemInfo.platform == 'ios' ? 44 : 48
