import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';

interface AlertDialogProps {
  open: boolean;
  title: string;
  message: string;
  onClose: () => void;
  type?: 'error' | 'success' | 'info';
}

function AlertDialog({ open, title, message, onClose, type = 'info' }: AlertDialogProps) {
  const iconMap = {
    error: '⚠️',
    success: '✅',
    info: 'ℹ️',
  };

  const colorMap = {
    error: { title: '#ef9a9a', message: '#ef5350', border: '#ef5350' },
    success: { title: '#81c784', message: '#4caf50', border: '#4caf50' },
    info: { title: '#64b5f6', message: '#42a5f5', border: '#42a5f5' },
  };

  const colors = colorMap[type];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: '#0f1623',
          border: `2px solid rgba(${type === 'error' ? '239,83,80' : type === 'success' ? '76,175,80' : '66,165,245'},0.4)`,
          borderRadius: '16px',
          backgroundImage: 'none',
        },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: colors.title }}>
          {iconMap[type]} {title}
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ pb: 1 }}>
        <Typography sx={{ color: '#90a4ae', fontSize: '0.95rem' }}>
          {message}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2.5 }}>
        <Button
          onClick={onClose}
          sx={{
            borderRadius: '12px',
            textTransform: 'none',
            fontWeight: 'bold',
            color: colors.border,
            border: `1px solid ${colors.border}`,
            px: 2.5,
            '&:hover': { bgcolor: `rgba(${type === 'error' ? '239,83,80' : type === 'success' ? '76,175,80' : '66,165,245'},0.1)` },
          }}
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AlertDialog;
