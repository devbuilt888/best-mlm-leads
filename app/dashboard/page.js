'use client';

import { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';


const Container = styled.div`
  max-width: 100%;
  margin: 2rem auto;
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  overflow-x: auto;

  
  @media (max-width: 768px) {
    padding: 0;
  }
`;

const Title = styled.h2`
  font-size: 1.75rem;
  margin-bottom: 1rem;
  text-align: center;
  color: #1f2937;
`;

const FilterBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  @media (max-width: 425px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
`;


const Input = styled.input`
  flex: 1;
  min-width: 180px;
  max-width: 400px;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;

  @media (max-width: 425px) {
    width: 100%;
    max-width: 90%;
  }
`;


const Button = styled.button`
  background: #2563eb;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  white-space: nowrap;
  &:hover {
    background: #1e40af;
  }
`;

const TableWrapper = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  min-width: 800px;
  border-collapse: collapse;
`;

const Th = styled.th`
  text-align: left;
  padding: 0.75rem;
  background: #f9fafb;
  color: #374151;
  border-bottom: 2px solid #e5e7eb;
`;

const Td = styled.td`
  padding: 0.75rem;
  border-bottom: 1px solid #f3f4f6;
  word-break: break-word;
`;

const LeadRow = styled.tr`
  background: ${props => (props.$read ? '#f9fafb' : '#ffffff')};
  transition: background 0.3s;
`;

const MarkRead = styled.button`
  background: ${props => (props.$read ? '#d1fae5' : '#fef3c7')};
  color: ${props => (props.$read ? '#065f46' : '#92400e')};
  border: none;
  border-radius: 4px;
  padding: 0.25rem 0.75rem;
  font-size: 0.85rem;
  cursor: pointer;
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Favorite = styled.button`
  background: none;
  border: none;
  color: ${props => (props.$active ? '#f59e0b' : '#d1d5db')};
  font-size: 1.3rem;
  cursor: pointer;
`;

const ExportBtn = styled(Button)`
  background: #059669;
  &:hover { background: #047857; }
`;

function exportCSV(leads) {
  const header = ['Name', 'Email', 'Company', 'Date', 'Summary'];
  const rows = leads.map(l => [l.name, l.email, l.company, l.date, l.summary]);
  const csv = [header, ...rows].map(r => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'leads.csv';
  a.click();
  URL.revokeObjectURL(url);
}

export default function Dashboard() {
  const [leads, setLeads] = useState([]);
  const [filter, setFilter] = useState('');
  const [showUnread, setShowUnread] = useState(false);

  useEffect(() => {
    fetch('/api/leads')
      .then(res => res.json())
      .then(data => setLeads(data))
      .catch(error => {
        console.error('Error fetching leads:', error);
        setLeads([]); // Set empty array instead of undefined mockLeads
      });
  }, []);

  const filteredLeads = useMemo(() => {
    return leads.filter(l => {
      const name = l.name || '';
      const email = l.email || '';
      const company = l.company || '';
      const summary = l.summary || '';
      return (
        (!showUnread || !l.read) &&
        (name.toLowerCase().includes(filter.toLowerCase()) ||
          email.toLowerCase().includes(filter.toLowerCase()) ||
          company.toLowerCase().includes(filter.toLowerCase()) ||
          summary.toLowerCase().includes(filter.toLowerCase()))
      );
    });
  }, [leads, filter, showUnread]);

  const markAsRead = id => {
    setLeads(leads => leads.map(l => l.id === id ? { ...l, read: true } : l));
  };

  const toggleFavorite = id => {
    setLeads(leads => leads.map(l => l.id === id ? { ...l, favorite: !l.favorite } : l));
  };

  return (
    <Container>
      <Title>📋 Daily Leads</Title>
      <FilterBar>
        <Input
          placeholder="Search leads..."
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />
        <div  style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <Button onClick={() => setShowUnread(u => !u)}>
            {showUnread ? 'Show All' : 'Show Unread'}
          </Button>
          <ExportBtn onClick={() => exportCSV(filteredLeads)}>
            Export CSV
          </ExportBtn>
        </div>
      </FilterBar>
      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <Th>ProductName</Th>
              <Th>Email</Th>
              <Th>Company</Th>
              <Th>Date</Th>
              <Th>Summary</Th>
              <Th>KeyWords</Th>
              <Th>Read</Th>
              <Th>Favorite</Th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.length === 0 ? (
              <tr>
                <Td colSpan={7} style={{ textAlign: 'center', color: '#888', fontSize: '1.1rem', padding: '2rem 0' }}>
                  No leads found. Add a new lead to get started!
                </Td>
              </tr>
            ) : (
              filteredLeads.map(lead => (
                <LeadRow key={lead.id} $read={lead.read} style={{ overflowX: 'auto' }}>
                  <Td>{lead.product}</Td>
                  <Td>{lead.email}</Td>
                  <Td>{lead.company}</Td>
                  <Td>{lead.date}</Td>
                  <Td>{lead.description}</Td>
                  <Td>{lead.keywords}</Td>
                  <Td>
                    <MarkRead
                      type="button"
                      $read={lead.read}
                      onClick={() => markAsRead(lead.id)}
                      disabled={lead.read}
                    >
                      {lead.read ? '✔ Read' : 'Mark Read'}
                    </MarkRead>
                  </Td>
                  <Td>
                    <Favorite
                      type="button"
                      $active={lead.favorite}
                      onClick={() => toggleFavorite(lead.id)}
                    >
                      ★
                    </Favorite>
                  </Td>
                </LeadRow>
              ))
            )}
          </tbody>
        </Table>
      </TableWrapper>
    </Container>
  );
}
