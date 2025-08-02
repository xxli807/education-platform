import { useNavigate } from 'react-router-dom';
import { Container, Typography, Grid, Card, CardContent } from '@mui/material';
import { User } from '../types';

interface DashboardProps {
  user: User;
}

function Dashboard({ user }: DashboardProps) {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" className="min-h-screen bg-gradient-to-r from-green-200 to-blue-200 py-8">
      <Typography variant="h3" className="text-center text-purple-600 font-bold mb-8">
        Hello, {user.username}! Let's Learn!
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={4}>
          <Card
            className="bg-red-100 hover:bg-red-200 cursor-pointer transition-colors"
            onClick={() => navigate('/math')}
          >
            <CardContent className="text-center">
              <Typography variant="h5" className="text-red-600 font-bold">
                Math Fun
              </Typography>
              <Typography className="text-gray-700">
                Practice numbers, addition, and more!
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card
            className="bg-blue-100 hover:bg-blue-200 cursor-pointer transition-colors"
            onClick={() => navigate('/english')}
          >
            <CardContent className="text-center">
              <Typography variant="h5" className="text-blue-600 font-bold">
                English Adventure
              </Typography>
              <Typography className="text-gray-700">
                Learn words, spelling, and stories!
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card
            className="bg-green-100 hover:bg-green-200 cursor-pointer transition-colors"
            onClick={() => navigate('/science')}
          >
            <CardContent className="text-center">
              <Typography variant="h5" className="text-green-600 font-bold">
                Science Quest
              </Typography>
              <Typography className="text-gray-700">
                Explore plants, animals, and more!
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;