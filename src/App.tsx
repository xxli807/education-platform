import { useState, useEffect } from 'react';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import EnglishSection from './components/EnglishSection';
import Login from './components/Login';
import MathSection from './components/MathSection';
import ScienceSection from './components/ScienceSection';
import ThinkingSection from './components/ThinkingSection';
import HolidayTodoSection from './components/HolidayTodoSection';
import { User } from './types';
import { initializeStorageCleanup } from './utils/storageManager';

function App() {
  const [user, setUser] = useState<User | null>(() => {
    // Restore user from localStorage on initial load
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    initializeStorageCleanup();
  }, []);

  const handleLogin = (username: string) => {
    const newUser = { username };
    setUser(newUser);
    // Persist to localStorage
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            user ? <Dashboard user={user} onLogout={handleLogout} /> : <Login onLogin={handleLogin} />
          }
        />

        <Route
          path="/math"
          element={user ? <MathSection /> : <Login onLogin={handleLogin} />}
        />
        <Route
          path="/english"
          element={user ? <EnglishSection /> : <Login onLogin={handleLogin} />}
        />
        <Route
          path="/science"
          element={user ? <ScienceSection /> : <Login onLogin={handleLogin} />}
        />
        <Route
          path="/thinking"
          element={user ? <ThinkingSection /> : <Login onLogin={handleLogin} />}
        />
        <Route
          path="/holiday-todo"
          element={user ? <HolidayTodoSection /> : <Login onLogin={handleLogin} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
