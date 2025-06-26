'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: none; }
`;
const pop = keyframes`
  0% { transform: scale(1); }
  60% { transform: scale(1.12); }
  100% { transform: scale(1); }
`;
const Card = styled.div`
  max-width: 440px;
  margin: 3.5rem auto 2rem auto;
  background: #fff;
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px 0 rgba(0,0,0,0.10);
  border: 1.5px solid #e0e7ef;
  animation: ${fadeIn} 0.7s;
  display: flex;
  flex-direction: column;
  @media (max-width: 600px) {
    margin: 1.2rem 0.2rem;
    border-radius: 1rem;
    max-width: 98vw;
  }
`;
const Header = styled.div`
  background: linear-gradient(90deg, #2563eb 60%, #a1c4fd 100%);
  border-radius: 1.5rem 1.5rem 0 0;
  padding: 2rem 2rem 1.2rem 2rem;
  text-align: center;
  color: #fff;
  font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -1px;
  @media (max-width: 600px) {
    padding: 1rem 0.5rem 0.8rem 0.5rem;
    font-size: 1.15rem;
    border-radius: 1rem 1rem 0 0;
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  padding: 2rem 2rem 1.5rem 2rem;
  @media (max-width: 600px) {
    padding: 1rem 0.5rem 0.8rem 0.5rem;
    gap: 0.8rem;
  }
`;
const Label = styled.label`
  font-weight: 300;
  background: rgb(255, 255, 255);
  color: #334155;
  font-size: 0.9rem;
  position: relative;
  top: 20px;
  left: 10px;
  width: fit-content;
  padding: 1px 15px;
  // border: 1px solid rgb(172, 172, 172);
  border-radius: 10px;
  

  @media (max-width: 600px) {
    font-size: 0.98rem;
  }
  @media (max-width: 425px) {
    font-size: 0.8rem;
  }
`;
const Input = styled.input`
  padding: 0.7rem 1.1rem;
  border: 1.5px solid #cbd5e1;
  border-radius: 1rem;
  font-size: 1.05rem;
  background: #f8fafc;
  transition: border 0.2s, box-shadow 0.2s;
  font-family: inherit;
  @media (max-width: 600px) {
    padding: 0.55rem 0.7rem;
    font-size: 0.97rem;
  }
  &:focus {
    border-color: #2563eb;
    outline: none;
    box-shadow: 0 0 0 2px #2563eb33;
  }
`;
const Textarea = styled.textarea`
  padding: 0.7rem 1.1rem;
  border: 1.5px solid #cbd5e1;
  border-radius: 1rem;
  font-size: 1.05rem;
  background: #f8fafc;
  transition: border 0.2s, box-shadow 0.2s;
  font-family: inherit;
  @media (max-width: 600px) {
    padding: 0.55rem 0.7rem;
    font-size: 0.97rem;
  }
  &:focus {
    border-color: #2563eb;
    outline: none;
    box-shadow: 0 0 0 2px #2563eb33;
  }
`;
const TagInput = styled(Input)`
  margin-bottom: 0.5rem;
`;
const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;
const Tag = styled.span`
  background: #2563eb;
  color: #fff;
  padding: 0.25rem 0.85rem;
  border-radius: 999px;
  font-size: 0.98rem;
  font-weight: 500;
  box-shadow: 0 2px 8px #2563eb22;
  cursor: pointer;
  animation: ${pop} 0.4s;
  transition: background 0.2s, box-shadow 0.2s;
  @media (max-width: 600px) {
    font-size: 0.93rem;
    padding: 0.18rem 0.6rem;
  }
  &:hover {
    background: #1d4ed8;
    box-shadow: 0 4px 16px #2563eb33;
  }
`;
const Button = styled.button`
  background: #2563eb;
  color: #fff;
  border: none;
  padding: 0.85rem 1.7rem;
  border-radius: 1.2rem;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s, transform 0.15s;
  box-shadow: 0 2px 8px #2563eb22;
  font-family: inherit;
  @media (max-width: 600px) {
    padding: 0.6rem 1.1rem;
    font-size: 0.97rem;
  }
  &:hover {
    background: #1e40af;
    box-shadow: 0 4px 16px #2563eb33;
    transform: translateY(-2px) scale(1.04);
  }
`;
const Success = styled.div`
  color: #16a34a;
  font-weight: 700;
  text-align: center;
  font-size: 1.1rem;
  margin-top: 0.5rem;
  @media (max-width: 600px) {
    font-size: 0.97rem;
  }
`;
const ErrorMsg = styled.div`
  color: #dc2626;
  font-weight: 700;
  text-align: center;
  font-size: 1.1rem;
  margin-top: 0.5rem;
  @media (max-width: 600px) {
    font-size: 0.97rem;
  }
`;

export default function Setup() {
  const { user, isLoaded } = useUser();
  const [product, setProduct] = useState('');
  const [description, setDescription] = useState('');
  const [company, setCompany] = useState('');
  const [keywordInput, setKeywordInput] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleKeywordKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const value = keywordInput.trim();
      if (value && !keywords.includes(value)) {
        setKeywords([...keywords, value]);
      }
      setKeywordInput('');
    }
  };

  const removeKeyword = (tag) => {
    setKeywords(keywords.filter(k => k !== tag));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    if (!isLoaded || !user) {
      setError('User not loaded.');
      setLoading(false);
      return;
    }
    try {
      // Save to Clerk user metadata
      await user.update({
        publicMetadata: {
          product,
          description,
          company,
          keywords,
        },
      });
      // Send to n8n webhook
      await fetch('https://your-n8n-instance.com/webhook/start-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          product,
          description,
          company,
          keywords,
        }),
      });
      setSuccess('Onboarding complete!');
    } catch (err) {
      setError('Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <Header>Onboarding</Header>
      <Form onSubmit={handleSubmit}>
        <Label>Product Name</Label>
        <Input placeholder='Product Name' value={product} onChange={e => setProduct(e.target.value)} required />
        <Label>Description</Label>
        <Textarea placeholder='Description' value={description} onChange={e => setDescription(e.target.value)} rows={3} required />
        <Label>Company Name</Label>
        <Input value={company} placeholder='Company' onChange={e => setCompany(e.target.value)} required />
        <Label>Keywords (press Enter or comma to add)</Label>
        <TagInput
          value={keywordInput}
          onChange={e => setKeywordInput(e.target.value)}
          onKeyDown={handleKeywordKeyDown}
          placeholder="keyword"
        />
        <TagList>
          {keywords.map(tag => (
            <Tag key={tag} onClick={() => removeKeyword(tag)}>{tag} ×</Tag>
          ))}
        </TagList>
        <Button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</Button>
        {success && <Success>{success}</Success>}
        {error && <ErrorMsg>{error}</ErrorMsg>}
      </Form>
    </Card>
  );
} 