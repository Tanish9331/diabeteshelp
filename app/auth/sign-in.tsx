import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export default function SignInScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validatePhoneNumber = (phone: string) => {
    // Remove +91 prefix and spaces for validation
    const cleanPhone = phone.replace('+91', '').replace(/\s/g, '');
    return cleanPhone.length === 10 && /^\d{10}$/.test(cleanPhone);
  };

  const handleContinueWithOTP = async () => {
    setError('');
    
    if (!phoneNumber.trim()) {
      setError('Please enter your phone number');
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    setLoading(true);
    
    try {
      // For now, navigate to OTP verification screen
      // In production, this would call Firebase signInWithPhoneNumber
      router.push({
        pathname: '/auth/verify-otp',
        params: { phoneNumber: phoneNumber.trim() }
      });
    } catch (error) {
      setError('Failed to send OTP. Please try again.');
      console.error('Error sending OTP:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPhoneNumber = (text: string) => {
    // Remove all non-digits
    const cleaned = text.replace(/\D/g, '');
    
    // Limit to 10 digits
    const limited = cleaned.slice(0, 10);
    
    // Format as +91 XXXXX XXXXX
    if (limited.length > 0) {
      return `+91 ${limited.slice(0, 5)} ${limited.slice(5)}`.trim();
    }
    
    return '+91 ';
  };

  const handlePhoneChange = (text: string) => {
    const formatted = formatPhoneNumber(text);
    setPhoneNumber(formatted);
    setError(''); // Clear error when user types
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Sign In</Text>
          <Text style={styles.subtitle}>Enter your phone number to continue</Text>
        </View>

        {/* Phone Input */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Phone Number</Text>
          <TextInput
            mode="outlined"
            label="Phone Number"
            value={phoneNumber}
            onChangeText={handlePhoneChange}
            keyboardType="phone-pad"
            style={styles.phoneInput}
            contentStyle={styles.inputContent}
            placeholder="+91 98765 43210"
            maxLength={17} // +91 + 5 + space + 5 = 17 characters
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>

        {/* Continue Button */}
        <Button
          mode="contained"
          onPress={handleContinueWithOTP}
          style={styles.continueButton}
          contentStyle={styles.buttonContent}
          disabled={loading}
          loading={loading}
        >
          {loading ? 'Sending OTP...' : 'Continue with OTP'}
        </Button>

        {/* Footer */}
        <Text style={styles.footer}>
          By continuing, you agree to our Terms and Privacy Policy
        </Text>
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
  inputSection: {
    marginBottom: 32,
  },
  inputLabel: {
    color: '#2D6A9D', // Primary
    fontWeight: '600',
    marginBottom: 12,
    fontSize: 16,
  },
  phoneInput: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
  },
  inputContent: {
    height: 56,
    fontSize: 16,
  },
  errorText: {
    color: '#E74C3C', // Error
    fontSize: 14,
    marginTop: 8,
    marginLeft: 4,
  },
  continueButton: {
    backgroundColor: '#2D6A9D', // Primary
    borderRadius: 12,
    marginBottom: 24,
  },
  buttonContent: {
    height: 56,
  },
  footer: {
    textAlign: 'center',
    color: '#7F8C8D', // Neutral
    opacity: 0.8,
    fontSize: 12,
    lineHeight: 16,
    marginTop: 'auto',
    marginBottom: 24,
  },
});
