'use client';

import styled from 'styled-components';

const HeaderContainer = styled.header`
  background: linear-gradient(to right, #2563eb, #1e3a8a);
  padding: 1rem 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 640px) {
    padding: 0.75rem 1rem;
    text-align: center;
  }
`;

const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: 800;
  letter-spacing: -0.5px;
  color: #ffffff;
`;

export default function Header() {
  return (
    <HeaderContainer>
      <Logo>🚀 Lead</Logo>
    </HeaderContainer>
  );
}
