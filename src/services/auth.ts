import * as AuthSession from 'expo-auth-session';
import Constants from 'expo-constants';
import * as WebBrowser from 'expo-web-browser';
import { GoogleAuthProvider, signInWithCredential, signOut } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenEndpoint: 'https://oauth2.googleapis.com/token',
  revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
};

export async function signInWithGoogle(): Promise<void> {
  const redirectUri = AuthSession.makeRedirectUri();
  const clientId =
    process.env.EXPO_PUBLIC_GOOGLE_OAUTH_CLIENT_ID ||
    (Constants.expoConfig?.extra as any)?.EXPO_PUBLIC_GOOGLE_OAUTH_CLIENT_ID;
  // @ts-ignore - startAsync type may not be exposed in current typings
  const result = await (AuthSession as any).startAsync({
    authUrl:
      `${discovery.authorizationEndpoint}?response_type=token&client_id=${clientId}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&scope=${encodeURIComponent('profile email')}`,
  });

  if (result.type !== 'success' || !result.params || !result.params.access_token) {
    throw new Error('Google sign-in cancelled or failed');
  }

	// Exchange access token for Firebase credential via GoogleAuthProvider
  const credential = GoogleAuthProvider.credential(null, result.params.access_token);
  const userCred = await signInWithCredential(auth, credential);

	// Ensure user document exists
  const ref = doc(db, 'users', userCred.user.uid);
  await setDoc(
    ref,
    {
      email: userCred.user.email ?? null,
      displayName: userCred.user.displayName ?? null,
      photoURL: userCred.user.photoURL ?? null,
      lastLoginAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    },
    { merge: true },
  );
}

export async function signOutUser(): Promise<void> {
	await signOut(auth);
}


