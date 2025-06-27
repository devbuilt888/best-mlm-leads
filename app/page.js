'use client';

import { useAuth, SignOutButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

const Centered = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(120deg,rgb(7, 55, 131),rgb(25, 60, 77),rgb(82, 5, 60),rgb(31, 8, 0),rgb(1, 16, 41));
  background-size: 300% 300%;
  animation: gradientShift 10s ease infinite;

  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

const Card = styled.div`
  background: #fff;
  border-radius: 1.25rem;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.12);
  border: 1px solid #e0e7ef;
  padding: 2rem;
  max-width: 360px;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const BigTitle = styled.h1`
  font-size: 1.9rem;
  color: #2563eb;
  font-weight: 800;
  margin: 0;
`;

const SubText = styled.p`
  font-size: 1rem;
  color: #334155;
  margin: 0;
`;

const SignInButtonStyled = styled.button`
color: white;
font-weight: 700;
padding: 0.75rem 1.5rem;
border-radius: 0.875rem;
border: none;
cursor: pointer;
background: linear-gradient(
  120deg,
  rgb(1, 16, 41),
  rgb(25, 60, 77),
  rgb(82, 5, 60),
  rgb(31, 8, 0),
  rgb(7, 55, 131)
);
background-size: 300% 300%;
transition: background-position 0.5s ease, transform 0.3s ease;

&:hover {
  background-position: right center;
  transform: scale(1.05);
}

`;

const SignUpPrompt = styled.div`
  font-size: 0.9rem;
  color: #64748b;

  span {
    color: #2563eb;
    font-weight: 600;
    cursor: pointer;
    text-decoration: underline;

    &:hover {
      color: #1e40af;
    }
  }
`;

const UserInfo = styled.div`
  background: #f3f4f6;
  padding: 1rem;
  border-radius: 0.75rem;
`;

const SignOutButtonStyled = styled.button`
  background-color: #dc2626;
  color: white;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  margin-top: 0.5rem;

  &:hover {
    background-color: #b91c1c;
  }
`;

export default function Home() {
  const { isSignedIn, user } = useAuth();
  const router = useRouter();

  const handleSignIn = () => {
    router.push('/sign-in');
  };

  const handleSignUp = () => {
    router.push('/sign-up');
  };

  return (
    <Centered>
      {isSignedIn ? (
        <Card>
          <BigTitle>Welcome Back!</BigTitle>
          <UserInfo>
            <p>Hi, {user?.firstName || user?.emailAddresses[0]?.emailAddress}!</p>
            <p>You're signed in to your lead dashboard.</p>
          </UserInfo>
          <SignOutButtonStyled>
            <SignOutButton />
          </SignOutButtonStyled>
        </Card>
      ) : (
        <Card>
          <BigTitle>Welcome to Lead Dashboard</BigTitle>
          <SubText>Please <strong>sign in</strong> to continue.</SubText>
          
          <SignInButtonStyled onClick={handleSignIn}>
            Sign In
          </SignInButtonStyled>

          <SignUpPrompt>
            Don't have an account? <span onClick={handleSignUp}>Sign Up</span>
          </SignUpPrompt>
        </Card>
      )}
    </Centered>
  );
}
