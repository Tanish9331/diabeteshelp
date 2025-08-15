# Manual Test: New User Sign-In → Onboarding Flow

## Test Setup
1. **Clear app data** or use a fresh device/simulator
2. **Ensure Firebase is configured** with your credentials
3. **Run the app** in development mode

## Test Scenarios

### Scenario 1: New User - Google Sign-In
**Steps:**
1. Open the app
2. You should see the **Sign-In screen** (`app/auth/sign-in.tsx`)
3. Click **"Continue with Google"**
4. Complete Google sign-in process
5. **Expected Result:** App should automatically route to **Onboarding screen** (`app/onboarding/index.tsx`)

**What to Verify:**
- ✅ Sign-in screen appears first
- ✅ Google sign-in works
- ✅ After successful auth, onboarding screen appears
- ✅ Onboarding shows: hero illustration, welcome message, action buttons
- ✅ URL shows `/onboarding` (if using web)

### Scenario 2: New User - Phone OTP Flow
**Steps:**
1. Open the app
2. On sign-in screen, enter a valid Indian phone number (e.g., 9302146764)
3. Click **"Continue with OTP"**
4. **Expected Result:** App should navigate to **OTP verification screen** (`app/auth/verify-otp.tsx`)
5. **Enter test OTP:** `111111` (for development - no Firebase quota used)
6. Click **"Verify & Continue"**
7. **Expected Result:** App should route to **Onboarding screen** (`app/onboarding/index.tsx`)

**What to Verify:**
- ✅ Phone validation works (shows error for invalid numbers)
- ✅ Button is enabled only for valid numbers
- ✅ Navigation to OTP verification screen works
- ✅ OTP screen shows proper styling and phone number
- ✅ **Development hint shows test OTP: 111111**
- ✅ After verification with test OTP, onboarding screen appears
- ✅ Both flows (Google and Phone) lead to onboarding

### Scenario 3: Existing User (Returning)
**Steps:**
1. Complete either of the above new user flows
2. Close the app completely
3. Reopen the app
4. **Expected Result:** App should skip onboarding and go directly to **Tabs/Dashboard**

**What to Verify:**
- ✅ App remembers user is authenticated
- ✅ Onboarding is skipped
- ✅ Dashboard appears immediately
- ✅ URL shows `/(tabs)` (if using web)

### Scenario 4: Onboarding Screen Options
**Steps:**
1. Reach the onboarding screen through either auth method
2. **Expected Result:** Should see two options:
   - "Continue with Phone" (Secondary button)
   - "Continue with Google" (Primary button)

**What to Verify:**
- ✅ Both buttons are visible and functional
- ✅ "Continue with Phone" takes you back to sign-in
- ✅ "Continue with Google" works for additional Google sign-ins
- ✅ Welcome message explains the purpose

## Updated Flow Diagram
```
Sign-In Screen
├── Google Sign-In → Onboarding Screen
└── Phone OTP → OTP Verification → Onboarding Screen

Onboarding Screen
├── Continue with Phone → Back to Sign-In
└── Continue with Google → Onboarding (if new user) or Tabs (if existing)
```

## Debug Information

### Check Console Logs
Look for these messages:
```
Error checking onboarding status: [error details]
OTP verification error: [error details]
```

### Check Firebase Console
1. Go to Firebase Console → Authentication → Users
2. Verify new user was created (both Google and Phone users)
3. Go to Firestore → users collection
4. Check if user document exists and has `onboardingCompleted: false`

### Check App State
In `app/_layout.tsx`, the routing logic:
```typescript
if (currentUser) {
  if (onboardingCompleted) {
    // Show tabs
  } else {
    // Show onboarding
  }
} else {
  // Show sign-in
}
```

## Common Issues & Solutions

### Issue: App stays on sign-in screen
**Possible Cause:** Firebase not initialized properly
**Solution:** Check Firebase config in `app.json` or `.env`

### Issue: App crashes after Google sign-in
**Possible Cause:** Firestore permission issues
**Solution:** Check Firestore security rules

### Issue: Onboarding screen doesn't appear
**Possible Cause:** `onboardingCompleted` check failing
**Solution:** Check console for errors in the `useEffect` of `_layout.tsx`

### Issue: Phone OTP flow doesn't work
**Possible Cause:** Firebase phone auth not configured
**Solution:** Enable Phone provider in Firebase Console

### Issue: Infinite loading
**Possible Cause:** Font loading or auth state stuck
**Solution:** Check if fonts are loading properly

## Success Criteria
- ✅ New users see onboarding after both Google and Phone sign-in
- ✅ Existing users go directly to dashboard
- ✅ Phone validation works correctly
- ✅ OTP verification leads to onboarding
- ✅ Navigation between screens is smooth
- ✅ No crashes or infinite loading states
- ✅ Both auth methods create user documents with `onboardingCompleted: false`

## Test Data
- **Test Phone:** 9302146764 (prefilled in sign-in)
- **Test Email:** Use your Google account for testing
- **Test OTP:** 111111 (development mode - no Firebase quota used)
- **Expected Routes:** 
  - Google: sign-in → onboarding
  - Phone: sign-in → OTP verification → onboarding
  - Both: onboarding → tabs (after profile completion)
