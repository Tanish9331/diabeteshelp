import Constants from 'expo-constants';
import { getApps, initializeApp, type FirebaseApp, type FirebaseOptions } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

function readFirebaseConfig(): FirebaseOptions {
  const extra = (Constants.expoConfig?.extra || {}) as Record<string, string>;
  return {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || extra.EXPO_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || extra.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || extra.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || extra.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_SENDER_ID || extra.EXPO_PUBLIC_FIREBASE_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || extra.EXPO_PUBLIC_FIREBASE_APP_ID,
  } as FirebaseOptions;
}

function initFirebaseApp(): FirebaseApp {
  const existing = getApps()[0];
  if (existing) return existing;
  const config = readFirebaseConfig();
  try {
    if (!config.apiKey || !config.projectId || !config.appId) {
      console.warn('Firebase config incomplete. Please set keys in app.json extra or .env');
    }
    return initializeApp(config);
  } catch (err) {
    console.error('Firebase initialization failed:', err);
    throw err;
  }
}

const app = initFirebaseApp();

// Initialize Auth with persistence where available
const auth = getAuth(app);
export { auth };
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;


