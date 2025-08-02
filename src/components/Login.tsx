import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, CardContent, Typography, TextField, Button } from '@mui/material';

interface LoginProps {
  onLogin: (username: string) => void;
}

function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username && password) {
      onLogin(username);
      navigate('/');
    } else {
      alert('Please enter both username and password!');
    }
  };

  return (
    <Container maxWidth="sm" className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 to-purple-200">
      <Card className="p-6 bg-yellow-100 shadow-lg">
        <CardContent>
          <Typography variant="h4" className="text-center text-blue-600 font-bold mb-4">
            Welcome to Kids Learning Portal!
          </Typography>
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mb-4"
            InputProps={{ className: 'bg-white' }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4"
            InputProps={{ className: 'bg-white' }}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleLogin}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3"
          >
            Login
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Login;