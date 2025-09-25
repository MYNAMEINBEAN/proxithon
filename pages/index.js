import { useState, useEffect } from 'react';

export default function Home() {
  const [submissions, setSubmissions] = useState([]);
  const [form, setForm] = useState({
    proxy: '',
    accessibleIn: '',
    source: '',
    redactSource: false,
    email: '',
    discord: ''
  });

  useEffect(() => {
    fetch('/api/submit')
      .then(res => res.json())
      .then(data => setSubmissions(data.filter(s => !s.redactSource)));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    setForm({
      proxy: '',
      accessibleIn: '',
      source: '',
      redactSource: false,
      email: '',
      discord: ''
    });
    window.location.reload();
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1>🌐 Proxithon Submissions</h1>

      <form onSubmit={handleSubmit}>
        <input placeholder="Proxy Link" value={form.proxy} onChange={e => setForm({ ...form, proxy: e.target.value })} required /><br />
        <input placeholder="Accessible In (e.g. US, EU, etc)" value={form.accessibleIn} onChange={e => setForm({ ...form, accessibleIn: e.target.value })} required /><br />
        <input placeholder="Open Source Link" value={form.source} onChange={e => setForm({ ...form, source: e.target.value })} required /><br />
        <label>
          <input type="checkbox" checked={form.redactSource} onChange={e => setForm({ ...form, redactSource: e.target.checked })} />
          Redact Open Source Link from public
        </label><br />
        <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required /><br />
        <input placeholder="Discord Username" value={form.discord} onChange={e => setForm({ ...form, discord: e.target.value })} required /><br />
        <button type="submit">Submit Proxy</button>
      </form>

      <hr />

      <h2>🧾 Public Submissions</h2>
      {submissions.map((s, i) => (
        <div key={i} style={{ marginBottom: 10 }}>
          <a href={s.proxy} target="_blank" rel="noopener noreferrer">{s.proxy}</a><br />
          <small>Accessible In: {s.accessibleIn}</small><br />
          {!s.redactSource && <small>Source: <a href={s.source}>{s.source}</a></small>}
        </div>
      ))}
    </div>
  );
}
