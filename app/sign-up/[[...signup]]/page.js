'use client';

import { SignUp } from '@clerk/nextjs';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(120deg,rgb(7, 55, 131),rgb(25, 60, 77),rgb(82, 5, 60),rgb(31, 8, 0),rgb(1, 16, 41));
  background-size: 300% 300%;
  animation: gradientShift 10s ease infinite;
  padding: 1rem;

  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  @media (min-width: 640px) {
    padding: 3rem 1.5rem;
  }
  
  @media (min-width: 1024px) {
    padding: 3rem 2rem;
  }
`;

const Content = styled.div`
  max-width: 28rem;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export default function SignUpPage() {
  return (
    <Container>
      <Content>
        <SignUp 
          appearance={{
            elements: {
              formButtonPrimary: `
                background: linear-gradient(
                  120deg,
                  rgb(1, 16, 41),
                  rgb(25, 60, 77),
                  rgb(82, 5, 60),
                  rgb(31, 8, 0),
                  rgb(7, 55, 131)
                );
                background-size: 300% 300%;
                color: white;
                font-weight: 600;
                padding: 0.75rem 1.5rem;
                border-radius: 0.5rem;
                transition: background-position 0.5s ease, transform 0.3s ease;
                border: none;
                cursor: pointer;
                
                &:hover {
                  background-position: right center;
                  transform: scale(1.02);
                }
              `,
              card: `
                background-color: white;
                box-shadow: 0 6px 24px rgba(0, 0, 0, 0.12);
                border-radius: 1.25rem;
                border: 1px solid #e0e7ef;
                padding: 2rem;
              `,
              headerTitle: `
                font-size: 1.75rem;
                font-weight: 800;
                color: #2563eb;
                text-align: center;
              `,
              headerSubtitle: `
                color: #64748b;
                text-align: center;
                margin-top: 0.5rem;
              `,
              socialButtonsBlockButton: `
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 0.75rem 1rem;
                border: 1px solid #d1d5db;
                border-radius: 0.5rem;
                box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
                background-color: white;
                font-size: 0.875rem;
                font-weight: 500;
                color: #374151;
                transition: all 0.2s;
                cursor: pointer;
                
                &:hover {
                  background-color: #f9fafb;
                  transform: translateY(-1px);
                  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
                }
              `,
              formFieldInput: `
                appearance: none;
                position: relative;
                display: block;
                width: 100%;
                padding: 0.75rem;
                border: 1px solid #d1d5db;
                border-radius: 0.5rem;
                color: #111827;
                font-size: 0.875rem;
                transition: all 0.2s;
                
                &:focus {
                  outline: none;
                  border-color: #2563eb;
                  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
                }
                
                &::placeholder {
                  color: #9ca3af;
                }
              `,
              footerActionLink: `
                color: #2563eb;
                font-weight: 600;
                text-decoration: none;
                
                &:hover {
                  color: #1e40af;
                  text-decoration: underline;
                }
              `
            }
          }}
          redirectUrl="/dashboard"
          routing="path"
          path="/sign-up"
          signInUrl="/sign-in"
          forceRedirectUrl="/dashboard"
        />
      </Content>
    </Container>
  );
} 