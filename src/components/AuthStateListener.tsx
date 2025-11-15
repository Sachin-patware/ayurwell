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
    if (isUserLoading || !firestore) {
      return; // Wait until user state is determined and firestore is available
    }

    const publicRoutes = ['/', '/login', '/signup', '/select-role', '/forgot-password'];
    const isPublicRoute = publicRoutes.includes(pathname);
    
    if (user) {
      // User is logged in
      const userDocRef = doc(firestore, 'users', user.uid);
      getDoc(userDocRef).then(docSnap => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          const role = userData.role;
          
          if (role === 'admin' && pathname !== '/admin/dashboard') {
            router.push('/admin/dashboard');
          } else if (role === 'practitioner' && pathname !== '/practitioner/dashboard') {
            router.push('/practitioner/dashboard');
          } else if (role === 'patient' && pathname !== '/patient/dashboard') {
            router.push('/patient/dashboard');
          } else if (pathname === '/select-role') {
            // If user has a role but is on select-role page, redirect them away.
            if (role === 'admin') router.push('/admin/dashboard');
            else if (role === 'practitioner') router.push('/practitioner/dashboard');
            else if (role === 'patient') router.push('/patient/dashboard');
          }

        } else {
          // New user (likely from Google Sign In), profile doesn't exist yet.
          // Redirect to role selection page.
          if (pathname !== '/select-role') {
            router.push('/select-role');
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
