import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.user.role);
      navigate(res.data.user.role === 'admin' ? '/admin-dashboard' : '/user-dashboard');
    } catch (err) {
      alert('Invalid Credentials');
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-primary">
      <div className="card p-4 shadow-lg" style={{ width: '400px' }}>
        <h2 className="text-center mb-4 text-primary">Tool Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary w-full">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;