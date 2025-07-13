/*
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/
// Import './App.css'
import './App.css';
// Import React core module
import React, { useState, useEffect } from 'react';
// Import React Router module for building single-page applications (SPA)
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';

// Import custom components
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import TodoList from './components/TodoList';  // Another page component

function App() {
  // Use useState to manage login status (default is not logged in)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Use useEffect to check whether there is a token in localStorage (for maintaining login state)
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // token 存在即为 true
  }, []);

  // Handle logout: remove token and update login status
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  //  If not logged in, render the Login component directly
  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  // If logged in, render the main interface
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Top navigation bar with links and logout button  */}
        <div className="flex justify-between items-center p-4 bg-white shadow">
          <nav>
            {/* Navigation links */}
            <Link to="/dashboard" className="mr-4 text-blue-600 hover:underline">Dashboard</Link>
            <Link to="/todo" className="text-blue-600 hover:underline">Todo List</Link>
          </nav>
          {/* Logout button */}
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        {/* Main content area – load different components based on the route */}
        <div className="p-4">
          <Routes>
            {/* Redirect default path to dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" />} />
            {/* Dashboard route */}
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Todo List route */}
            <Route path="/todo" element={<TodoList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
