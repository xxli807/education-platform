import {
  Box,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  LinearProgress,
  Typography,
} from '@mui/material';
import {
  CheckCircle as CheckIcon,
  Cancel as WrongIcon,
  Close as CloseIcon,
  EmojiEvents as TrophyIcon,
} from '@mui/icons-material';

export interface ReviewQuestion {
  text: string;
  correctAnswer: string | number;
  userAnswer: string;
  isCorrect: boolean;
}

interface SessionReviewDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  accentColor: string;
  questions: ReviewQuestion[];
  score: number;
  correctCount: number;
  totalQuestions: number;
  date: Date;
}

function SessionReviewDialog({
  open,
  onClose,
  title,
  subtitle,
  accentColor,
  questions,
  score,
  correctCount,
  totalQuestions,
  date,
}: SessionReviewDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: '#0f1623',
          border: `2px solid ${accentColor}40`,
          borderRadius: '20px',
          backgroundImage: 'none',
        },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#e0e0e0' }}>
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="body2" sx={{ color: '#78909c', mt: 0.3 }}>
                {subtitle}
              </Typography>
            )}
            <Typography variant="caption" sx={{ color: '#546e7a' }}>
              {date.toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
            </Typography>
          </Box>
          <IconButton onClick={onClose} sx={{ color: '#78909c', mt: -0.5 }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Score bar */}
        <Box sx={{ mt: 1.5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
              {score === 100 && <TrophyIcon sx={{ color: '#ffd54f', fontSize: '1.1rem' }} />}
              <Typography sx={{ fontWeight: 'bold', color: score === 100 ? '#ffd54f' : accentColor, fontSize: '0.95rem' }}>
                {correctCount}/{totalQuestions} correct
              </Typography>
            </Box>
            <Chip
              label={`${score}%`}
              size="small"
              sx={{
                fontWeight: 'bold',
                bgcolor: score === 100 ? 'rgba(76,175,80,0.3)' : score >= 70 ? 'rgba(255,167,38,0.25)' : 'rgba(239,83,80,0.2)',
                color: score === 100 ? '#a5d6a7' : score >= 70 ? '#ffcc80' : '#ef9a9a',
              }}
            />
          </Box>
          <LinearProgress
            variant="determinate"
            value={score}
            sx={{
              height: 6,
              borderRadius: 3,
              bgcolor: 'rgba(255,255,255,0.08)',
              '& .MuiLinearProgress-bar': {
                bgcolor: score === 100 ? '#4caf50' : score >= 70 ? '#ffa726' : '#ef5350',
                borderRadius: 3,
              },
            }}
          />
        </Box>
      </DialogTitle>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />

      <DialogContent sx={{ px: 2.5, pt: 2, pb: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {questions.map((q, idx) => (
            <Box
              key={idx}
              sx={{
                p: 1.8,
                borderRadius: '12px',
                bgcolor: q.isCorrect ? 'rgba(76,175,80,0.08)' : 'rgba(239,83,80,0.08)',
                border: `1px solid ${q.isCorrect ? 'rgba(76,175,80,0.3)' : 'rgba(239,83,80,0.3)'}`,
              }}
            >
              {/* Question number + icon */}
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 0.8 }}>
                <Chip
                  label={`Q${idx + 1}`}
                  size="small"
                  sx={{ bgcolor: 'rgba(255,255,255,0.08)', color: '#90a4ae', fontWeight: 'bold', fontSize: '0.7rem', height: 20 }}
                />
                {q.isCorrect
                  ? <CheckIcon sx={{ color: '#66bb6a', fontSize: '1.1rem', mt: '1px' }} />
                  : <WrongIcon sx={{ color: '#ef5350', fontSize: '1.1rem', mt: '1px' }} />}
              </Box>

              {/* Question text */}
              <Typography sx={{ color: '#cfd8dc', fontSize: '0.88rem', fontWeight: 500, whiteSpace: 'pre-line', mb: 1, lineHeight: 1.5 }}>
                {q.text}
              </Typography>

              {/* Lucas's answer */}
              <Box sx={{ display: 'flex', gap: 0.8, flexWrap: 'wrap' }}>
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ fontSize: '0.72rem', color: '#546e7a', mb: 0.2, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                    Lucas answered
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                      color: q.isCorrect ? '#a5d6a7' : '#ef9a9a',
                      fontStyle: q.userAnswer ? 'normal' : 'italic',
                    }}
                  >
                    {q.userAnswer || '(no answer)'}
                  </Typography>
                </Box>

                {!q.isCorrect && (
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontSize: '0.72rem', color: '#546e7a', mb: 0.2, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      Correct answer
                    </Typography>
                    <Typography sx={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#a5d6a7' }}>
                      {q.correctAnswer}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default SessionReviewDialog;
