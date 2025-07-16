import axios from 'axios';

// Configure axios defaults
const api = axios.create({
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Send onboarding data to n8n workflow
 * @param {Object} onboardingData - The onboarding answers from the user
 * @param {string} userId - The user's ID from Clerk
 * @returns {Promise<Object>} - Response from n8n
 */
export const sendOnboardingToN8n = async (onboardingData, userId) => {
  try {
    const payload = {
      userId: userId,
      timestamp: new Date().toISOString(),
      onboardingData: {
        business: onboardingData.business,
        products: onboardingData.products,
        customer: onboardingData.customer,
      },
      source: 'lead-dashboard-onboarding',
      version: '1.0.0'
    };

    // Use the single n8n webhook URL
    const n8nWebhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || 'https://bbglobalsolutions.app.n8n.cloud/webhook-test/mlm-leads';
    
    console.log("Webhook URL:", n8nWebhookUrl);

    const response = await api.post(n8nWebhookUrl, payload);

    console.log('Onboarding data sent to n8n successfully (n8nservices):', response.data);
    return {
      success: true,
      data: response.data,
      message: 'Onboarding data sent successfully'
    };

  } catch (error) {
    console.error('Error sending onboarding data to n8n:', error);
    
    // Handle different types of errors
    if (error.response) {
      // Server responded with error status
      return {
        success: false,
        error: `Server error: ${error.response.status}`,
        message: error.response.data?.message || 'Failed to send data to n8n'
      };
    } else if (error.request) {
      // Network error
      return {
        success: false,
        error: 'Network error',
        message: 'Unable to connect to n8n workflow'
      };
    } else {
      // Other error
      return {
        success: false,
        error: error.message,
        message: 'Failed to send onboarding data'
      };
    }
  }
};

/**
 * Send lead generation request to n8n
 * @param {Object} userData - User data including onboarding answers
 * @param {string} userId - The user's ID from Clerk
 * @returns {Promise<Object>} - Response from n8n
 */
export const requestLeadGeneration = async (userData, userId) => {
  try {
    const payload = {
      userId: userId,
      timestamp: new Date().toISOString(),
      ...userData,
      requestType: 'lead-generation',
      source: 'lead-dashboard',
      version: '1.0.0'
    };

    // Use the single n8n webhook URL for lead generation too
    const n8nLeadWebhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || 'https://bbglobalsolutions.app.n8n.cloud/webhook-test/mlm-leads';

    const response = await api.post(n8nLeadWebhookUrl, payload);

    console.log('Lead generation request sent to n8n successfully:', response.data);
    return {
      success: true,
      data: response.data,
      message: 'Lead generation request sent successfully'
    };

  } catch (error) {
    console.error('Error sending lead generation request to n8n:', error);
    
    if (error.response) {
      return {
        success: false,
        error: `Server error: ${error.response.status}`,
        message: error.response.data?.message || 'Failed to send lead generation request'
      };
    } else if (error.request) {
      return {
        success: false,
        error: 'Network error',
        message: 'Unable to connect to n8n workflow'
      };
    } else {
      return {
        success: false,
        error: error.message,
        message: 'Failed to send lead generation request'
      };
    }
  }
};

/**
 * Test connection to n8n webhook
 * @param {string} webhookUrl - The webhook URL to test
 * @returns {Promise<Object>} - Test result
 */
export const testN8nConnection = async (webhookUrl) => {
  try {
    const testPayload = {
      test: true,
      timestamp: new Date().toISOString(),
      message: 'Testing n8n webhook connection'
    };

    const response = await api.post(webhookUrl, testPayload);
    
    return {
      success: true,
      message: 'Connection test successful',
      data: response.data
    };

  } catch (error) {
    return {
      success: false,
      error: error.message,
      message: 'Connection test failed'
    };
  }
};

export default {
  sendOnboardingToN8n,
  requestLeadGeneration,
  testN8nConnection
}; 