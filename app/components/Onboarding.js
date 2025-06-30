'use client';

import { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

// Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(120deg, rgb(7, 55, 131), rgb(25, 60, 77), rgb(82, 5, 60), rgb(31, 8, 0), rgb(1, 16, 41));
  background-size: 300% 300%;
  animation: ${gradientShift} 15s ease infinite;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  
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
`;

const FormCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 24px;
  padding: 3rem;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 2;
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
    animation: ${gradientShift} 3s ease infinite;
    border-radius: 24px 24px 0 0;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 900;
  background: linear-gradient(135deg, #1e293b, #475569, #64748b);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0 0 0.5rem 0;
  font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
  letter-spacing: -0.02em;
`;

const Subtitle = styled.p`
  color: #64748b;
  font-size: 1.1rem;
  margin: 0;
  font-weight: 500;
`;

const ProgressContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
  gap: 0.5rem;
`;

const ProgressDot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.$active ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'rgba(100, 116, 139, 0.3)'};
  transition: all 0.3s ease;
  transform: ${props => props.$active ? 'scale(1.2)' : 'scale(1)'};
  box-shadow: ${props => props.$active ? '0 4px 12px rgba(102, 126, 234, 0.4)' : 'none'};
`;

const QuestionContainer = styled.div`
  animation: ${slideInRight} 0.6s ease-out;
  margin-bottom: 2rem;
`;

const QuestionNumber = styled.div`
  color: #667eea;
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 0.5rem;
`;

const QuestionText = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 1.5rem 0;
  line-height: 1.4;
  font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 1rem;
  border: 2px solid rgba(100, 116, 139, 0.2);
  border-radius: 16px;
  font-size: 1rem;
  font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
  resize: vertical;
  transition: all 0.3s ease;
  background: rgba(248, 250, 252, 0.8);
  
  &:focus {
    outline: none;
    border-color: #667eea;
    background: white;
    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
  }
  
  &::placeholder {
    color: #94a3b8;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
`;

const Button = styled.button`
  background: ${props => props.$variant === 'secondary' ? 
    'rgba(100, 116, 139, 0.1)' : 
    'linear-gradient(135deg, #667eea, #764ba2)'
  };
  color: ${props => props.$variant === 'secondary' ? '#64748b' : 'white'};
  border: none;
  border-radius: 12px;
  padding: 0.75rem 2rem;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.$variant === 'secondary' ? 
      '0 4px 12px rgba(100, 116, 139, 0.2)' : 
      '0 8px 20px rgba(102, 126, 234, 0.4)'
    };
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const KeyHint = styled.div`
  color: #94a3b8;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  kbd {
    background: rgba(100, 116, 139, 0.1);
    padding: 0.25rem 0.5rem;
    border-radius: 6px;
    font-size: 0.8rem;
    border: 1px solid rgba(100, 116, 139, 0.2);
  }
`;

const CompletionAnimation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  animation: ${fadeInUp} 0.8s ease-out;
  
  .checkmark {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(135deg, #10b981, #059669);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    color: white;
    animation: ${fadeInUp} 0.6s ease-out 0.2s both;
  }
  
  h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1e293b;
    margin: 0;
  }
  
  p {
    color: #64748b;
    text-align: center;
    margin: 0;
  }
`;

const questions = [
  {
    id: 'business',
    question: "Describe what your business does",
    placeholder: "Tell us about your business, what industry you're in, and what services or solutions you provide..."
  },
  {
    id: 'products',
    question: "Describe what products you are trying to sell",
    placeholder: "What specific products or services are you looking to promote? Include any key features or benefits..."
  },
  {
    id: 'customer',
    question: "Describe your ideal customer",
    placeholder: "Who is your target audience? Include demographics, interests, pain points, and what motivates them..."
  }
];

export default function Onboarding({ onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [isCompleting, setIsCompleting] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    // Focus on textarea when question changes
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [currentQuestion]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleNext();
    }
  };

  const handleNext = () => {
    if (!currentAnswer.trim()) return;

    const newAnswers = {
      ...answers,
      [questions[currentQuestion].id]: currentAnswer.trim()
    };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setCurrentAnswer('');
    } else {
      // Save to localStorage and complete
      setIsCompleting(true);
      localStorage.setItem('onboarding_answers', JSON.stringify(newAnswers));
      
      setTimeout(() => {
        onComplete(newAnswers);
      }, 2000);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      const prevAnswer = answers[questions[currentQuestion - 1].id] || '';
      setCurrentAnswer(prevAnswer);
    }
  };

  if (isCompleting) {
    return (
      <Container>
        <FormCard>
          <CompletionAnimation>
            <div className="checkmark">✓</div>
            <h3>Setup Complete!</h3>
            <p>We're preparing your personalized dashboard with AI-powered insights...</p>
          </CompletionAnimation>
        </FormCard>
      </Container>
    );
  }

  return (
    <Container>
      <FormCard>
        <Header>
          <Title>Welcome to Your Lead Dashboard</Title>
          <Subtitle>Let's personalize your experience with a few quick questions</Subtitle>
        </Header>

        <ProgressContainer>
          {questions.map((_, index) => (
            <ProgressDot 
              key={index} 
              $active={index <= currentQuestion} 
            />
          ))}
        </ProgressContainer>

        <QuestionContainer key={currentQuestion}>
          <QuestionNumber>
            Question {currentQuestion + 1} of {questions.length}
          </QuestionNumber>
          <QuestionText>
            {questions[currentQuestion].question}
          </QuestionText>
          <TextArea
            ref={textareaRef}
            value={currentAnswer}
            onChange={(e) => setCurrentAnswer(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={questions[currentQuestion].placeholder}
          />
        </QuestionContainer>

        <ButtonContainer>
          <div>
            {currentQuestion > 0 && (
              <Button $variant="secondary" onClick={handleBack}>
                Back
              </Button>
            )}
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <KeyHint>
              <kbd>Ctrl</kbd> + <kbd>Enter</kbd> to continue
            </KeyHint>
            <Button 
              onClick={handleNext}
              disabled={!currentAnswer.trim()}
            >
              {currentQuestion < questions.length - 1 ? 'Next' : 'Complete Setup'}
            </Button>
          </div>
        </ButtonContainer>
      </FormCard>
    </Container>
  );
} 