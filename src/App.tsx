import { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import EnglishSection from './components/EnglishSection';
import Login from './components/Login';
import MathSection from './components/MathSection';
import ScienceSection from './components/ScienceSection';
import { User } from './types';
function App() {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (username: string) => {
    setUser({ username });
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            user ? <Dashboard user={user} /> : <Login onLogin={handleLogin} />
          }
        />

        <Route path="/math" element={<MathSection />} />
        <Route path="/english" element={<EnglishSection />} />
        <Route path="/science" element={<ScienceSection />} />
      </Routes>
    </Router>
  );
}

export default App;
