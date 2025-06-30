'use client';

import { useState } from 'react';
import styled, { keyframes } from 'styled-components';

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

const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

// Styled Components
const Container = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  padding: 2rem;
  margin-top: 2rem;
  animation: ${fadeInUp} 0.8s ease-out;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #667eea, #764ba2, #f093fb, #f5576c, #4facfe, #00f2fe);
    background-size: 300% 100%;
    animation: ${shimmer} 3s ease infinite;
    border-radius: 20px 20px 0 0;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
  font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
`;

const GenerateButton = styled.button`
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
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
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(16, 185, 129, 0.4);
    
    &::before {
      left: 100%;
    }
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const EditorContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
`;

const SectionTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const TextEditor = styled.textarea`
  width: 100%;
  min-height: 300px;
  padding: 1rem;
  border: 2px solid rgba(100, 116, 139, 0.2);
  border-radius: 12px;
  font-size: 0.95rem;
  font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
  line-height: 1.6;
  resize: vertical;
  transition: all 0.3s ease;
  background: rgba(248, 250, 252, 0.5);
  
  &:focus {
    outline: none;
    border-color: #667eea;
    background: white;
    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
  }
`;

const PreviewContainer = styled.div`
  background: white;
  border: 2px solid rgba(100, 116, 139, 0.2);
  border-radius: 12px;
  padding: 1.5rem;
  min-height: 300px;
  position: relative;
  
  &::before {
    content: 'Email Preview';
    position: absolute;
    top: -12px;
    left: 12px;
    background: white;
    color: #64748b;
    font-size: 0.8rem;
    font-weight: 600;
    padding: 0 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`;

const PreviewContent = styled.div`
  white-space: pre-wrap;
  line-height: 1.6;
  font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
  color: #374151;
`;

const LoadingState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  color: #64748b;
  gap: 1rem;
  
  .spinner {
    width: 40px;
    height: 40px;
    border: 3px solid rgba(102, 126, 234, 0.2);
    border-top: 3px solid #667eea;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
  background: ${props => {
    switch(props.$variant) {
      case 'copy': return 'linear-gradient(135deg, #3b82f6, #2563eb)';
      case 'regenerate': return 'linear-gradient(135deg, #f59e0b, #d97706)';
      default: return 'rgba(100, 116, 139, 0.1)';
    }
  }};
  color: ${props => props.$variant ? 'white' : '#64748b'};
  border: none;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const CopyNotification = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
  z-index: 1000;
  animation: ${fadeInUp} 0.3s ease-out;
  font-weight: 600;
`;

export default function EmailEditor({ userAnswers }) {
  const [emailContent, setEmailContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copyNotification, setCopyNotification] = useState(false);

  const generateEmail = async () => {
    setIsGenerating(true);
    
    try {
      const response = await fetch('/api/generate-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          business: userAnswers.business,
          products: userAnswers.products,
          customer: userAnswers.customer,
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setEmailContent(data.email);
      } else {
        // Fallback email template if API fails
        const fallbackEmail = generateFallbackEmail(userAnswers);
        setEmailContent(fallbackEmail);
      }
    } catch (error) {
      console.error('Error generating email:', error);
      // Fallback email template
      const fallbackEmail = generateFallbackEmail(userAnswers);
      setEmailContent(fallbackEmail);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateFallbackEmail = (answers) => {
    return `Subject: Exciting Opportunity in ${answers.business}

Hi [Prospect Name],

I hope this email finds you well. I came across your profile and was impressed by your background and interests.

I wanted to reach out because I'm working with a company that specializes in ${answers.business}. We're currently looking for motivated individuals who are interested in ${answers.products}.

Based on what I know about ${answers.customer}, I believe this could be a great fit for someone with your profile. This opportunity offers:

• Flexible schedule that works around your current commitments
• Comprehensive training and ongoing support
• Potential for significant income growth
• Community of like-minded entrepreneurs

Would you be open to a brief 15-minute conversation to learn more? I'd love to share some specific details about how this could benefit someone with your background.

Looking forward to connecting!

Best regards,
[Your Name]

P.S. I'm only sharing this with a select few people who I think would be a great fit. If you're not interested, no worries at all!`;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(emailContent);
      setCopyNotification(true);
      setTimeout(() => setCopyNotification(false), 3000);
    } catch (err) {
      console.error('Failed to copy email: ', err);
    }
  };

  return (
    <Container>
      <Header>
        <Title>📧 AI Email Generator</Title>
        <GenerateButton 
          onClick={generateEmail} 
          disabled={isGenerating}
        >
          {isGenerating ? 'Generating...' : '✨ Generate Email'}
        </GenerateButton>
      </Header>

      <EditorContainer>
        <Section>
          <SectionTitle>
            ✏️ Edit Your Email
          </SectionTitle>
          {isGenerating ? (
            <LoadingState>
              <div className="spinner"></div>
              <div>Crafting your personalized email...</div>
            </LoadingState>
          ) : (
            <TextEditor
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
              placeholder="Click 'Generate Email' to create a personalized outreach email based on your business details..."
            />
          )}
        </Section>

        <Section>
          <SectionTitle>
            👀 Preview
          </SectionTitle>
          <PreviewContainer>
            <PreviewContent>
              {emailContent || 'Your email preview will appear here...'}
            </PreviewContent>
          </PreviewContainer>
        </Section>
      </EditorContainer>

      {emailContent && (
        <ButtonContainer>
          <ActionButton $variant="copy" onClick={copyToClipboard}>
            📋 Copy Email
          </ActionButton>
          <ActionButton $variant="regenerate" onClick={generateEmail}>
            🔄 Regenerate
          </ActionButton>
        </ButtonContainer>
      )}

      {copyNotification && (
        <CopyNotification>
          ✅ Email copied to clipboard!
        </CopyNotification>
      )}
    </Container>
  );
} 