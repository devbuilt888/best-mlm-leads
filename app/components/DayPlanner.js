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
  background: linear-gradient(135deg, #f59e0b, #d97706);
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
    box-shadow: 0 8px 20px rgba(245, 158, 11, 0.4);
    
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

const PlanContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
`;

const TimeSlot = styled.div`
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(139, 92, 246, 0.05));
  border: 1px solid rgba(102, 126, 234, 0.15);
  border-radius: 16px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  position: relative;
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 1.5rem;
  align-items: center;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(102, 126, 234, 0.1);
    border-color: rgba(102, 126, 234, 0.3);
  }
`;

const TimeLabel = styled.div`
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  font-weight: 700;
  text-align: center;
  font-size: 0.9rem;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
`;

const ActivityContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ActivityTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ActivityDescription = styled.p`
  color: #4b5563;
  margin: 0;
  line-height: 1.5;
  font-size: 0.95rem;
`;

const ActivityTags = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
`;

const Tag = styled.span`
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  border: 1px solid rgba(102, 126, 234, 0.2);
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
    border: 3px solid rgba(245, 158, 11, 0.2);
    border-top: 3px solid #f59e0b;
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

// Default day plan template
const generateDayPlan = (userAnswers) => {
  const businessType = userAnswers?.business || "your business";
  const products = userAnswers?.products || "your products";
  const targetCustomer = userAnswers?.customer || "your ideal customers";

  return [
    {
      time: "9:00 AM",
      title: "🌅 Morning Preparation & Planning",
      description: `Start your day by reviewing your goals and preparing your mindset. Review your prospect list and plan your outreach strategy for ${businessType}.`,
      tags: ["Planning", "Mindset", "Goal Setting"]
    },
    {
      time: "9:30 AM",
      title: "📱 Social Media Engagement",
      description: `Engage authentically on social media platforms. Like, comment, and share valuable content related to ${products}. Build relationships before pitching.`,
      tags: ["Social Media", "Engagement", "Relationship Building"]
    },
    {
      time: "10:30 AM",
      title: "📧 Prospect Outreach (Batch 1)",
      description: `Send personalized messages to 5-10 prospects who fit your ${targetCustomer} profile. Use the AI-generated emails as templates but personalize each one.`,
      tags: ["Outreach", "Prospecting", "Email Marketing"]
    },
    {
      time: "11:30 AM",
      title: "📚 Skill Development & Training",
      description: `Dedicate time to learning. Read network marketing materials, watch training videos, or practice your presentation skills for ${businessType}.`,
      tags: ["Training", "Skill Building", "Personal Development"]
    },
    {
      time: "12:30 PM",
      title: "🍽️ Lunch Break & Networking",
      description: "Take a proper lunch break. If possible, have lunch with a potential prospect or team member. Casual conversations often lead to business opportunities.",
      tags: ["Break", "Networking", "Relationship Building"]
    },
    {
      time: "2:00 PM",
      title: "📞 Follow-up Calls & Conversations",
      description: `Make follow-up calls to prospects who showed interest. Focus on building relationships and understanding their needs related to ${products}.`,
      tags: ["Follow-up", "Phone Calls", "Relationship Building"]
    },
    {
      time: "3:30 PM",
      title: "📊 Lead Research & Qualification",
      description: `Research new prospects who match your ${targetCustomer} criteria. Use LinkedIn, social media, and referrals to build your prospect list.`,
      tags: ["Research", "Lead Generation", "Qualification"]
    },
    {
      time: "4:30 PM",
      title: "📧 Prospect Outreach (Batch 2)",
      description: `Send another batch of personalized outreach messages. Focus on value-driven content that addresses the pain points of ${targetCustomer}.`,
      tags: ["Outreach", "Value Creation", "Prospecting"]
    },
    {
      time: "5:30 PM",
      title: "🤝 Team Building & Support",
      description: `Connect with your team members. Provide support, share successes, and collaborate on strategies for promoting ${businessType}.`,
      tags: ["Team Building", "Support", "Collaboration"]
    },
    {
      time: "6:30 PM",
      title: "📱 Content Creation & Sharing",
      description: `Create and share valuable content about ${products}. This could be testimonials, educational posts, or behind-the-scenes content about your journey.`,
      tags: ["Content Creation", "Value Sharing", "Brand Building"]
    },
    {
      time: "7:30 PM",
      title: "📈 Daily Review & Planning",
      description: "Review your day's activities, track your progress, and plan tomorrow's priorities. Celebrate small wins and identify areas for improvement.",
      tags: ["Review", "Planning", "Progress Tracking"]
    },
    {
      time: "8:30 PM",
      title: "🎯 Personal Development Time",
      description: "End your business day with personal development. Read success stories, listen to motivational content, or practice gratitude for your network marketing journey.",
      tags: ["Personal Development", "Motivation", "Gratitude"]
    }
  ];
};

export default function DayPlanner({ userAnswers }) {
  const [dayPlan, setDayPlan] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copyNotification, setCopyNotification] = useState(false);

  const generatePlan = () => {
    setIsGenerating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const plan = generateDayPlan(userAnswers);
      setDayPlan(plan);
      setIsGenerating(false);
    }, 1500);
  };

  const copyPlanToClipboard = async () => {
    const planText = dayPlan.map(slot => 
      `${slot.time} - ${slot.title}\n${slot.description}\nTags: ${slot.tags.join(', ')}\n`
    ).join('\n');

    try {
      await navigator.clipboard.writeText(planText);
      setCopyNotification(true);
      setTimeout(() => setCopyNotification(false), 3000);
    } catch (err) {
      console.error('Failed to copy plan: ', err);
    }
  };

  return (
    <Container>
      <Header>
        <Title>📅 Daily Action Plan (9 AM - 9 PM)</Title>
        <GenerateButton 
          onClick={generatePlan} 
          disabled={isGenerating}
        >
          {isGenerating ? 'Generating...' : '⚡ Generate Day Plan'}
        </GenerateButton>
      </Header>

      {isGenerating ? (
        <LoadingState>
          <div className="spinner"></div>
          <div>Creating your personalized daily action plan...</div>
        </LoadingState>
      ) : dayPlan.length > 0 ? (
        <>
          <PlanContainer>
            {dayPlan.map((slot, index) => (
              <TimeSlot key={index}>
                <TimeLabel>{slot.time}</TimeLabel>
                <ActivityContent>
                  <ActivityTitle>{slot.title}</ActivityTitle>
                  <ActivityDescription>{slot.description}</ActivityDescription>
                  <ActivityTags>
                    {slot.tags.map((tag, tagIndex) => (
                      <Tag key={tagIndex}>{tag}</Tag>
                    ))}
                  </ActivityTags>
                </ActivityContent>
              </TimeSlot>
            ))}
          </PlanContainer>

          <ButtonContainer>
            <ActionButton $variant="copy" onClick={copyPlanToClipboard}>
              📋 Copy Day Plan
            </ActionButton>
            <ActionButton $variant="regenerate" onClick={generatePlan}>
              🔄 Regenerate Plan
            </ActionButton>
          </ButtonContainer>
        </>
      ) : (
        <div style={{ 
          textAlign: 'center', 
          color: '#64748b', 
          padding: '3rem',
          background: 'rgba(248, 250, 252, 0.5)',
          borderRadius: '12px',
          border: '2px dashed rgba(100, 116, 139, 0.2)'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📅</div>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#374151' }}>Ready to Plan Your Success?</h3>
          <p style={{ margin: 0 }}>Click "Generate Day Plan" to create a personalized 12-hour action plan for network marketing success!</p>
        </div>
      )}

      {copyNotification && (
        <CopyNotification>
          ✅ Day plan copied to clipboard!
        </CopyNotification>
      )}
    </Container>
  );
} 