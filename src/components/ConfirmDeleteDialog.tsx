import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

interface ConfirmDeleteDialogProps {
  open: boolean;
  description?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmDeleteDialog({ open, description, onConfirm, onCancel }: ConfirmDeleteDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: '#0f1623',
          border: '2px solid rgba(239,83,80,0.4)',
          borderRadius: '16px',
          backgroundImage: 'none',
        },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#ef9a9a' }}>
          🗑️ Delete this record?
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ pb: 1 }}>
        <Typography sx={{ color: '#90a4ae', fontSize: '0.95rem' }}>
          {description ?? 'This record will be permanently deleted and cannot be recovered.'}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
        <Button
          onClick={onCancel}
          sx={{
            borderRadius: '12px',
            textTransform: 'none',
            fontWeight: 'bold',
            color: '#90a4ae',
            border: '1px solid rgba(144,164,174,0.3)',
            px: 2.5,
            '&:hover': { bgcolor: 'rgba(144,164,174,0.1)' },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          startIcon={<DeleteIcon />}
          sx={{
            borderRadius: '12px',
            textTransform: 'none',
            fontWeight: 'bold',
            bgcolor: 'rgba(239,83,80,0.2)',
            color: '#ef5350',
            border: '1px solid rgba(239,83,80,0.5)',
            px: 2.5,
            '&:hover': { bgcolor: 'rgba(239,83,80,0.3)', borderColor: '#ef5350' },
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDeleteDialog;
