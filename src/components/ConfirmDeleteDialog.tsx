import { palette, withAlpha } from '../theme/palette';
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

function ConfirmDeleteDialog({
  open,
  description,
  onConfirm,
  onCancel,
}: ConfirmDeleteDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: palette.navy800,
          border: `2px solid ${withAlpha(palette.red425, 0.4)}`,
          borderRadius: '16px',
          backgroundImage: 'none',
        },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 'bold', color: palette.red125 }}
        >
          🗑️ Delete this record?
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ pb: 1 }}>
        <Typography sx={{ color: palette.slate400, fontSize: '0.95rem' }}>
          {description ??
            'This record will be permanently deleted and cannot be recovered.'}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
        <Button
          onClick={onCancel}
          sx={{
            borderRadius: '12px',
            textTransform: 'none',
            fontWeight: 'bold',
            color: palette.slate400,
            border: `1px solid ${withAlpha(palette.slate400, 0.3)}`,
            px: 2.5,
            '&:hover': { bgcolor: withAlpha(palette.slate400, 0.1) },
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
            bgcolor: withAlpha(palette.red425, 0.2),
            color: palette.red425,
            border: `1px solid ${withAlpha(palette.red425, 0.5)}`,
            px: 2.5,
            '&:hover': {
              bgcolor: withAlpha(palette.red425, 0.3),
              borderColor: palette.red425,
            },
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDeleteDialog;
