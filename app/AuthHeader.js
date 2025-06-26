'use client';
import { useAuth } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import Header from './header';

export default function AuthHeader() {
  const { isSignedIn } = useAuth();
  const pathname = usePathname();
  
  // Hide header on sign-in, sign-up, and landing page
  const hideHeaderRoutes = ['/', '/sign-in', '/sign-up'];
  if (hideHeaderRoutes.includes(pathname)) {
    return null;
  }
  
  // Show header on all other pages
  return <Header />;
} 