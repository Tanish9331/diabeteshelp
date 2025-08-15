import { auth, db } from '@/src/services/firebase';
import { paperLightTheme } from '@/src/theme/paper';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [loaded] = useFonts({
    Inter: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Roboto: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [onboardingCompleted, setOnboardingCompleted] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      setCurrentUser(user);
      
      if (user) {
        // Check if user has completed onboarding
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setOnboardingCompleted(userData.onboardingCompleted === true);
          } else {
            // New user, hasn't completed onboarding
            setOnboardingCompleted(false);
          }
        } catch (error) {
          console.error('Error checking onboarding status:', error);
          setOnboardingCompleted(false);
        }
      } else {
        setOnboardingCompleted(null);
      }
      
      setAuthReady(true);
    });
    return unsubscribe;
  }, []);

  if (!loaded || !authReady) {
    // Async font and auth state loading only occurs in development.
    return null;
  }

  return (
    <PaperProvider theme={paperLightTheme}>
      <ThemeProvider value={DefaultTheme}>
        {currentUser ? (
          onboardingCompleted ? (
            // User authenticated and onboarding completed - show tabs
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
          ) : (
            // User authenticated but onboarding not completed - show onboarding
            <Stack>
              <Stack.Screen name="onboarding/index" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
          )
        ) : (
          // User not authenticated - show auth screens
          <Stack>
            <Stack.Screen name="auth/sign-in" options={{ headerShown: false }} />
            <Stack.Screen name="auth/verify-otp" options={{ title: 'Verify OTP' }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        )}
        <StatusBar style="dark" />
      </ThemeProvider>
    </PaperProvider>
  );
}
