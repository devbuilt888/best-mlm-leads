import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { business, products, customer } = await request.json();

    // Check if OpenAI API key is available
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        success: false,
        error: 'OpenAI API key not configured'
      }, { status: 500 });
    }

    const prompt = `
You are an expert network marketing email copywriter. Based on the following information, write a professional and persuasive outreach email for network marketing recruitment.

Business Description: ${business}
Products/Services: ${products}
Target Customer Profile: ${customer}

Please write an email that:
1. Is personalized and professional
2. Builds rapport without being pushy
3. Focuses on benefits and opportunity
4. Includes a clear but soft call-to-action
5. Follows principles from "Your First 90 Days in Network Marketing" by Michael J. Durkin
6. Is around 200-300 words
7. Has a compelling subject line

Format the response as:
Subject: [subject line]

[email body]

Make it conversational, authentic, and focused on value rather than selling.
`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are an expert network marketing email copywriter who writes professional, authentic, and effective recruitment emails.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const emailContent = data.choices[0]?.message?.content || '';

    return NextResponse.json({
      success: true,
      email: emailContent
    });

  } catch (error) {
    console.error('Error generating email:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to generate email'
    }, { status: 500 });
  }
} 