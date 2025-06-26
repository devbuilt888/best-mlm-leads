'use client';

import { UserButton, SignInButton, useUser } from '@clerk/nextjs';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: white;
  border-bottom: 1px solid #e5e7eb;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #2563eb;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const SignInButtonStyled = styled.button`
  background-color: #2563eb;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #1d4ed8;
  }
`;

export default function Header() {
  const { isSignedIn } = useUser();

  return (
    <HeaderContainer>
      <Logo>Lead Dashboard</Logo>
      <Nav>
        {isSignedIn ? (
          <UserButton 
            appearance={{
              elements: {
                userButtonAvatarBox: "w-8 h-8",
                userButtonTrigger: "focus:shadow-none"
              }
            }}
          />
        ) : (
          <SignInButton mode="modal">
            <SignInButtonStyled>
              Sign In
            </SignInButtonStyled>
          </SignInButton>
        )}
      </Nav>
    </HeaderContainer>
  );
} 