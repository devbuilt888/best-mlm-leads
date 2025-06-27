# Lead Management Dashboard

A modern lead management dashboard built with Next.js, Clerk authentication, and AI-powered summaries.

## Features

- 🔐 **Authentication** - Secure sign-in/sign-up with Clerk
- 📝 **Lead Collection** - Onboarding form to collect product and company information
- 🤖 **AI Summaries** - OpenAI-powered lead summaries for better insights
- 📊 **Dashboard** - Comprehensive lead management with filtering and search
- 💾 **Data Export** - CSV export functionality
- ⭐ **Favorites** - Mark and manage favorite leads
- 📱 **Responsive Design** - Modern UI that works on all devices

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# OpenAI API Key for AI Summaries
# Get your API key from: https://platform.openai.com/api-keys
OPENAI_API_KEY=your_openai_api_key_here

# Clerk Environment Variables (if not already set)
# NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
# CLERK_SECRET_KEY=your_clerk_secret_key
```

## AI Summaries Setup

1. **Get OpenAI API Key**: 
   - Visit [OpenAI Platform](https://platform.openai.com/api-keys)
   - Create a new API key
   - Add it to your `.env.local` file

2. **Usage**:
   - Go to the Dashboard
   - Click "🤖 Generate AI Summary" for any lead
   - AI will analyze the lead data and provide a professional summary

## n8n Integration

To connect with n8n for lead processing:

1. Update the webhook URL in `app/setup/page.js`:
   ```javascript
   'https://your-actual-n8n-domain.com/webhook/start-agent'
   ```

2. Configure your n8n workflow to:
   - Receive webhook data
   - Process leads based on keywords
   - Send processed leads back to your API

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
