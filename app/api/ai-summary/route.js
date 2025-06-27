export async function POST(request) {
    try {
        const { leadData } = await request.json();

        // Check if OpenAI API key is configured
        const openaiApiKey = process.env.OPENAI_API_KEY;
        if (!openaiApiKey) {
            return new Response(JSON.stringify({
                error: 'OpenAI API key not configured. Please add OPENAI_API_KEY to your environment variables.'
            }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Prepare the prompt for OpenAI
        const prompt = `Please provide a concise, professional summary of this lead information:

            Product: ${leadData.product || 'N/A'}
            Company: ${leadData.company || 'N/A'}
            Description: ${leadData.description || 'N/A'}
            Keywords: ${leadData.keywords || 'N/A'}

            Please provide a 2-3 sentence summary that highlights:
            1. The main product/service interest
            2. Company type/industry context
            3. Key business opportunity or need

            Keep it professional and actionable for sales teams.`;

        // Call OpenAI API
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${openaiApiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a professional sales assistant that creates concise, actionable summaries of lead information.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: 150,
                temperature: 0.7,
            }),
        });

        if (!response.ok) {
            throw new Error(`OpenAI API error: ${response.status}`);
        }

        const data = await response.json();
        const summary = data.choices[0]?.message?.content?.trim();

        if (!summary) {
            throw new Error('No summary generated from OpenAI');
        }

        console.log('✅ AI Summary generated:', summary);

        return new Response(JSON.stringify({
            success: true,
            summary
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error('❌ AI Summary error:', error);
        return new Response(JSON.stringify({
            success: false,
            error: error.message || 'Failed to generate AI summary'
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
} 