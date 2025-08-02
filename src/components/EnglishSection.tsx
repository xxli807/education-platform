import { Container, Typography, Card, CardContent, TextField, Button } from '@mui/material';
import { englishReadings, englishWritingTasks } from '../data/englishContent'

function EnglishSection() {
  return (
    <Container maxWidth="md" className="min-h-screen bg-gradient-to-r from-purple-200 to-pink-200 py-8">
      <Typography variant="h3" className="text-center text-blue-600 font-bold mb-8">
        English Adventure Zone
      </Typography>
      <Typography variant="h5" className="text-blue-600 mb-4">
        Reading
      </Typography>
      {englishReadings.map((reading, index) => (
        <Card key={index} className="mb-4 bg-white">
          <CardContent>
            <Typography variant="h6" className="text-blue-600 mb-2">
              {reading.title}
            </Typography>
            <Typography className="text-gray-700">{reading.text}</Typography>
          </CardContent>
        </Card>
      ))}
      <Typography variant="h5" className="text-blue-600 mb-4 mt-8">
        Writing Tasks
      </Typography>
      {englishWritingTasks.map((task, index) => (
        <Card key={index} className="mb-4 bg-white">
          <CardContent>
            <Typography variant="h6" className="text-blue-600 mb-2">
              {task.prompt}
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Your Response"
              variant="outlined"
              className="mb-2"
              InputProps={{ className: 'bg-blue-50' }}
            />
            <Button
              variant="contained"
              color="primary"
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Submit
            </Button>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}

export default EnglishSection;