'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import Link from 'next/link';
import Image from 'next/image';
import Onboarding from './components/Onboarding';
import Dashboard from './dashboard/page';
import styles from './page.module.css';

export default function Home() {
  const { isLoaded, isSignedIn } = useAuth();
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [userAnswers, setUserAnswers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check if onboarding is complete
      const storedAnswers = localStorage.getItem('onboarding_answers');
      if (storedAnswers) {
        setUserAnswers(JSON.parse(storedAnswers));
        setOnboardingComplete(true);
      }
      setIsLoading(false);
    }
  }, []);

  const handleOnboardingComplete = (answers) => {
    setUserAnswers(answers);
    setOnboardingComplete(true);
  };

  if (!isLoaded || isLoading) {
    return (
      <div className={styles.page}>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className={styles.page}>
        <main className={styles.main}>
          <div className={styles.hero}>
            <h1 className={styles.title}>
              Welcome to Your <span className={styles.accent}>Lead Dashboard</span>
            </h1>
            <p className={styles.description}>
              Discover high-quality MLM leads and grow your network marketing business with our cutting-edge platform.
            </p>
            <div className={styles.actions}>
              <Link href="/sign-in" className={styles.primaryButton}>
                Sign In
              </Link>
              <Link href="/sign-up" className={styles.secondaryButton}>
                Get Started
              </Link>
            </div>
          </div>

          <div className={styles.features}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>🎯</div>
              <h3>Targeted Leads</h3>
              <p>Access high-quality, pre-qualified leads that match your business needs.</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>📧</div>
              <h3>AI Email Generator</h3>
              <p>Create personalized outreach emails with our advanced AI technology.</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>📊</div>
              <h3>Analytics Dashboard</h3>
              <p>Track your progress and optimize your network marketing strategy.</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // If signed in but onboarding not complete, show onboarding
  if (!onboardingComplete) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  // If signed in and onboarding complete, show dashboard
  return <Dashboard userAnswers={userAnswers} />;
}
