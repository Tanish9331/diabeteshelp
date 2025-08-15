import { Brand } from '@/constants/Colors';
import { signInWithGoogle } from '@/src/services/auth';
import { auth, db } from '@/src/services/firebase';
import { spacing } from '@/src/theme/spacing';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import React, { useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';
import { Button, HelperText, Snackbar, Surface, Text, TextInput, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignInScreen() {
  const router = useRouter();
  const [phone, setPhone] = useState('9302146764');
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingOtp, setLoadingOtp] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isValidIndianPhone = useMemo(() => /^\d{10}$/.test(phone), [phone]);

  const navigatePostAuth = useCallback(async () => {
    try {
      const uid = auth.currentUser?.uid;
      if (!uid) return;
      const ref = doc(db, 'users', uid);
      const snap = await getDoc(ref);
      const onboardingCompleted = snap.exists() ? (snap.data() as any)?.onboardingCompleted === true : false;
      if (onboardingCompleted) router.replace('/(tabs)');
      else router.replace('/(tabs)'); // placeholder until onboarding route exists
    } catch (e) {
      setError('Failed to load account. Please try again.');
    }
  }, [router]);

  const handleGoogle = useCallback(async () => {
    setLoadingGoogle(true);
    try {
      await signInWithGoogle();
      await navigatePostAuth();
    } catch (e: any) {
      setError(e?.message ?? 'Google sign-in failed');
    } finally {
      setLoadingGoogle(false);
    }
  }, [navigatePostAuth]);

  const handlePhoneContinue = async () => {
    if (!isValidIndianPhone) return;
    setLoadingOtp(true);
    try {
      // TODO: Implement Firebase phone auth
      // For now, simulate the flow by navigating to OTP verification
      // In real implementation, you would:
      // 1. Call Firebase phone auth
      // 2. Get confirmationResult
      // 3. Navigate to OTP with confirmationResult
      
      router.push({ 
        pathname: '/auth/verify-otp', 
        params: { 
          phone: `+91${phone}`,
          // confirmationResult: confirmationResult // This would be the actual Firebase confirmation result
        } 
      });
    } finally {
      setLoadingOtp(false);
    }
  };

  const theme = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={{ flex: 1, padding: spacing.s24, gap: spacing.s24 }}>
        <View style={{ alignItems: 'flex-start' }} accessibilityRole="header">
        <Text variant="headlineMedium" style={{ fontWeight: '700', color: Brand.primary }}>
          DiabetesHelp.in
        </Text>
          <Text style={{ color: Brand.neutral, marginTop: spacing.s8 }}>Simplify your diabetes routine</Text>
        </View>

        <Surface elevation={2} style={{ borderRadius: 24, backgroundColor: Brand.lightBlue, padding: spacing.s24 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.s16 }}>
            <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: Brand.secondary, justifyContent: 'center', alignItems: 'center' }}>
              <MaterialCommunityIcons name="heart-pulse" size={34} color={'#ffffff'} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: Brand.primary, fontWeight: '700' }} variant="titleLarge">Manage with confidence</Text>
              <Text style={{ opacity: 0.85, marginTop: spacing.s8 }}>Track meals, glucose and reports — all in one place.</Text>
            </View>
          </View>
          <View style={{ position: 'absolute', right: 18, top: 12, width: 18, height: 18, borderRadius: 9, backgroundColor: Brand.warning, opacity: 0.6 }} />
          <View style={{ position: 'absolute', left: 18, bottom: 12, width: 28, height: 12, borderRadius: 6, backgroundColor: Brand.secondary, opacity: 0.4 }} />
        </Surface>

        

        <Surface elevation={0} style={{ padding: spacing.s12, borderRadius: 12, backgroundColor: 'transparent' }}>
        <TextInput
          label="Phone number"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
          left={<TextInput.Affix text="IN +91" />}
          accessibilityLabel="Phone number"
          testID="input-phone"
          style={{ backgroundColor: 'transparent' }}
        />
        <HelperText type={isValidIndianPhone ? 'info' : 'error'} visible>
          {isValidIndianPhone ? 'India (+91)' : 'Enter 10 digits'}
        </HelperText>
        </Surface>

      <Button
        mode="contained"
        onPress={handlePhoneContinue}
        disabled={!isValidIndianPhone || loadingOtp}
        loading={loadingOtp}
        testID="btn-otp"
        accessibilityLabel="Continue with OTP"
        contentStyle={{ height: 52 }}
        style={{ borderRadius: 12, backgroundColor: Brand.secondary }}
      >
        Continue with OTP
      </Button>

        <Text style={{ opacity: 0.7, textAlign: 'center' }}>or</Text>

        <Button
          mode="contained"
          onPress={handleGoogle}
          loading={loadingGoogle}
          testID="btn-google"
          accessibilityLabel="Continue with Google"
          icon={() => <MaterialCommunityIcons name="google" size={22} color="#ffffff" />}
          contentStyle={{ height: 52 }}
          style={{ borderRadius: 12, backgroundColor: Brand.primary }}
        >
          Continue with Google
        </Button>

        <View style={{ marginTop: spacing.s8 }}>
          <Text style={{ opacity: 0.65, textAlign: 'center', color: Brand.neutral }}>
            By continuing, you agree to the Terms and Privacy Policy
          </Text>
        </View>

        <Snackbar visible={!!error} onDismiss={() => setError(null)} duration={4000}>
          {error}
        </Snackbar>
      </View>
    </SafeAreaView>
  );
}


