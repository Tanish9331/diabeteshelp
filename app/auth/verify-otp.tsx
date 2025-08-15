import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';

export default function VerifyOTPScreen() {
  const { phoneNumber } = useLocalSearchParams<{ phoneNumber: string }>();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!phoneNumber) {
      router.back();
      return;
    }

    startCountdown();
    return () => {
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
    };
  }, [phoneNumber]);

  const startCountdown = () => {
    setCountdown(60);
    setResendDisabled(true);
    
    countdownRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setResendDisabled(false);
          if (countdownRef.current) {
            clearInterval(countdownRef.current);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const validateOTP = (otpValue: string) => {
    return otpValue.length === 6 && /^\d{6}$/.test(otpValue);
  };

  const handleVerifyOTP = async () => {
    setError('');
    
    if (!validateOTP(otp)) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);
    
    try {
      // For now, simulate OTP verification
      // In production, this would call confirmation.confirm(otp)
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      
      // Simulate success
      if (otp === '123456') { // Test OTP for development
        // Navigate to main dashboard
        router.replace('/(tabs)');
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (error) {
      setError('Failed to verify OTP. Please try again.');
      console.error('Error verifying OTP:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (resendDisabled) return;
    
    setError('');
    setLoading(true);
    
    try {
      // For now, simulate resending OTP
      // In production, this would call Firebase signInWithPhoneNumber again
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      // Reset countdown and start new timer
      startCountdown();
      setOtp('');
      Alert.alert('OTP Sent', 'A new OTP has been sent to your phone number.');
    } catch (error) {
      setError('Failed to resend OTP. Please try again.');
      console.error('Error resending OTP:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPhoneDisplay = (phone: string) => {
    // Format phone number for display (mask middle digits)
    const cleanPhone = phone.replace('+91', '').replace(/\s/g, '');
    if (cleanPhone.length === 10) {
      return `+91 ${cleanPhone.slice(0, 3)} *** ${cleanPhone.slice(7)}`;
    }
    return phone;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Verify OTP</Text>
          <Text style={styles.subtitle}>
            Enter the 6-digit code sent to
          </Text>
          <Text style={styles.phoneNumber}>
            {formatPhoneDisplay(phoneNumber || '')}
          </Text>
        </View>

        {/* OTP Input */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Enter OTP</Text>
          <TextInput
            mode="outlined"
            label="6-digit OTP"
            value={otp}
            onChangeText={(text) => {
              setOtp(text.replace(/\D/g, '').slice(0, 6));
              setError('');
            }}
            keyboardType="number-pad"
            style={styles.otpInput}
            contentStyle={styles.inputContent}
            placeholder="123456"
            maxLength={6}
            secureTextEntry={false}
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>

        {/* Verify Button */}
        <Button
          mode="contained"
          onPress={handleVerifyOTP}
          style={styles.verifyButton}
          contentStyle={styles.buttonContent}
          disabled={loading || otp.length !== 6}
          loading={loading}
        >
          {loading ? 'Verifying...' : 'Verify OTP'}
        </Button>

        {/* Resend Section */}
        <View style={styles.resendSection}>
          <Text style={styles.resendText}>Didn't receive the code? </Text>
          <Button
            mode="text"
            onPress={handleResendOTP}
            disabled={resendDisabled}
            style={styles.resendButton}
            labelStyle={[
              styles.resendButtonLabel,
              resendDisabled && styles.resendButtonDisabled
            ]}
          >
            {resendDisabled ? `Resend in ${countdown}s` : 'Resend OTP'}
          </Button>
        </View>

        {/* Development Note */}
        <View style={styles.devNote}>
          <Text style={styles.devNoteText}>
            💡 Development: Use 123456 as test OTP
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FAFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2D6A9D', // Primary
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#7F8C8D', // Neutral
    textAlign: 'center',
    lineHeight: 22,
  },
  phoneNumber: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D6A9D', // Primary
    marginTop: 4,
  },
  inputSection: {
    marginBottom: 32,
  },
  inputLabel: {
    color: '#2D6A9D', // Primary
    fontWeight: '600',
    marginBottom: 12,
    fontSize: 16,
  },
  otpInput: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
  },
  inputContent: {
    height: 56,
    fontSize: 18,
    textAlign: 'center',
    letterSpacing: 2,
  },
  errorText: {
    color: '#E74C3C', // Error
    fontSize: 14,
    marginTop: 8,
    marginLeft: 4,
  },
  verifyButton: {
    backgroundColor: '#2D6A9D', // Primary
    borderRadius: 12,
    marginBottom: 24,
  },
  buttonContent: {
    height: 56,
  },
  resendSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  resendText: {
    color: '#7F8C8D', // Neutral
    fontSize: 14,
  },
  resendButton: {
    minWidth: 0,
    paddingHorizontal: 0,
  },
  resendButtonLabel: {
    color: '#5CB85C', // Secondary
    fontSize: 14,
    fontWeight: '600',
  },
  resendButtonDisabled: {
    color: '#7F8C8D', // Neutral
  },
  devNote: {
    backgroundColor: '#E8F4FD', // Light Blue
    padding: 12,
    borderRadius: 8,
    marginTop: 'auto',
    marginBottom: 24,
  },
  devNoteText: {
    color: '#2D6A9D', // Primary
    fontSize: 12,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
