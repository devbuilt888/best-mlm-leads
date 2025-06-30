'use client';

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

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
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
  position: relative;
  overflow: hidden;
  
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
    border-radius: 20px 20px 0 0;
  }
`;

const Header = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 0.5rem 0;
  font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
`;

const Subtitle = styled.p`
  color: #64748b;
  margin: 0;
  font-style: italic;
`;

const TipsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const TipCard = styled.div`
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(139, 92, 246, 0.05));
  border: 1px solid rgba(102, 126, 234, 0.15);
  border-radius: 16px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(102, 126, 234, 0.15);
    border-color: rgba(102, 126, 234, 0.3);
  }
`;

const TipNumber = styled.div`
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const TipTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 0.75rem 0;
  line-height: 1.3;
`;

const TipDescription = styled.p`
  color: #4b5563;
  line-height: 1.6;
  margin: 0;
  font-size: 0.95rem;
`;

const BookReference = styled.div`
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.1));
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: 12px;
  padding: 1rem;
  margin-top: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const BookIcon = styled.div`
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  flex-shrink: 0;
`;

const BookText = styled.div`
  h4 {
    font-size: 0.95rem;
    font-weight: 600;
    color: #1e293b;
    margin: 0 0 0.25rem 0;
  }
  
  p {
    font-size: 0.85rem;
    color: #64748b;
    margin: 0;
  }
`;

const tips = [
  {
    title: "Build Relationships, Not Just Recruits",
    description: "Focus on genuine connections with your prospects. People join people they like and trust. Take time to understand their goals, challenges, and aspirations before presenting any opportunity."
  },
  {
    title: "Listen More Than You Talk",
    description: "The key to successful recruiting is asking good questions and listening to the answers. Understand what motivates your prospects and tailor your approach to their specific needs and desires."
  },
  {
    title: "Share Stories, Not Just Facts",
    description: "People relate to stories more than statistics. Share your journey, challenges you've overcome, and successes you've achieved. Stories create emotional connections that facts alone cannot."
  },
  {
    title: "Focus on Value First",
    description: "Always lead with value. Whether it's helpful information, valuable connections, or genuine support, provide value before asking for anything in return. This builds trust and credibility."
  },
  {
    title: "Be Authentic and Genuine",
    description: "Authenticity attracts the right people. Don't try to be someone you're not or oversell the opportunity. Be honest about both the potential and the work required for success."
  },
  {
    title: "Follow Up Consistently",
    description: "Most people need multiple touchpoints before making a decision. Create a systematic follow-up process that adds value with each interaction. Persistence with purpose is key."
  },
  {
    title: "Quality Over Quantity",
    description: "It's better to have meaningful conversations with fewer, qualified prospects than to blast generic messages to hundreds. Focus on quality interactions that build real relationships."
  },
  {
    title: "Address Concerns Honestly",
    description: "Don't avoid objections or concerns. Address them head-on with honesty and empathy. Acknowledge legitimate concerns and provide thoughtful responses that show you understand their perspective."
  }
];

export default function NetworkingTips() {
  return (
    <Container>
      <Header>
        <Title>🎯 Network Marketing Success Tips</Title>
        <Subtitle>Proven strategies for effective prospect outreach and relationship building</Subtitle>
      </Header>

      <TipsGrid>
        {tips.map((tip, index) => (
          <TipCard key={index}>
            <TipNumber>{index + 1}</TipNumber>
            <TipTitle>{tip.title}</TipTitle>
            <TipDescription>{tip.description}</TipDescription>
          </TipCard>
        ))}
      </TipsGrid>

      <BookReference>
        <BookIcon>📚</BookIcon>
        <BookText>
          <h4>Inspired by "Your First 90 Days in Network Marketing"</h4>
          <p>These tips are based on proven principles from Michael J. Durkin's comprehensive guide to network marketing success.</p>
        </BookText>
      </BookReference>
    </Container>
  );
} 