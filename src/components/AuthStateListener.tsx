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

    const authRoutes = ['/login', '/signup', '/select-role', '/forgot-password'];
    const isAuthRoute = authRoutes.includes(pathname);
    const isPublicHome = pathname === '/';

    if (user) {
      // User is logged in
      const userDocRef = doc(firestore, 'users', user.uid);
      getDoc(userDocRef).then(docSnap => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          const role = userData.role;
          
          const targetDashboard = `/${role}/dashboard`;

          // Redirect to the correct dashboard if they are on an auth route, the home page, or the wrong dashboard
          if (role && !pathname.startsWith(`/${role}`)) {
             router.push(targetDashboard);
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
      // If user is on a protected page, redirect to login.
      if (!isAuthRoute && !isPublicHome) {
        router.push('/login');
      }
    }
  }, [user, isUserLoading, router, pathname, firestore]);

  return null; // This component doesn't render anything
}
