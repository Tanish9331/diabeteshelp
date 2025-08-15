import { Brand } from '@/constants/Colors';
import { auth, db } from '@/src/services/firebase';
import { spacing } from '@/src/theme/spacing';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { signInWithCredential } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button, HelperText, Text, TextInput } from 'react-native-paper';

export default function VerifyOtpScreen() {
	const router = useRouter();
	const params = useLocalSearchParams<{ phone?: string; confirmationResult?: string }>();
	const [code, setCode] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	// Store confirmation result from previous screen
	const [confirmationResult, setConfirmationResult] = useState<any>(null);

	useEffect(() => {
		// In a real app, you'd get confirmationResult from navigation params or context
		// For now, we'll simulate the flow
		if (params.phone) {
			// This would normally come from the previous screen's phone auth
			console.log('Phone number:', params.phone);
		}
	}, [params.phone]);

	const handleVerify = async () => {
		if (!code || code.length < 6) {
			setError('Please enter a valid 6-digit code');
			return;
		}

		setLoading(true);
		setError('');

		try {
			// DEVELOPMENT: Test OTP for development (111111)
			if (code === '111111') {
				console.log('🔧 Development mode: Using test OTP 111111');
				
				// For development, we'll simulate the user creation without Firebase auth
				// In production, this would be handled by proper Firebase phone auth
				const phoneNumber = params.phone || '+919302146764';
				
				// Generate a unique UID for development
				const developmentUid = `dev_phone_${Date.now()}`;
				
				try {
					// Create user document in Firestore
					const userDoc = {
						phoneNumber: phoneNumber,
						createdAt: new Date(),
						lastLoginAt: new Date(),
						onboardingCompleted: false, // This will trigger onboarding flow
					};

					await setDoc(doc(db, 'users', developmentUid), userDoc);
					console.log('✅ Development user created successfully');

					// Navigate to onboarding
					router.replace('/onboarding');
					return;
				} catch (firestoreError) {
					console.error('Firestore error:', firestoreError);
					// Even if Firestore fails, still navigate to onboarding for development
					router.replace('/onboarding');
					return;
				}
			}

			// TODO: In real implementation, use the actual confirmationResult from previous screen
			// For now, we'll simulate successful verification and create user
			
			// Simulate successful phone verification
			const phoneNumber = params.phone || '+919302146764';
			
			// Create user document in Firestore
			const userCredential = await signInWithCredential(auth, {
				providerId: 'phone',
				uid: `phone_${Date.now()}`, // Generate unique UID for phone users
				phoneNumber: phoneNumber,
			} as any);

			// Create user document
			const userDoc = {
				phoneNumber: phoneNumber,
				createdAt: new Date(),
				lastLoginAt: new Date(),
				onboardingCompleted: false, // This will trigger onboarding flow
			};

			await setDoc(doc(db, 'users', userCredential.user.uid), userDoc);

			// Navigate to onboarding
			router.replace('/onboarding');
			
		} catch (error: any) {
			console.error('OTP verification error:', error);
			setError(error.message || 'Failed to verify OTP. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<View style={{ flex: 1, padding: spacing.s24, backgroundColor: '#F5FAFF' }}>
			<View style={{ flex: 1, justifyContent: 'center' }}>
				<Text variant="headlineMedium" style={{ color: Brand.primary, textAlign: 'center', marginBottom: spacing.s8 }}>
					Verify OTP
				</Text>
				
				<Text style={{ color: Brand.neutral, textAlign: 'center', marginBottom: spacing.s24 }}>
					Enter the 6-digit code sent to {params.phone}
				</Text>

				<TextInput
					mode="outlined"
					label="Enter OTP Code"
					keyboardType="number-pad"
					value={code}
					onChangeText={(text) => {
						setCode(text);
						setError(''); // Clear error when user types
					}}
					maxLength={6}
					style={{ marginBottom: spacing.s16 }}
					contentStyle={{ height: 56 }}
				/>

				{error ? (
					<HelperText type="error" visible={!!error}>
						{error}
					</HelperText>
				) : null}

				<Button 
					mode="contained" 
					onPress={handleVerify} 
					loading={loading} 
					disabled={code.length < 6}
					contentStyle={{ height: 52 }}
					style={{ 
						borderRadius: 12, 
						backgroundColor: Brand.secondary,
						marginBottom: spacing.s16
					}}
				>
					Verify & Continue
				</Button>

				<Text style={{ color: Brand.neutral, textAlign: 'center', fontSize: 12 }}>
					Didn't receive the code? Check your SMS or request a new one.
				</Text>

				{/* DEVELOPMENT: Show test OTP */}
				<View style={{ 
					marginTop: spacing.s16, 
					padding: spacing.s12, 
					backgroundColor: Brand.lightBlue, 
					borderRadius: 8,
					borderWidth: 1,
					borderColor: Brand.primary,
					borderStyle: 'dashed'
				}}>
					<Text style={{ 
						color: Brand.primary, 
						textAlign: 'center', 
						fontSize: 12, 
						fontWeight: '600' 
					}}>
						🔧 Development Mode
					</Text>
					<Text style={{ 
						color: Brand.neutral, 
						textAlign: 'center', 
						fontSize: 11 
					}}>
						Use test OTP: 111111
					</Text>
					<Text style={{ 
						color: Brand.warning, 
						textAlign: 'center', 
						fontSize: 10,
						marginTop: spacing.s4
					}}>
						This bypasses Firebase auth for testing
					</Text>
				</View>
			</View>
		</View>
	);
}


