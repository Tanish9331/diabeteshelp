/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

// DiabetesHelp brand palette (from CONTEXT.md)
export const Brand = {
  primary: '#2D6A9D',
  secondary: '#5CB85C',
  lightBlue: '#E8F4FD',
  darkGreen: '#4A9A4A',
  warning: '#F39C12',
  error: '#E74C3C',
  neutral: '#7F8C8D',
};

const tintColorLight = Brand.primary;
const tintColorDark = '#FFFFFF';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: Brand.neutral,
    tabIconDefault: Brand.neutral,
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: Brand.neutral,
    tabIconDefault: Brand.neutral,
    tabIconSelected: tintColorDark,
  },
};
