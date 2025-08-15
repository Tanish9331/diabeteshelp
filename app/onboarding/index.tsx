import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, ScrollView, View } from 'react-native';
import { Button, HelperText, Surface, Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Brand } from '@/constants/Colors';
import { spacing } from '@/src/theme/spacing';

export default function OnboardingScreen(): JSX.Element {
  const router = useRouter();
  const [phone, setPhone] = useState<string>('9302146764');
  const [loadingOtp, setLoadingOtp] = useState<boolean>(false);
  const [loadingGoogle, setLoadingGoogle] = useState<boolean>(false);
  const isValidIndianPhone = /^\d{10}$/.test(phone);

  // Hero animation - gentle pulse for the main illustration
  const pulse = useRef(new Animated.Value(1)).current;
  const float = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    // Pulse animation
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.05, duration: 2000, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1, duration: 2000, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ]),
    );
    
    // Floating animation
    const floatLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(float, { toValue: -8, duration: 3000, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(float, { toValue: 8, duration: 3000, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ]),
    );
    
    pulseLoop.start();
    floatLoop.start();
    
    return () => {
      pulseLoop.stop();
      floatLoop.stop();
    };
  }, [pulse, float]);

  const handlePhoneContinue = async () => {
    if (!isValidIndianPhone) return;
    setLoadingOtp(true);
    try {
      // Simple test bypass for development
      console.log('🔧 Development: Phone OTP flow - navigating to OTP verification');
      router.push({ 
        pathname: '/auth/verify-otp', 
        params: { phone: `+91${phone}` } 
      });
    } finally {
      setLoadingOtp(false);
    }
  };

  const handleGoogle = async () => {
    setLoadingGoogle(true);
    try {
      // Simple test bypass for development
      console.log('🔧 Development: Google sign-in - navigating to tabs');
      router.replace('/(tabs)');
    } finally {
      setLoadingGoogle(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F5FAFF' }}>
      <ScrollView 
        style={{ flex: 1 }} 
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. Hero Section (40% of screen) */}
        <View style={{ height: '40%', justifyContent: 'center', alignItems: 'center', paddingTop: spacing.s16 }}>
          <Animated.View style={{ 
            transform: [{ scale: pulse }, { translateY: float }],
            alignItems: 'center'
          }}>
            {/* Main Health Illustration */}
            <View style={{ 
              width: 120, 
              height: 120, 
              borderRadius: 60, 
              backgroundColor: Brand.primary,
              alignItems: 'center', 
              justifyContent: 'center',
              shadowColor: Brand.primary,
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.3,
              shadowRadius: 16,
              elevation: 8
            }}>
              <MaterialCommunityIcons name="heart-pulse" size={60} color="#ffffff" />
            </View>
            
            {/* Glucose Meter Icon */}
            <View style={{ 
              position: 'absolute', 
              right: -20, 
              top: 20, 
              width: 50, 
              height: 50, 
              borderRadius: 25, 
              backgroundColor: Brand.secondary,
              alignItems: 'center', 
              justifyContent: 'center',
              shadowColor: Brand.secondary,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 4
            }}>
              <MaterialCommunityIcons name="monitor-dashboard" size={28} color="#ffffff" />
            </View>
            
            {/* Small accent elements */}
            <View style={{ 
              position: 'absolute', 
              left: -15, 
              bottom: 15, 
              width: 30, 
              height: 30, 
              borderRadius: 15, 
              backgroundColor: Brand.warning,
              opacity: 0.8
            }} />
            <View style={{ 
              position: 'absolute', 
              right: 10, 
              bottom: -10, 
              width: 20, 
              height: 20, 
              borderRadius: 10, 
              backgroundColor: Brand.lightBlue,
              opacity: 0.6
            }} />
          </Animated.View>
          
          <Text style={{ 
            color: Brand.primary, 
            fontSize: 28, 
            fontWeight: '700', 
            textAlign: 'center',
            marginTop: spacing.s24,
            marginHorizontal: spacing.s24
          }}>
            Welcome to DiabetesHelp.in
          </Text>
          
          <Text style={{ 
            color: Brand.neutral, 
            fontSize: 16, 
            textAlign: 'center',
            marginTop: spacing.s8,
            marginHorizontal: spacing.s32,
            lineHeight: 22
          }}>
            Your personal diabetes management companion
          </Text>
        </View>

        {/* 2. Benefit Cards Section (30% of screen) */}
        <View style={{ 
          height: '30%', 
          paddingHorizontal: spacing.s24,
          justifyContent: 'center'
        }}>
          <View style={{ flexDirection: 'row', gap: spacing.s12 }}>
            {/* Card 1: Track meals */}
            <Surface elevation={2} style={{ 
              flex: 1, 
              backgroundColor: '#ffffff',
              borderRadius: 16,
              padding: spacing.s16,
              alignItems: 'center',
              borderWidth: 1,
              borderColor: Brand.lightBlue
            }}>
              <View style={{ 
                width: 40, 
                height: 40, 
                borderRadius: 20, 
                backgroundColor: Brand.lightBlue,
                alignItems: 'center', 
                justifyContent: 'center',
                marginBottom: spacing.s8
              }}>
                <MaterialCommunityIcons name="food-apple" size={24} color={Brand.primary} />
              </View>
              <Text style={{ 
                color: Brand.primary, 
                fontSize: 12, 
                fontWeight: '600', 
                textAlign: 'center'
              }}>
                Track meals easily
              </Text>
            </Surface>

            {/* Card 2: Monitor glucose */}
            <Surface elevation={2} style={{ 
              flex: 1, 
              backgroundColor: '#ffffff',
              borderRadius: 16,
              padding: spacing.s16,
              alignItems: 'center',
              borderWidth: 1,
              borderColor: Brand.lightBlue
            }}>
              <View style={{ 
                width: 40, 
                height: 40, 
                borderRadius: 20, 
                backgroundColor: Brand.lightBlue,
                alignItems: 'center', 
                justifyContent: 'center',
                marginBottom: spacing.s8
              }}>
                <MaterialCommunityIcons name="chart-line" size={24} color={Brand.primary} />
              </View>
              <Text style={{ 
                color: Brand.primary, 
                fontSize: 12, 
                fontWeight: '600', 
                textAlign: 'center'
              }}>
                Monitor glucose levels
              </Text>
            </Surface>

            {/* Card 3: Personalized plans */}
            <Surface elevation={2} style={{ 
              flex: 1, 
              backgroundColor: '#ffffff',
              borderRadius: 16,
              padding: spacing.s16,
              alignItems: 'center',
              borderWidth: 1,
              borderColor: Brand.lightBlue
            }}>
              <View style={{ 
                width: 40, 
                height: 40, 
                borderRadius: 20, 
                backgroundColor: Brand.lightBlue,
                alignItems: 'center', 
                justifyContent: 'center',
                marginBottom: spacing.s8
              }}>
                <MaterialCommunityIcons name="clipboard-text" size={24} color={Brand.primary} />
              </View>
              <Text style={{ 
                color: Brand.primary, 
                fontSize: 12, 
                fontWeight: '600', 
                textAlign: 'center'
              }}>
                Personalized diet plans
              </Text>
            </Surface>
          </View>
        </View>

        {/* 3. Authentication Section (Bottom 30%) */}
        <View style={{ 
          height: '30%', 
          paddingHorizontal: spacing.s24,
          paddingBottom: spacing.s24,
          justifyContent: 'flex-end'
        }}>
          {/* Phone Input */}
          <View style={{ marginBottom: spacing.s16 }}>
            <Text style={{ 
              color: Brand.primary, 
              fontWeight: '600', 
              marginBottom: spacing.s8,
              fontSize: 16
            }}>
              Phone number
            </Text>
            <TextInput
              mode="outlined"
              label="Phone number"
              value={phone}
              keyboardType="phone-pad"
              onChangeText={setPhone}
              left={<TextInput.Affix text="IN +91" />}
              style={{ backgroundColor: '#ffffff' }}
              contentStyle={{ height: 52 }}
            />
            <HelperText type={isValidIndianPhone ? 'info' : 'error'} visible>
              {isValidIndianPhone ? 'India (+91)' : 'Enter 10 digits'}
            </HelperText>
          </View>

          {/* Continue with OTP Button */}
          <Button
            mode="contained"
            onPress={handlePhoneContinue}
            accessibilityLabel="Continue with OTP"
            loading={loadingOtp}
            contentStyle={{ height: 52 }}
            style={{ 
              borderRadius: 12, 
              backgroundColor: Brand.secondary,
              marginBottom: spacing.s16
            }}
          >
            Continue with OTP
          </Button>

          {/* Divider */}
          <Text style={{ 
            textAlign: 'center', 
            opacity: 0.7, 
            marginVertical: spacing.s12,
            color: Brand.neutral,
            fontSize: 14
          }}>
            or
          </Text>

          {/* Continue with Google Button */}
          <Button
            mode="contained"
            onPress={handleGoogle}
            accessibilityLabel="Continue with Google"
            loading={loadingGoogle}
            icon={() => <MaterialCommunityIcons name="google" size={22} color="#ffffff" />}
            contentStyle={{ height: 52 }}
            style={{ 
              borderRadius: 12, 
              backgroundColor: Brand.primary,
              marginBottom: spacing.s16
            }}
          >
            Continue with Google
          </Button>

          {/* Footer */}
          <Text style={{ 
            textAlign: 'center', 
            color: Brand.neutral, 
            opacity: 0.8, 
            fontSize: 12,
            lineHeight: 16
          }}>
            By continuing, you agree to the Terms and Privacy Policy
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


