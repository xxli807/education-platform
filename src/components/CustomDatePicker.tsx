import { palette, withAlpha } from '../theme/palette';
import { Box, Button, Typography, Popover } from '@mui/material';
import { useState, useRef } from 'react';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';

interface CustomDatePickerProps {
  value: string;
  onChange: (date: string) => void;
  error?: boolean;
  disabled?: boolean;
}

const pad = (n: number) => String(n).padStart(2, '0');

// Parse a 'YYYY-MM-DD' string as a LOCAL date (new Date('YYYY-MM-DD') parses as
// UTC, which shifts the day in non-UTC timezones).
const parseLocalDate = (s: string): Date => {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
};

// Format a Date as 'YYYY-MM-DD' from its LOCAL components (never toISOString,
// which converts to UTC and can shift the day back).
const formatLocalDate = (d: Date): string =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

function CustomDatePicker({
  value,
  onChange,
  error,
  disabled,
}: CustomDatePickerProps) {
  const [open, setOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(
    value ? parseLocalDate(value) : new Date()
  );
  const anchorRef = useRef<HTMLDivElement>(null);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const handleSelectDay = (day: number) => {
    const selected = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    onChange(formatLocalDate(selected));
    setOpen(false);
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i);

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const displayDate = value
    ? parseLocalDate(value).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'Select date';

  const todayString = formatLocalDate(new Date());

  return (
    <Box>
      <Box
        ref={anchorRef}
        onClick={() => !disabled && setOpen(true)}
        sx={{
          p: '12px 16px',
          border: '2px solid',
          borderColor: error ? palette.red425 : palette.teal450,
          borderRadius: '4px',
          bgcolor: withAlpha(palette.teal450, 0.05),
          color: error ? palette.red425 : palette.teal175,
          cursor: disabled ? 'default' : 'pointer',
          userSelect: 'none',
          fontSize: '16px',
          fontWeight: 500,
          transition: 'all 0.2s',
          '&:hover': {
            bgcolor: disabled
              ? withAlpha(palette.teal450, 0.05)
              : withAlpha(palette.teal450, 0.1),
            borderColor: error ? palette.red425 : palette.teal175,
          },
        }}
      >
        📅 {displayDate}
      </Box>

      <Popover
        open={open && !disabled}
        anchorEl={anchorRef.current}
        onClose={() => setOpen(false)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{
          sx: {
            background: `linear-gradient(135deg, ${palette.navy475} 0%, ${palette.navy175} 100%)`,
            border: `2px solid ${palette.teal450}`,
            mt: 1,
          },
        }}
      >
        <Box sx={{ p: 2, minWidth: '300px' }}>
          {/* Header */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <Button
              onClick={handlePrevMonth}
              size="small"
              sx={{ color: palette.teal175, minWidth: 'auto', p: 0.5 }}
            >
              <ChevronLeftIcon />
            </Button>
            <Typography
              sx={{
                color: palette.teal100,
                fontWeight: 'bold',
                textAlign: 'center',
                flex: 1,
              }}
            >
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </Typography>
            <Button
              onClick={handleNextMonth}
              size="small"
              sx={{ color: palette.teal175, minWidth: 'auto', p: 0.5 }}
            >
              <ChevronRightIcon />
            </Button>
          </Box>

          {/* Weekday headers */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: 0.5,
              mb: 1,
            }}
          >
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
              <Box
                key={day}
                sx={{
                  textAlign: 'center',
                  color: palette.teal250,
                  fontSize: '12px',
                  fontWeight: 'bold',
                  py: 0.5,
                }}
              >
                {day}
              </Box>
            ))}
          </Box>

          {/* Calendar grid */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: 0.5,
            }}
          >
            {emptyDays.map((_, i) => (
              <Box key={`empty-${i}`} />
            ))}
            {days.map(day => {
              const dayString = formatLocalDate(
                new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth(),
                  day
                )
              );
              const isSelected = value === dayString;
              const isToday = todayString === dayString;

              return (
                <Button
                  key={day}
                  onClick={() => handleSelectDay(day)}
                  sx={{
                    minWidth: 'auto',
                    width: '100%',
                    aspectRatio: '1',
                    p: 0,
                    color: isSelected ? palette.white : palette.teal175,
                    bgcolor: isSelected
                      ? palette.teal450
                      : isToday
                        ? withAlpha(palette.teal450, 0.3)
                        : 'transparent',
                    border:
                      isToday && !isSelected
                        ? `2px solid ${palette.teal450}`
                        : 'none',
                    borderRadius: '4px',
                    fontSize: '14px',
                    fontWeight: isToday ? 'bold' : 'normal',
                    '&:hover': {
                      bgcolor: isSelected
                        ? palette.teal450
                        : withAlpha(palette.teal450, 0.2),
                    },
                  }}
                >
                  {day}
                </Button>
              );
            })}
          </Box>
        </Box>
      </Popover>
    </Box>
  );
}

export default CustomDatePicker;
