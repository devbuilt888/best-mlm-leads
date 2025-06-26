// In-memory storage for leads (demo only - resets on server restart)
let leads = [
  {
    id: 1,
    product: 'Product A',
    description: 'Description A',
    email: 'john@example.com',
    company: 'Acme Inc',
    date: '2024-06-10',
    keywords: 'product A, product B, product C',
    read: false,
    favorite: false
  },
  {
    id: 2,
    product: 'Product B',
    description: 'Description B',
    email: 'jane@example.com',
    company: 'Beta LLC',
    date: '2024-06-10',
    keywords: 'product A, product B, product C',
    read: false,
    favorite: false
  },
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