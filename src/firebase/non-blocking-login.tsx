'use client';
import {
  Auth,
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from 'firebase/auth';

/** Initiate anonymous sign-in (non-blocking). */
export function initiateAnonymousSignIn(authInstance: Auth) {
  return signInAnonymously(authInstance);
}

/** Initiate email/password sign-up (blocking). */
export function initiateEmailSignUp(authInstance: Auth, email: string, password: string) {
  return createUserWithEmailAndPassword(authInstance, email, password);
}

/** Initiate email/password sign-in (blocking). */
export function initiateEmailSignIn(authInstance: Auth, email: string, password: string) {
  return signInWithEmailAndPassword(authInstance, email, password);
}

/** Initiate Google Sign-In (blocking popup flow). */
export function initiateGoogleSignIn(authInstance: Auth) {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(authInstance, provider);
}

/** Initiate password reset email (blocking). */
export function initiatePasswordReset(authInstance: Auth, email: string) {
  const actionCodeSettings = {
    // URL to redirect back to. This must be a URL that is whitelisted in the Firebase console.
    url: `${window.location.origin}/login`,
    // This must be true.
    handleCodeInApp: true,
  };
  return sendPasswordResetEmail(authInstance, email, actionCodeSettings);
}
