import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React, { useEffect, useRef } from 'react';
import { Animated, Easing, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const pulse = useRef(new Animated.Value(1)).current;
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Pulse animation for hero illustration
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.1, duration: 2200, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1, duration: 2200, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ])
    );

    // Fade in animation
    Animated.timing(fade, { toValue: 1, duration: 1000, useNativeDriver: true }).start();
    pulseLoop.start();

    return () => pulseLoop.stop();
  }, [pulse, fade]);

  const handlePhoneContinue = () => {
    // Simple test bypass - navigate to success
    console.log('Phone OTP flow - test bypass');
  };

  const handleGoogleContinue = () => {
    // Simple test bypass - navigate to success
    console.log('Google sign-in - test bypass');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section (40% screen height) */}
        <View style={styles.heroSection}>
          <Animated.View style={[styles.heroIllustration, { opacity: fade, transform: [{ scale: pulse }] }]}>
            {/* Main Heart Icon */}
            <View style={styles.heartIcon}>
              <MaterialCommunityIcons name="heart-pulse" size={60} color="#ffffff" />
            </View>
            
            {/* Glucose Meter Icon */}
            <View style={styles.glucoseIcon}>
              <MaterialCommunityIcons name="monitor-dashboard" size={28} color="#ffffff" />
            </View>
            
            {/* Small accent elements */}
            <View style={styles.accent1} />
            <View style={styles.accent2} />
          </Animated.View>
          
          <Text style={styles.heroTitle}>
            <Text style={styles.welcomeText}>Welcome to </Text>
            <Text style={styles.brandText}>DiabetesHelp.in</Text>
          </Text>
          <Text style={styles.heroSubtitle}>Your personal diabetes management companion</Text>
        </View>

        {/* Benefit Cards (horizontal row) */}
        <View style={styles.benefitSection}>
          <View style={styles.benefitRow}>
            {/* Track Meals Card */}
            <View style={styles.benefitCard}>
              <View style={styles.benefitIcon}>
                <MaterialCommunityIcons name="food-apple" size={24} color="#2D6A9D" />
              </View>
              <Text style={styles.benefitText}>Track meals</Text>
            </View>

            {/* Monitor Glucose Card */}
            <View style={styles.benefitCard}>
              <View style={styles.benefitIcon}>
                <MaterialCommunityIcons name="chart-line" size={24} color="#2D6A9D" />
              </View>
              <Text style={styles.benefitText}>Monitor glucose</Text>
            </View>

            {/* Diet Plans Card */}
            <View style={styles.benefitCard}>
              <View style={styles.benefitIcon}>
                <MaterialCommunityIcons name="clipboard-text" size={24} color="#2D6A9D" />
              </View>
              <Text style={styles.benefitText}>Diet plans</Text>
            </View>
          </View>
        </View>

        {/* Phone Input */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Phone number</Text>
          <TextInput
            mode="outlined"
            label="Phone number"
            value="9302146764"
            left={<TextInput.Affix text="+91" />}
            style={styles.phoneInput}
            contentStyle={styles.inputContent}
          />
        </View>

        {/* Primary Button */}
        <Button
          mode="contained"
          onPress={handlePhoneContinue}
          style={[styles.button, styles.primaryButton]}
          contentStyle={styles.buttonContent}
        >
          Continue with OTP
        </Button>

        {/* Divider */}
        <Text style={styles.divider}>or</Text>

        {/* Secondary Button */}
        <Button
          mode="contained"
          onPress={handleGoogleContinue}
          style={[styles.button, styles.secondaryButton]}
          contentStyle={styles.buttonContent}
          icon={() => <MaterialCommunityIcons name="google" size={22} color="#ffffff" />}
        >
          Continue with Google
        </Button>

        {/* Footer */}
        <Text style={styles.footer}>
          By continuing, you agree to the Terms and Privacy Policy
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FAFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },
  
  // Hero Section (40% screen height)
  heroSection: {
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 16,
  },
  heroIllustration: {
    alignItems: 'center',
    position: 'relative',
  },
  heartIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#2D6A9D', // Primary
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2D6A9D',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  glucoseIcon: {
    position: 'absolute',
    right: -20,
    top: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#5CB85C', // Secondary
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#5CB85C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  accent1: {
    position: 'absolute',
    left: -15,
    bottom: 15,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#F39C12', // Warning
    opacity: 0.8,
  },
  accent2: {
    position: 'absolute',
    right: 10,
    bottom: -10,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#E8F4FD', // Light Blue
    opacity: 0.6,
  },
  heroTitle: {
    textAlign: 'center',
    marginTop: 24,
    marginHorizontal: 24,
  },
  welcomeText: {
    color: '#2D6A9D', // Primary
    fontSize: 28,
    fontWeight: '700',
  },
  brandText: {
    color: '#1A4A7A', // Darker Primary for more contrast
    fontSize: 32, // Larger than welcome text
    fontWeight: '800', // Bolder than welcome text
  },
  heroSubtitle: {
    color: '#7F8C8D', // Neutral
    fontSize: 16,
    textAlign: 'center',
    marginTop: 8,
    marginHorizontal: 32,
    lineHeight: 22,
  },

  // Benefit Cards
  benefitSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  benefitRow: {
    flexDirection: 'row',
    gap: 12,
  },
  benefitCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8F4FD', // Light Blue
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  benefitIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F4FD', // Light Blue
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  benefitText: {
    color: '#2D6A9D', // Primary
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },

  // Phone Input
  inputSection: {
    marginBottom: 24,
  },
  inputLabel: {
    color: '#2D6A9D', // Primary
    fontWeight: '600',
    marginBottom: 8,
    fontSize: 16,
  },
  phoneInput: {
    backgroundColor: '#ffffff',
  },
  inputContent: {
    height: 52,
  },

  // Buttons
  button: {
    borderRadius: 12,
    marginBottom: 12, // Reduced from 16 to 12
  },
  buttonContent: {
    height: 52,
  },
  primaryButton: {
    backgroundColor: '#5CB85C', // Secondary (Green)
  },
  secondaryButton: {
    backgroundColor: '#2D6A9D', // Primary (Blue)
  },

  // Divider
  divider: {
    textAlign: 'center',
    opacity: 0.7,
    marginVertical: 8, // Reduced from 12 to 8 for more equal spacing
    color: '#7F8C8D', // Neutral
    fontSize: 14,
  },

  // Footer
  footer: {
    textAlign: 'center',
    color: '#7F8C8D', // Neutral
    opacity: 0.8,
    fontSize: 12,
    lineHeight: 16,
    marginTop: 8,
    marginBottom: 24,
  },
});
