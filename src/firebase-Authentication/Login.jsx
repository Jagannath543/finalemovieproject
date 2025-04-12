// src/firebase-Authentication/Login.jsx
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './Firebase';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      sessionStorage.setItem('token', result.user.accessToken);
      sessionStorage.setItem('user', JSON.stringify(result.user));
      alert('Login successful!');
      navigate('/home'); // ⬅️ Redirect to Hoome.jsx
    } catch (error) {
      alert('Login failed: ' + error.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        <p>Don't have an account? < span className="sign-but" onClick={() => navigate('/signup')}>Signup</span></p>
      </form>
    </div>
  );
};

export default Login;
