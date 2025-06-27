// In-memory storage for leads (demo only - resets on server restart)
let leads = [
  {
    id: 1,
    product: 'Enterprise CRM Solution',
    description: 'Looking for a comprehensive CRM system for our sales team',
    email: 'john.smith@techcorp.com',
    company: 'TechCorp Industries',
    date: '2024-01-15',
    keywords: 'CRM, enterprise, sales automation, cloud',
    read: false,
    favorite: false
  },
  {
    id: 2,
    product: 'Marketing Automation Platform',
    description: 'Need marketing automation tools for lead generation',
    email: 'sarah.johnson@startup.com',
    company: 'StartupXYZ',
    date: '2024-01-14',
    keywords: 'marketing automation, lead generation, email campaigns',
    read: true,
    favorite: true
  },
  {
    id: 3,
    product: 'Cloud Infrastructure Services',
    description: 'Seeking cloud migration and infrastructure solutions',
    email: 'mike.wilson@enterprise.com',
    company: 'Enterprise Solutions Ltd',
    date: '2024-01-13',
    keywords: 'cloud migration, infrastructure, AWS, Azure',
    read: false,
    favorite: false
  },
  {
    id: 4,
    product: 'AI-Powered Analytics',
    description: 'Interested in AI-driven business intelligence tools',
    email: 'lisa.chen@dataflow.com',
    company: 'DataFlow Analytics',
    date: '2024-01-12',
    keywords: 'AI, analytics, business intelligence, machine learning',
    read: false,
    favorite: true
  }
];

export async function POST(req) {
  try {
    const lead = await req.json();
    console.log('📥 POST /api/leads - Received lead:', lead);
    
    // Add a unique id and default fields
    const newLead = { 
      ...lead, 
      id: Date.now(), 
      read: false, 
      favorite: false,
      date: new Date().toISOString().split('T')[0] // Add today's date
    };
    
    leads.push(newLead);
    console.log('✅ Lead added successfully. Total leads:', leads.length);
    console.log('📋 All leads:', leads);
    
    return new Response(JSON.stringify({ success: true, lead: newLead }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('❌ Error adding lead:', err);
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function GET() {
  console.log('📤 GET /api/leads - Returning leads. Count:', leads.length);
  console.log('📋 All leads:', leads);
  
  return new Response(JSON.stringify(leads), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
} 