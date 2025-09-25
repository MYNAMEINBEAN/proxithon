import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/submit')
      .then(res => res.json())
      .then(setData);
  }, []);

  return (
    <div style={{ maxWidth: 800, margin: 'auto', padding: 20 }}>
      <h1>🔐 Admin Dashboard</h1>
      {data.map((s, i) => (
        <div key={i} style={{ marginBottom: 15, borderBottom: '1px solid #ccc', paddingBottom: 10 }}>
          <strong><a href={s.proxy} target="_blank">{s.proxy}</a></strong><br />
          <small>Accessible In: {s.accessibleIn}</small><br />
          <small>Source: <a href={s.source} target="_blank">{s.source}</a></small><br />
          <small>Email: {s.email}</small><br />
          <small>Discord: {s.discord}</small>
        </div>
      ))}
    </div>
  );
}
