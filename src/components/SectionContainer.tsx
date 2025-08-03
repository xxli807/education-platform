import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Container, Divider, IconButton, Typography } from '@mui/material';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { supportedSubject } from '../models';

export interface SectionProps {
  name: supportedSubject;
  children: React.ReactNode;
}

function SectionContainer({ name, children }: SectionProps) {
  const navigate = useNavigate();
  const handleBackToDashboard = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return (
    <Container
      maxWidth="md"
      className="min-h-screen bg-gradient-to-r from-yellow-200 to-orange-200 py-8"
    >
      <div className="mb-4">
        <IconButton
          onClick={handleBackToDashboard}
          className="!bg-white !text-red-600 hover:!bg-gray-100"
          size="large"
        >
          <ArrowBackIcon />
        </IconButton>
      </div>

      <Typography
        variant="h3"
        className="text-center text-red-600 font-bold !mb-[10px] !mt-[10px]"
      >
        Hello Lucas, {name} Fun Zone
      </Typography>
      <Divider />
      {children}
    </Container>
  );
}

export default SectionContainer;
