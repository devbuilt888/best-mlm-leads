'use client';

import { useAuth, SignOutButton } from '@clerk/nextjs';
import styled from 'styled-components';
import Image from "next/image";
import styles from "./page.module.css";

const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const AuthButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s;
  cursor: pointer;
  
  &.primary {
    background-color: #2563eb;
    color: white;
    
    &:hover {
      background-color: #1d4ed8;
    }
  }
  
  &.secondary {
    background-color: transparent;
    color: #2563eb;
    border: 1px solid #2563eb;
    
    &:hover {
      background-color: #2563eb;
      color: white;
    }
  }
`;

const SignOutButtonStyled = styled.button`
  background-color: #dc2626;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #b91c1c;
  }
`;

const UserInfo = styled.div`
  background-color: #f3f4f6;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  text-align: center;
`;

export default function Home() {
  const { isSignedIn, user } = useAuth();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        
        <AuthContainer>
          {isSignedIn ? (
            <>
              <UserInfo>
                <p>Welcome, {user?.firstName || user?.emailAddresses[0]?.emailAddress}!</p>
                <p>You are signed in to your lead dashboard.</p>
              </UserInfo>
              <SignOutButtonStyled>
                <SignOutButton />
              </SignOutButtonStyled>
            </>
          ) : (
            <>
              <p>Please sign in to access your lead dashboard</p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <AuthButton href="/sign-in" className="primary">
                  Sign In
                </AuthButton>
                <AuthButton href="/sign-up" className="secondary">
                  Sign Up
                </AuthButton>
              </div>
            </>
          )}
        </AuthContainer>

        <ol>
          <li>
            Get started by editing <code>src/app/page.js</code>.
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={styles.logo}
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
