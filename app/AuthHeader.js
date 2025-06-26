'use client';
import { useAuth } from '@clerk/nextjs';
import Header from './header';

export default function AuthHeader() {
  const { isSignedIn } = useAuth();
  if (!isSignedIn) return null;
  return <Header />;
} 