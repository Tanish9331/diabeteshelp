import { MD3LightTheme } from 'react-native-paper';

export const paperLightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#2D6A9D', // Primary blue
    secondary: '#5CB85C', // Secondary green
    tertiary: '#E8F4FD', // Light blue
    error: '#E74C3C', // Error red
    warning: '#F39C12', // Warning orange
    success: '#4A9A4A', // Dark green
    surface: '#ffffff',
    background: '#F5FAFF',
    onPrimary: '#ffffff',
    onSecondary: '#ffffff',
    onSurface: '#2D6A9D',
    onBackground: '#2D6A9D',
    outline: '#E8F4FD',
  },
  fonts: {
    ...MD3LightTheme.fonts,
    labelLarge: {
      ...MD3LightTheme.fonts.labelLarge,
      fontFamily: 'Inter_600SemiBold',
    },
    labelMedium: {
      ...MD3LightTheme.fonts.labelMedium,
      fontFamily: 'Inter_500Medium',
    },
    bodyLarge: {
      ...MD3LightTheme.fonts.bodyLarge,
      fontFamily: 'Inter_400Regular',
    },
    bodyMedium: {
      ...MD3LightTheme.fonts.bodyMedium,
      fontFamily: 'Inter_400Regular',
    },
    titleLarge: {
      ...MD3LightTheme.fonts.titleLarge,
      fontFamily: 'Inter_700Bold',
    },
    titleMedium: {
      ...MD3LightTheme.fonts.titleMedium,
      fontFamily: 'Inter_600SemiBold',
    },
  },
};
