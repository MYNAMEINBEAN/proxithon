import { useState } from 'react';
import { useRouter } from 'next/router';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === '8fhe92fhyhqf') {
      router.push('/admin/dashboard');
    } else {
      alert('Wrong password!');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h1>Admin Login</h1>
      <form onSubmit={handleLogin}>
        <input type="password" placeholder="Enter admin password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
