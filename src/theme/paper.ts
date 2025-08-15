import { Brand } from '@/constants/Colors';
import { MD3LightTheme as PaperLight, configureFonts, type MD3Theme } from 'react-native-paper';

const baseFonts = {
  // If Roboto/Inter are present on the device they'll be used; otherwise fall back to system
  fontFamily: 'Inter, Roboto, System',
};

const fonts = configureFonts({
  config: {
    displayLarge: baseFonts,
    displayMedium: baseFonts,
    displaySmall: baseFonts,
    headlineLarge: baseFonts,
    headlineMedium: baseFonts,
    headlineSmall: baseFonts,
    titleLarge: baseFonts,
    titleMedium: baseFonts,
    titleSmall: baseFonts,
    labelLarge: baseFonts,
    labelMedium: baseFonts,
    labelSmall: baseFonts,
    bodyLarge: baseFonts,
    bodyMedium: baseFonts,
    bodySmall: baseFonts,
  },
});

export const brandColors = {
  primary: Brand.primary,
  secondary: Brand.secondary,
  error: Brand.error,
  warning: Brand.warning,
  neutral: Brand.neutral,
  lightBlue: Brand.lightBlue,
};

export function createPaperTheme(): MD3Theme {
  const base = PaperLight;
  return {
    ...base,
    colors: {
      ...base.colors,
      primary: Brand.primary,
      secondary: Brand.secondary,
      error: Brand.error,
      surface: '#ffffff',
      surfaceVariant: Brand.lightBlue,
      background: '#F5FAFF',
      outline: Brand.neutral,
      onSurfaceVariant: '#344054',
    },
    fonts,
    roundness: 10,
  };
}

export const paperLightTheme = createPaperTheme();
export const paperDarkTheme = paperLightTheme; // dark theme disabled; use light theme everywhere


