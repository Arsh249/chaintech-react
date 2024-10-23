import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../Login.css'; 

const Login = () => {
  const [input, setInput] = useState(''); // This will be either email or username
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Check if input matches either email or username
    const user = users.find(
      (user) =>
        (user.email === input || user.username === input) && user.password === password
    );

    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      navigate('/account');
    } else {
      alert('Invalid email/username or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email or Username"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            required
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
          <button type="submit" className="login-button">Login</button>
        </form>
        <p>Don't have an account? <Link to="/" className="login-link">Register</Link></p>
      </div>
    </div>
  );
};

export default Login;
