'use client';

import { useState, useMemo, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useAuth, SignOutButton } from '@clerk/nextjs';
import NetworkingTips from '../components/NetworkingTips';
import EmailEditor from '../components/EmailEditor';
import DayPlanner from '../components/DayPlanner';

// Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

// Main Container with sophisticated background
const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(120deg, rgb(7, 55, 131), rgb(25, 60, 77), rgb(82, 5, 60), rgb(31, 8, 0), rgb(1, 16, 41));
  background-size: 300% 300%;
  animation: ${gradientShift} 15s ease infinite;
  position: relative;
  overflow-x: hidden;
  
  // Texture overlay with crosses pattern
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0);
    background-size: 20px 20px;
    pointer-events: none;
    z-index: 1;
  }
  
  // Additional subtle pattern
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.02) 50%, transparent 60%);
    background-size: 40px 40px;
    pointer-events: none;
    z-index: 1;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

// Mailbox Header Section
const MailboxHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 3rem;
  animation: ${fadeInUp} 0.8s ease-out;
`;

const MailboxTitle = styled.h1`
  font-size: 3rem;
  font-weight: 900;
  background: linear-gradient(135deg, #ffffff 0%, #e0e7ff 30%, #c7d2fe 60%, #a5b4fc 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  letter-spacing: -0.02em;
  font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, #667eea, #764ba2);
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.4);
  }
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const MailboxContainer = styled.div`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 24px;
  padding: 1.5rem 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    background: rgba(255, 255, 255, 0.2);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
  }
  
  &:hover::before {
    left: 100%;
  }
`;

const MailboxIcon = styled.div`
  font-size: 2rem;
  animation: ${pulse} 2s infinite;
`;

const MailboxText = styled.div`
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
`;

const NewLeadsCount = styled.div`
  background: linear-gradient(135deg, #ff4757, #ff3742);
  color: white;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  font-weight: 700;
  font-size: 0.9rem;
  box-shadow: 0 4px 12px rgba(255, 71, 87, 0.3);
  animation: ${pulse} 1.5s infinite;
`;

// Leads Grid
const LeadsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
  animation: ${fadeInUp} 0.8s ease-out 0.2s both;
`;

const LeadCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  padding: 1.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
    border-color: rgba(255, 255, 255, 0.5);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #667eea, #764ba2, #f093fb, #f5576c, #4facfe, #00f2fe);
    background-size: 300% 100%;
    animation: ${gradientShift} 3s ease infinite;
  }
`;

const LeadHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const LeadName = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
  margin-bottom: 0.25rem;
`;

const LeadCompany = styled.div`
  font-size: 0.9rem;
  color: #64748b;
  font-weight: 500;
`;

const LeadStatus = styled.div`
  background: ${props => props.$isNew ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #6b7280, #4b5563)'};
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ContactInfo = styled.div`
  margin: 1rem 0;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  padding: 0.75rem;
  background: rgba(248, 250, 252, 0.8);
  border-radius: 12px;
  transition: all 0.2s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  
  &:hover {
    background: rgba(241, 245, 249, 1);
    transform: translateX(4px);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent);
    transition: left 0.3s;
  }
  
  &:hover::after {
    left: 100%;
    animation: ${shimmer} 0.6s ease;
  }
`;

const ContactIcon = styled.div`
  font-size: 1.1rem;
  color: #3b82f6;
  width: 20px;
  text-align: center;
`;

const ContactText = styled.div`
  flex: 1;
  font-weight: 500;
  color: #374151;
  font-size: 0.95rem;
`;

const CopyButton = styled.button`
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  opacity: 0;
  transform: scale(0.8);
  
  ${ContactItem}:hover & {
    opacity: 1;
    transform: scale(1);
  }
  
  &:hover {
    background: linear-gradient(135deg, #2563eb, #1d4ed8);
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const LeadDescription = styled.div`
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1));
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 12px;
  padding: 1rem;
  margin-top: 1rem;
  font-size: 0.9rem;
  line-height: 1.5;
  color: #4b5563;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  color: white;
  font-size: 1.1rem;
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ViewToggle = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  animation: ${fadeInUp} 0.8s ease-out 0.1s both;
  background: rgba(255, 255, 255, 0.12);
  padding: 0.5rem;
  border-radius: 16px;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const ToggleButton = styled.button`
  background: ${props => props.$active ? 
    'linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.2))' : 
    'transparent'
  };
  color: white;
  border: ${props => props.$active ? 
    '1px solid rgba(255, 255, 255, 0.4)' : 
    '1px solid transparent'
  };
  border-radius: 12px;
  padding: 0.75rem 1.5rem;
  font-weight: ${props => props.$active ? '700' : '600'};
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
    transition: left 0.5s;
  }
  
  &:hover {
    background: ${props => props.$active ? 
      'linear-gradient(135deg, rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0.25))' : 
      'rgba(255, 255, 255, 0.15)'
    };
    transform: translateY(-1px);
    border-color: rgba(255, 255, 255, 0.3);
    
    &::before {
      left: 100%;
    }
  }
`;

// User Menu Components
const UserMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserAvatar = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  color: white;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 1.1rem;
  cursor: pointer;
  border: 3px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.3);
  font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent);
    transform: rotate(45deg);
    transition: transform 0.6s;
  }
  
  &:hover {
    transform: scale(1.15) translateY(-2px);
    border-color: rgba(255, 255, 255, 0.6);
    box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
    
    &::before {
      transform: rotate(45deg) translate(50%, 50%);
    }
  }
`;

const UserDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 1rem;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 20px;
  padding: 1rem;
  min-width: 280px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.2);
  z-index: 100;
  display: ${props => props.$isOpen ? 'block' : 'none'};
  transform-origin: top right;
  animation: ${props => props.$isOpen ? 'dropdownOpen 0.3s cubic-bezier(0.4, 0, 0.2, 1)' : 'none'};
  font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
  
  @keyframes dropdownOpen {
    from {
      opacity: 0;
      transform: scale(0.95) translateY(-10px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }
  
  &::before {
    content: '';
    position: absolute;
    top: -8px;
    right: 16px;
    width: 16px;
    height: 16px;
    background: rgba(255, 255, 255, 0.98);
    border: 1px solid rgba(255, 255, 255, 0.4);
    border-bottom: none;
    border-right: none;
    transform: rotate(45deg);
    border-radius: 2px 0 0 0;
  }
`;

const UserInfo = styled.div`
  padding: 1rem;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.08), rgba(139, 92, 246, 0.08));
  border-radius: 16px;
  margin-bottom: 1rem;
  border: 1px solid rgba(102, 126, 234, 0.15);
`;

const UserName = styled.div`
  font-weight: 700;
  color: #1e293b;
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
  letter-spacing: -0.01em;
`;

const UserEmail = styled.div`
  color: #64748b;
  font-size: 0.85rem;
  font-weight: 500;
  opacity: 0.8;
`;

const UserRole = styled.div`
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 0.5rem;
  display: inline-block;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
`;

const SignOutBtn = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
  border: none;
  border-radius: 14px;
  padding: 0.75rem 1rem;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
  }
  
  &:hover {
    background: linear-gradient(135deg, #dc2626, #b91c1c);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(239, 68, 68, 0.4);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(0);
  }
`;

// Mock data for leads
const mockLeads = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@techcorp.com",
    linkedin: "linkedin.com/in/sarahjohnson",
    company: "TechCorp Solutions",
    description: "Looking for MLM opportunities in the tech space. Has expressed interest in digital marketing solutions and network building.",
    isNew: true,
    date: "2024-01-15"
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "m.chen@innovateplus.io",
    linkedin: "linkedin.com/in/michaelchen",
    company: "InnovatePlus",
    description: "Entrepreneur seeking passive income opportunities. Previously involved in e-commerce and interested in expanding network.",
    isNew: true,
    date: "2024-01-15"
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    email: "emma.r@healthfirst.net",
    linkedin: "linkedin.com/in/emmarodriguez",
    company: "HealthFirst Wellness",
    description: "Wellness industry professional looking for business opportunities. Strong social media presence and network.",
    isNew: false,
    date: "2024-01-14"
  },
  {
    id: 4,
    name: "David Thompson",
    email: "david.thompson@globalreach.com",
    linkedin: "linkedin.com/in/davidthompson",
    company: "Global Reach Marketing",
    description: "Marketing executive interested in network marketing. Has experience in team building and lead generation.",
    isNew: true,
    date: "2024-01-15"
  },
  {
    id: 5,
    name: "Lisa Wang",
    email: "lisa.wang@creativestudio.design",
    linkedin: "linkedin.com/in/lisawang",
    company: "Creative Studio Design",
    description: "Creative professional seeking additional income streams. Strong design background and social network.",
    isNew: false,
    date: "2024-01-13"
  },
  {
    id: 6,
    name: "Robert Martinez",
    email: "r.martinez@financepro.biz",
    linkedin: "linkedin.com/in/robertmartinez",
    company: "FinancePro Services",
    description: "Financial advisor interested in expanding service offerings. Looking for residual income opportunities.",
    isNew: true,
    date: "2024-01-15"
  }
];

export default function Dashboard({ userAnswers }) {
  const [showLeads, setShowLeads] = useState(false);
  const [filter, setFilter] = useState('all'); // 'all', 'new', 'contacted'
  const [loading, setLoading] = useState(false);
  const [copiedText, setCopiedText] = useState('');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  
  const { user } = useAuth();

  const newLeadsCount = mockLeads.filter(lead => lead.isNew).length;

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuOpen && !event.target.closest('[data-user-menu]')) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userMenuOpen]);

  const filteredLeads = useMemo(() => {
    if (filter === 'new') {
      return mockLeads.filter(lead => lead.isNew);
    }
    return mockLeads;
  }, [filter]);

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(`${type}:${text}`);
      setTimeout(() => setCopiedText(''), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleMailboxClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowLeads(true);
    }, 1500);
  };

  if (loading) {
    return (
      <Container>
        <ContentWrapper>
          <LoadingContainer>
            <LoadingSpinner />
            <div>Loading your new leads...</div>
          </LoadingContainer>
        </ContentWrapper>
      </Container>
    );
  }

  return (
    <Container>
      <ContentWrapper>
        {!showLeads ? (
          <>
            <MailboxHeader>
              <MailboxTitle>Lead Dashboard</MailboxTitle>
              <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <MailboxContainer onClick={handleMailboxClick}>
                  <MailboxIcon>📧</MailboxIcon>
                  <MailboxText>You have new leads!</MailboxText>
                  <NewLeadsCount>{newLeadsCount} new</NewLeadsCount>
                </MailboxContainer>
                
                <UserMenu data-user-menu>
                  <UserAvatar onClick={() => setUserMenuOpen(!userMenuOpen)}>
                    {user?.firstName?.charAt(0) || user?.emailAddresses[0]?.emailAddress?.charAt(0) || 'U'}
                  </UserAvatar>
                  <UserDropdown $isOpen={userMenuOpen}>
                    <UserInfo>
                      <UserName>{user?.firstName || 'User'} {user?.lastName || ''}</UserName>
                      <UserEmail>{user?.emailAddresses[0]?.emailAddress}</UserEmail>
                      <UserRole>Lead Manager</UserRole>
                    </UserInfo>
                    <SignOutBtn>
                      <SignOutButton />
                    </SignOutBtn>
                  </UserDropdown>
                </UserMenu>
              </div>
            </MailboxHeader>

            {/* Add the networking tips section */}
            <NetworkingTips />
            
            {/* Add the email editor section if user answers are available */}
            {userAnswers && <EmailEditor userAnswers={userAnswers} />}
            
            {/* Add the day planner section */}
            {userAnswers && <DayPlanner userAnswers={userAnswers} />}
          </>
        ) : (
          <>
            <MailboxHeader>
              <MailboxTitle>Your Leads</MailboxTitle>
              <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <ViewToggle>
                  <ToggleButton 
                    $active={filter === 'all'} 
                    onClick={() => setFilter('all')}
                  >
                    All Leads ({mockLeads.length})
                  </ToggleButton>
                  <ToggleButton 
                    $active={filter === 'new'} 
                    onClick={() => setFilter('new')}
                  >
                    New ({newLeadsCount})
                  </ToggleButton>
                </ViewToggle>
                
                <UserMenu data-user-menu>
                  <UserAvatar onClick={() => setUserMenuOpen(!userMenuOpen)}>
                    {user?.firstName?.charAt(0) || user?.emailAddresses[0]?.emailAddress?.charAt(0) || 'U'}
                  </UserAvatar>
                  <UserDropdown $isOpen={userMenuOpen}>
                    <UserInfo>
                      <UserName>{user?.firstName || 'User'} {user?.lastName || ''}</UserName>
                      <UserEmail>{user?.emailAddresses[0]?.emailAddress}</UserEmail>
                      <UserRole>Lead Manager</UserRole>
                    </UserInfo>
                    <SignOutBtn>
                      <SignOutButton />
                    </SignOutBtn>
                  </UserDropdown>
                </UserMenu>
              </div>
            </MailboxHeader>

            <LeadsGrid>
              {filteredLeads.map((lead, index) => (
                <LeadCard 
                  key={lead.id}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <LeadHeader>
                    <div>
                      <LeadName>{lead.name}</LeadName>
                      <LeadCompany>{lead.company}</LeadCompany>
                    </div>
                    <LeadStatus $isNew={lead.isNew}>
                      {lead.isNew ? 'New' : 'Seen'}
                    </LeadStatus>
                  </LeadHeader>

                  <ContactInfo>
                    <ContactItem onClick={() => copyToClipboard(lead.email, 'email')}>
                      <ContactIcon>✉️</ContactIcon>
                      <ContactText>{lead.email}</ContactText>
                      <CopyButton>
                        {copiedText === `email:${lead.email}` ? '✓ Copied' : 'Copy'}
                      </CopyButton>
                    </ContactItem>

                    <ContactItem onClick={() => copyToClipboard(lead.linkedin, 'linkedin')}>
                      <ContactIcon>💼</ContactIcon>
                      <ContactText>{lead.linkedin}</ContactText>
                      <CopyButton>
                        {copiedText === `linkedin:${lead.linkedin}` ? '✓ Copied' : 'Copy'}
                      </CopyButton>
                    </ContactItem>
                  </ContactInfo>

                  <LeadDescription>
                    {lead.description}
                  </LeadDescription>
                </LeadCard>
              ))}
            </LeadsGrid>

            {/* Add the networking tips, email editor, and day planner in the leads view too */}
            <NetworkingTips />
            {userAnswers && <EmailEditor userAnswers={userAnswers} />}
            {userAnswers && <DayPlanner userAnswers={userAnswers} />}
          </>
        )}
      </ContentWrapper>
    </Container>
  );
}
