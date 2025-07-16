# n8n Integration Setup

This document explains how to set up the n8n integration for sending onboarding data to your n8n workflows.

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Clerk Configuration
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here

# n8n Webhook URL (single URL for all operations)
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://bbglobalsolutions.app.n8n.cloud/webhook-test/mlm-leads
```

## n8n Service Functions

The `app/services/n8nService.js` file provides the following functions that all use the same n8n webhook URL:

### 1. `sendOnboardingToN8n(onboardingData, userId)`

Sends onboarding data to your n8n workflow.

**Parameters:**
- `onboardingData`: Object containing user answers (business, products, customer)
- `userId`: User ID from Clerk

**Returns:**
- Success: `{ success: true, data: response.data, message: 'Onboarding data sent successfully' }`
- Error: `{ success: false, error: 'error message', message: 'error description' }`

### 2. `requestLeadGeneration(userData, userId)`

Sends a lead generation request to n8n.

**Parameters:**
- `userData`: Complete user data including onboarding answers
- `userId`: User ID from Clerk

### 3. `testN8nConnection(webhookUrl)`

Tests the connection to an n8n webhook.

## Data Format Sent to n8n

### Onboarding Data Payload:
```json
{
  "userId": "user_123",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "onboardingData": {
    "business": "User's business description",
    "products": "User's products description", 
    "customer": "User's ideal customer description"
  },
  "source": "lead-dashboard-onboarding",
  "version": "1.0.0"
}
```

### Lead Generation Payload:
```json
{
  "userId": "user_123",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "userData": {
    "business": "User's business description",
    "products": "User's products description",
    "customer": "User's ideal customer description"
  },
  "requestType": "lead-generation",
  "source": "lead-dashboard",
  "version": "1.0.0"
}
```

## Error Handling

The service includes comprehensive error handling:

- **Network errors**: Connection timeouts, DNS failures
- **Server errors**: HTTP error responses from n8n
- **Other errors**: Malformed requests, parsing errors

All errors are logged to the console and the onboarding process continues even if n8n communication fails.

## Usage in Components

The Onboarding component automatically sends data to n8n when the user completes the onboarding process:

```javascript
import { sendOnboardingToN8n } from '../services/n8nService';

// In your component
const result = await sendOnboardingToN8n(onboardingAnswers, user.id);
if (result.success) {
  console.log('Data sent successfully');
} else {
  console.warn('Failed to send data:', result.message);
}
```

## n8n Workflow Setup

1. Create a webhook trigger in your n8n workflow
2. Configure the webhook URL to match your environment variable
3. Process the incoming data in your n8n workflow
4. Return a response to confirm receipt

## Testing

You can test the n8n connection using:

```javascript
import { testN8nConnection } from '../services/n8nService';

const result = await testN8nConnection('https://your-n8n-webhook-url');
console.log(result.success ? 'Connection successful' : 'Connection failed');
``` 