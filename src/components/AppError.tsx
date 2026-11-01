import { palette, withAlpha } from '../theme/palette';
import { Box, Button, Typography } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { forceRefresh } from '../utils/forceRefresh';

/**
 * Shown when a page fails to load — usually an open tab still running an old
 * deploy whose page files are gone. The home-screen app has no reload button
 * or back button, so offer a refresh right here.
 */
function AppError() {
  return (
    <Box
      sx={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        px: 3,
        textAlign: 'center',
        bgcolor: palette.navy950,
      }}
    >
      <Typography sx={{ fontSize: '3.5rem' }}>🔄</Typography>
      <Typography variant="h4" sx={{ color: palette.blue100, fontWeight: 900 }}>
        Time for a refresh!
      </Typography>
      <Typography sx={{ color: palette.slate200, fontSize: '1.1rem' }}>
        The app was updated. Tap Refresh to load the newest version.
      </Typography>
      <Button
        onClick={forceRefresh}
        startIcon={<RefreshIcon />}
        variant="contained"
        size="large"
        sx={{
          mt: 1,
          bgcolor: palette.blue350,
          color: palette.navy950,
          fontWeight: 800,
          fontSize: '1.1rem',
          textTransform: 'none',
          borderRadius: '14px',
          px: 4,
          '&:hover': { bgcolor: withAlpha(palette.blue350, 0.85) },
        }}
      >
        Refresh
      </Button>
    </Box>
  );
}

export default AppError;
