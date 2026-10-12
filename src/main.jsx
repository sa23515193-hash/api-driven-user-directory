import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

function UserCard({ user }) {
  const initials = user.name.split(' ').map(part => part[0]).slice(0, 2).join('');
  return <article className="user-card"><div className="card-top"><div className="avatar">{initials}</div><span className="status"><i/> Available</span></div><h2>{user.name}</h2><p className="role">{user.company?.title || 'Team member'}</p><div className="info"><span>✉</span><a href={`mailto:${user.email}`}>{user.email}</a></div><div className="info"><span>⌖</span><span>{user.address?.city || 'Location unavailable'}</span></div><div className="card-bottom"><span>{user.company?.name || 'Independent'}</span><a href={`https://${user.website}`} target="_blank" rel="noreferrer">Website ↗</a></div></article>;
}
function App() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState('');
  const [company, setCompany] = useState('all');
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setStatus('loading'); setError('');
    fetch('https://jsonplaceholder.typicode.com/users', { signal: controller.signal })
      .then(response => { if (!response.ok) throw new Error('The directory service returned an error.'); return response.json(); })
      .then(data => { setUsers(data); setStatus('success'); })
      .catch(err => { if (err.name !== 'AbortError') { setError(err.message || 'Could not load users. Check your connection and try again.'); setStatus('error'); } });
    return () => controller.abort();
  }, [retry]);

  const companies = useMemo(() => [...new Set(users.map(user => user.company?.name).filter(Boolean))].sort(), [users]);
  const filteredUsers = useMemo(() => users.filter(user => {
    const searchable = `${user.name} ${user.email} ${user.company?.name} ${user.address?.city}`.toLowerCase();
    return searchable.includes(query.toLowerCase()) && (company === 'all' || user.company?.name === company);
  }), [users, query, company]);

  return <div className="app-shell"><header className="topbar"><a className="brand" href="#"><span className="brand-mark">P</span> People<span>Hub</span></a><span className="top-note">TEAM DIRECTORY / 2026</span></header><main><section className="intro"><div><p className="eyebrow">YOUR PEOPLE, CONNECTED</p><h1>Meet your <span>people.</span></h1><p className="subtitle">A little less searching. A lot more connecting.</p></div><div className="total"><strong>{status === 'success' ? users.length : '—'}</strong><span>team profiles</span></div></section><section className="toolbar"><label className="search"><span>⌕</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search name, email, company or city..." aria-label="Search users"/></label><select value={company} onChange={e => setCompany(e.target.value)} aria-label="Filter by company"><option value="all">All companies</option>{companies.map(name => <option key={name} value={name}>{name}</option>)}</select></section>{status === 'loading' && <div className="state"><div className="spinner"/><h2>Finding your people…</h2><p>Loading profiles from the public directory API.</p></div>}{status === 'error' && <div className="state error"><div className="state-icon">!</div><h2>We couldn't load the directory</h2><p>{error}</p><button onClick={() => setRetry(n => n + 1)}>Try again ↻</button></div>}{status === 'success' && <><div className="results-line"><span>{filteredUsers.length} profiles found</span><span>Public demo data · JSONPlaceholder</span></div>{filteredUsers.length ? <div className="grid">{filteredUsers.map(user => <UserCard key={user.id} user={user}/>)}</div> : <div className="state"><div className="state-icon">⌕</div><h2>No matches found</h2><p>Try a different search term or company filter.</p><button onClick={() => {setQuery('');setCompany('all')}}>Clear filters</button></div>}</>}</main><footer>PeopleHub <span>•</span> A React API integration demo</footer></div>;
}
createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
