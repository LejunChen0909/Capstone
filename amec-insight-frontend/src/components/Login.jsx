// Login.jsx - React Functional Component for user login form
// This file defines a React functional component that renders a login form
// with username and password inputs and handles form submission.
import React, { useState } from 'react';
import { loginUser } from '../api';
import '../App.css';

function Login({ onLogin }) {
  // Manage state in a React application
  // Define a state variable to store the entered username and a function to update it
  const [username, setUsername] = useState('');
  // Define a state variable to store the entered password and a function to update it
  const [password, setPassword] = useState('');
  // Define a state variable to store any error messages (e.g., login failure) and a function to update it
  const [error, setError] = useState('');

  // Event handling: async function
  // Define an async function to handle form submission (when the user clicks the Login button)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the loginUser function to send the username and password to the backend
      const res = await loginUser({ username, password });
      // If login is successful (server returned success: true)
      if (res.success) {
        // Store the returned token in the browser's local storage for authentication
        localStorage.setItem('token', res.token);
        // Call the onLogin callback to notify the parent component (App) that the user is logged in
        onLogin();
      } else {
        // If login failed (e.g., wrong username or password), display an error message
      setError('Invalid credentials');
        setError('Invalid credentials');
      }
    } catch (err) {
      // If there's a server or network error, display a general error message
      setError('Server error');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      <form onSubmit={handleSubmit}>       
        {/* When the form is submitted, call the handleSubmit function */}
        {/* The following code dynamically saves user input into state and automatically 
        updates the UI — this is React-style DOM manipulation.*/}
        <input
          type="text"      
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}  // Update the username state when the user types
          required       // Field must be filled out before submitting
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}  // Update the password state when the user types
          required
        />
        <button type="submit">Login</button>      {/* Event Handling: Button to submit the form */}
      </form>
    </div>
  );
}

export default Login;
