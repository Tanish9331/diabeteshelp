import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { PaperProvider } from 'react-native-paper';

// Import theme
import { paperLightTheme } from '../src/theme/paper';

export default function RootLayout() {
  return (
    <PaperProvider theme={paperLightTheme}>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="auth" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </PaperProvider>
  );
}
