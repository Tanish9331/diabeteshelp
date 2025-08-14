import { signInWithGoogle } from '@/src/services/auth';
import { useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';

export default function SignInScreen() {
	const router = useRouter();
	const [phone, setPhone] = React.useState('');
	const [loading, setLoading] = React.useState(false);

  const handleGoogle = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      router.replace('(tabs)');
    } catch (e) {
      // no-op: keep user on screen
    } finally {
      setLoading(false);
    }
  };

	const handlePhone = () => {
		router.push({ pathname: '/auth/verify-otp', params: { phone } });
	};

	return (
		<View style={{ padding: 16, gap: 16 }}>
			<Text variant="headlineSmall">Sign in</Text>
			<Button mode="contained" onPress={handleGoogle} loading={loading}>
				Continue with Google
			</Button>
			<Text style={{ opacity: 0.7 }}>or</Text>
			<TextInput
				label="Phone number"
				keyboardType="phone-pad"
				value={phone}
				onChangeText={setPhone}
				autoComplete="tel"
			/>
			<Button mode="outlined" onPress={handlePhone} disabled={!phone}>
				Continue with OTP
			</Button>
		</View>
	);
}


