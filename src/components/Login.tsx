import {
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <>
      <Container
        maxWidth="md"
        className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-sky-300 via-sky-100 to-sky-300"
      >
        {/* Simple cloud elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-48 h-32 bg-white/50 rounded-full blur-md top-1/4 left-1/5 animate-bounce"></div>
          <div className="absolute w-36 h-24 bg-white/40 rounded-full blur-md top-1/5 right-1/4 animate-pulse"></div>
          <div className="absolute w-44 h-28 bg-white/60 rounded-full blur-md bottom-1/4 right-1/5 animate-bounce"></div>
          <div className="absolute w-32 h-20 bg-white/30 rounded-full blur-md bottom-1/5 left-1/4 animate-pulse"></div>
        </div>

        <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-xl border-2 border-blue-200 rounded-xl relative z-10">
          <CardContent>
            <Typography
              variant="h4"
              className="text-center text-blue-600 font-bold mb-4"
            >
              Welcome to Kids Learning Portal!
            </Typography>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="mb-4"
              InputProps={{ className: 'bg-white' }}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="!mb-[4px] !mt-[4px]"
              InputProps={{ className: 'bg-white' }}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleLogin}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 mt-4"
            >
              Login
            </Button>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

export default Login;
