import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';

export default function VerifyOtpScreen() {
	const router = useRouter();
	const params = useLocalSearchParams<{ phone?: string }>();
	const [code, setCode] = React.useState('');
	const [loading, setLoading] = React.useState(false);

	const handleVerify = async () => {
		setLoading(true);
		try {
			// TODO: Implement Firebase phone auth verification with confirmation result
			router.replace('(tabs)');
		} finally {
			setLoading(false);
		}
	};

	return (
		<View style={{ padding: 16, gap: 16 }}>
			<Text variant="headlineSmall">Verify OTP</Text>
			<Text>{params.phone}</Text>
			<TextInput
				label="Code"
				keyboardType="number-pad"
				value={code}
				onChangeText={setCode}
				maxLength={6}
			/>
			<Button mode="contained" onPress={handleVerify} loading={loading} disabled={code.length < 6}>
				Verify
			</Button>
		</View>
	);
}


