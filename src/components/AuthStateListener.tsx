'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useUser, useFirestore } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';

export function AuthStateListener() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const firestore = useFirestore();

  useEffect(() => {
    if (isUserLoading) {
      return; // Wait until user state is determined
    }

    const publicRoutes = ['/', '/login', '/signup'];
    const isPublicRoute = publicRoutes.includes(pathname);
    
    if (user) {
      // User is logged in
      const userDocRef = doc(firestore, 'users', user.uid);
      getDoc(userDocRef).then(docSnap => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          const role = userData.role;
          
          if (role === 'practitioner' && !pathname.startsWith('/practitioner')) {
            router.push('/practitioner/dashboard');
          } else if (role === 'patient' && !pathname.startsWith('/patient')) {
            router.push('/patient/dashboard');
          } else if (role === 'admin' && !pathname.startsWith('/admin')) {
            router.push('/admin');
          } else if (!role && isPublicRoute) {
            // New user, default to patient dashboard for now
            // TODO: Implement a role selection screen
            router.push('/patient/dashboard');
          }

        } else {
          // New user, default to patient dashboard for now
          // This is where you might create the user document with a default role
           if (isPublicRoute || pathname.startsWith('/login') || pathname.startsWith('/signup')) {
             router.push('/patient/dashboard');
           }
        }
      });

    } else {
      // User is not logged in
      if (!isPublicRoute) {
        router.push('/login');
      }
    }
  }, [user, isUserLoading, router, pathname, firestore]);

  return null; // This component doesn't render anything
}
