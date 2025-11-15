'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp, FirebaseOptions } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage';

// IMPORTANT: DO NOT MODIFY THIS FUNCTION
export function initializeFirebase() {
  if (getApps().length > 0) {
    return getSdks(getApp());
  }

  let app: FirebaseApp;

  // This logic enables automatic initialization of Firebase in a hosted environment
  // while still allowing for local development with a config object.
  if (process.env.FIREBASE_CONFIG) {
    // If running in a Firebase-hosted environment, the SDK will automatically 
    // use the FIREBASE_CONFIG environment variable.
    // We parse it to ensure our storageBucket is included.
    const firebaseEnvConfig = JSON.parse(process.env.FIREBASE_CONFIG);
    const config: FirebaseOptions = {
        ...firebaseEnvConfig,
        storageBucket: firebaseConfig.storageBucket, // Explicitly add storage bucket
    };
    app = initializeApp(config);
  } else {
    // Otherwise, for local development, use the explicit config object.
    // This prevents the "app/no-options" error during `next build`.
    app = initializeApp(firebaseConfig);
  }

  return getSdks(app);
}

export function getSdks(firebaseApp: FirebaseApp) {
  return {
    firebaseApp,
    auth: getAuth(firebaseApp),
    firestore: getFirestore(firebaseApp),
    storage: getStorage(firebaseApp)
  };
}

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './non-blocking-updates';
export * from './non-blocking-login';
export * from './errors';
export * from './error-emitter';
export { useUser } from './provider';