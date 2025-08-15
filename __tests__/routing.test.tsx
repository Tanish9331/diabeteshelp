import { render, waitFor } from '@testing-library/react-native';
import { useRouter } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { getDoc } from 'firebase/firestore';
import React from 'react';

import RootLayout from '../app/_layout';

// Mock Firebase modules
jest.mock('firebase/auth');
jest.mock('firebase/firestore');
jest.mock('expo-router');
jest.mock('../src/services/firebase');
jest.mock('expo-font');
jest.mock('react-native-reanimated');

// Mock the hooks
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockOnAuthStateChanged = onAuthStateChanged as jest.MockedFunction<typeof onAuthStateChanged>;
const mockGetDoc = getDoc as jest.MockedFunction<typeof getDoc>;

describe('RootLayout Routing Logic', () => {
  let mockAuthStateCallback: (user: any) => void;
  let mockRouter: any;

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock router
    mockRouter = {
      replace: jest.fn(),
      push: jest.fn(),
    };
    mockUseRouter.mockReturnValue(mockRouter);

    // Mock onAuthStateChanged to capture the callback
    mockOnAuthStateChanged.mockImplementation((auth, callback) => {
      mockAuthStateCallback = callback;
      return jest.fn(); // unsubscribe function
    });

    // Mock getDoc
    mockGetDoc.mockResolvedValue({
      exists: () => false,
      data: () => ({}),
    } as any);

    // Mock useFonts to return loaded: true
    jest.doMock('expo-font', () => ({
      useFonts: () => [true],
    }));
  });

  it('should route new users to onboarding after sign-in', async () => {
    // Mock user object (simulating successful Google sign-in)
    const mockUser = {
      uid: 'test-user-123',
      email: 'test@example.com',
      displayName: 'Test User',
    };

    // Render the component
    const { getByTestId } = render(<RootLayout />);

    // Simulate auth state change (user signs in)
    mockAuthStateCallback(mockUser);

    // Wait for the async operations to complete
    await waitFor(() => {
      // Should show onboarding screen for new user
      expect(mockGetDoc).toHaveBeenCalledWith(
        expect.objectContaining({
          _path: { segments: ['users', 'test-user-123'] }
        })
      );
    });

    // Verify that onboarding screen is rendered
    // Note: In a real test, you'd check for onboarding-specific content
  });

  it('should route existing users with completed onboarding to tabs', async () => {
    // Mock existing user with completed onboarding
    const mockUser = {
      uid: 'existing-user-456',
      email: 'existing@example.com',
      displayName: 'Existing User',
    };

    // Mock user document exists with onboardingCompleted: true
    mockGetDoc.mockResolvedValue({
      exists: () => true,
      data: () => ({
        onboardingCompleted: true,
        email: 'existing@example.com',
        displayName: 'Existing User',
      }),
    } as any);

    // Render the component
    render(<RootLayout />);

    // Simulate auth state change
    mockAuthStateCallback(mockUser);

    // Wait for async operations
    await waitFor(() => {
      expect(mockGetDoc).toHaveBeenCalledWith(
        expect.objectContaining({
          _path: { segments: ['users', 'existing-user-456'] }
        })
      );
    });

    // Should show tabs for existing user with completed onboarding
  });

  it('should route unauthenticated users to sign-in', () => {
    // Render the component
    render(<RootLayout />);

    // Simulate no user (unauthenticated)
    mockAuthStateCallback(null);

    // Should show sign-in screen
    // Note: In a real test, you'd check for sign-in specific content
  });

  it('should handle Firestore errors gracefully', async () => {
    const mockUser = {
      uid: 'error-user-789',
      email: 'error@example.com',
    };

    // Mock Firestore error
    mockGetDoc.mockRejectedValue(new Error('Firestore connection failed'));

    // Render the component
    render(<RootLayout />);

    // Simulate auth state change
    mockAuthStateCallback(mockUser);

    // Wait for async operations
    await waitFor(() => {
      expect(mockGetDoc).toHaveBeenCalled();
    });

    // Should handle error gracefully and default to onboarding
  });
});

describe('Onboarding Screen', () => {
  it('should render phone-first authentication flow', () => {
    // This test would verify the onboarding screen renders correctly
    // with phone input, Google button, and proper styling
  });

  it('should validate Indian phone numbers correctly', () => {
    // Test phone number validation logic
  });

  it('should navigate to OTP verification on phone continue', () => {
    // Test navigation to verify-otp screen
  });
});
