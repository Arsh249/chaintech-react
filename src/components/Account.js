import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Account.css'; 

const Account = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
      navigate('/');
    } else {
      setEmail(loggedInUser.email);
      setUsername(loggedInUser.username);
      setPassword(loggedInUser.password);
      setAge(loggedInUser.age);
      setAddress(loggedInUser.address);
    }
  }, [navigate]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map((user) =>
      user.email === email
        ? { ...user, email, username, password, age, address }
        : user
    );

    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem('loggedInUser', JSON.stringify({ email, username, password, age, address }));
    alert('Account updated successfully');
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/login');
  };

  return (
    <div className="account-container">
      <div className="account-box">
        <h2>Account Information</h2>
        <form onSubmit={handleUpdate} className="account-form">
          <div className="account-field">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled
              className="account-input disabled-input"
            />
          </div>
          <div className="account-field">
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="account-input"
            />
          </div>
          <div className="account-field">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="account-input"
            />
          </div>
          <div className="account-field">
            <label>Age:</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              className="account-input"
            />
          </div>
          <div className="account-field">
            <label>Address:</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="account-input"
            />
          </div>
          <button type="submit" className="account-button">Update</button>
        </form>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
    </div>
  );
};

export default Account;
