import { palette, withAlpha } from '../theme/palette';
import { Box, Button, Typography } from '@mui/material';
import {
  ExpandLess as ExpandLessIcon,
  EditNote as WhiteboardIcon,
  Delete as EraseIcon,
} from '@mui/icons-material';
import React, { useCallback, useEffect, useRef, useState } from 'react';

function Whiteboard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [position, setPosition] = useState({ top: 80, right: 16 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, startTop: 0, startRight: 0 });
  const dragDistance = useRef(0);
  const DRAG_THRESHOLD = 10;

  const getPos = (
    e: React.MouseEvent | React.TouchEvent,
    canvas: HTMLCanvasElement
  ) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if ('touches' in e) {
      const t = e.touches[0];
      return {
        x: (t.clientX - rect.left) * scaleX,
        y: (t.clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    drawing.current = true;
    lastPos.current = getPos(e, canvas);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!drawing.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const pos = getPos(e, canvas);
    if (lastPos.current) {
      ctx.beginPath();
      ctx.moveTo(lastPos.current.x, lastPos.current.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.strokeStyle = palette.black;
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();
    }
    lastPos.current = pos;
  };

  const stopDraw = () => {
    drawing.current = false;
    lastPos.current = null;
  };

  const erase = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = palette.white;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    if (!expanded) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const size = () => {
      const { width, height } = canvas.getBoundingClientRect();
      if (width > 0 && height > 0) {
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = palette.white;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
      }
    };
    const t = setTimeout(size, 50);
    window.addEventListener('resize', size);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', size);
    };
  }, [expanded]);

  const stopDrag = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDragMove = useCallback((clientX: number, clientY: number) => {
    const deltaX = clientX - dragStart.current.x;
    const deltaY = clientY - dragStart.current.y;
    dragDistance.current = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    setPosition({
      top: Math.max(0, dragStart.current.startTop + deltaY),
      right: Math.max(0, dragStart.current.startRight - deltaX),
    });
  }, []);

  const startDrag = (clientX: number, clientY: number) => {
    setIsDragging(true);
    dragStart.current = {
      x: clientX,
      y: clientY,
      startTop: position.top,
      startRight: position.right,
    };
    dragDistance.current = 0;
  };

  const startMouseDrag = (e: React.MouseEvent) => {
    e.preventDefault();
    startDrag(e.clientX, e.clientY);
  };

  const startTouchDrag = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    startDrag(touch.clientX, touch.clientY);
  };

  useEffect(() => {
    if (!isDragging) return;

    const onMouseMove = (e: MouseEvent) => handleDragMove(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      handleDragMove(touch.clientX, touch.clientY);
    };
    const onMouseUp = () => stopDrag();
    const onTouchEnd = () => stopDrag();

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('touchend', onTouchEnd);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('touchend', onTouchEnd);
    };
  }, [isDragging, handleDragMove, stopDrag]);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: position.top,
        right: position.right,
        zIndex: 1200,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
      }}
    >
      {!expanded && (
        <Box
          onMouseDown={startMouseDrag}
          onTouchStart={startTouchDrag}
          onClick={() => {
            if (dragDistance.current < DRAG_THRESHOLD) {
              setExpanded(true);
            }
          }}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            px: 2,
            py: 1,
            borderRadius: '24px',
            bgcolor: withAlpha(palette.navy950, 0.92),
            border: `2px solid ${withAlpha(palette.amber450, 0.6)}`,
            boxShadow: `0 0 12px ${withAlpha(palette.amber450, 0.3)}`,
            cursor: 'grab',
            userSelect: 'none',
            backdropFilter: 'blur(8px)',
            touchAction: 'none',
            '&:hover': {
              border: `2px solid ${palette.amber450}`,
              boxShadow: `0 0 20px ${withAlpha(palette.amber450, 0.5)}`,
            },
            transition: 'all 0.2s',
            '&:active': { cursor: 'grabbing' },
          }}
        >
          <WhiteboardIcon
            sx={{ color: palette.amber450, fontSize: '1.2rem' }}
          />
          <Typography
            sx={{
              color: palette.amber450,
              fontWeight: 'bold',
              fontSize: '0.85rem',
              whiteSpace: 'nowrap',
            }}
          >
            ✏️ Whiteboard
          </Typography>
        </Box>
      )}

      {expanded && (
        <Box
          sx={{
            width: { xs: '80vw', sm: '45vw', md: '50vw' },
            height: '90vh',
            display: 'flex',
            flexDirection: 'column',
            bgcolor: withAlpha(palette.navy950, 0.95),
            border: `2px solid ${withAlpha(palette.amber450, 0.5)}`,
            borderRadius: '16px',
            boxShadow: `0 8px 32px ${withAlpha(palette.black, 0.6)}, 0 0 20px ${withAlpha(palette.amber450, 0.2)}`,
            backdropFilter: 'blur(12px)',
            overflow: 'hidden',
          }}
        >
          <Box
            onMouseDown={startMouseDrag}
            onTouchStart={startTouchDrag}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 2,
              py: 1,
              borderBottom: `1px solid ${withAlpha(palette.amber450, 0.25)}`,
              bgcolor: withAlpha(palette.amber450, 0.07),
              flexShrink: 0,
              cursor: 'grab',
              userSelect: 'none',
              touchAction: 'none',
              '&:active': { cursor: 'grabbing' },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <WhiteboardIcon
                sx={{ color: palette.amber450, fontSize: '1.1rem' }}
              />
              <Typography
                sx={{
                  color: palette.amber450,
                  fontWeight: 'bold',
                  fontSize: '0.9rem',
                }}
              >
                Whiteboard
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                size="small"
                startIcon={<EraseIcon sx={{ fontSize: '1rem !important' }} />}
                onClick={erase}
                sx={{
                  borderRadius: '14px',
                  textTransform: 'none',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  color: palette.amber450,
                  border: `1px solid ${withAlpha(palette.amber450, 0.4)}`,
                  px: 1.5,
                  py: 0.5,
                  minWidth: 0,
                  '&:hover': {
                    bgcolor: withAlpha(palette.amber450, 0.1),
                    borderColor: palette.amber450,
                  },
                }}
              >
                Clear
              </Button>
              <Button
                size="small"
                startIcon={
                  <ExpandLessIcon sx={{ fontSize: '1rem !important' }} />
                }
                onClick={() => setExpanded(false)}
                sx={{
                  borderRadius: '14px',
                  textTransform: 'none',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  color: palette.slate400,
                  border: `1px solid ${withAlpha(palette.slate400, 0.3)}`,
                  px: 1.5,
                  py: 0.5,
                  minWidth: 0,
                  '&:hover': {
                    bgcolor: withAlpha(palette.slate400, 0.1),
                    borderColor: palette.slate400,
                  },
                }}
              >
                Minimize
              </Button>
            </Box>
          </Box>

          <Box
            sx={{
              touchAction: 'none',
              cursor: 'crosshair',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <canvas
              ref={canvasRef}
              style={{ width: '100%', flex: 1, display: 'block' }}
              onMouseDown={startDraw}
              onMouseMove={draw}
              onMouseUp={stopDraw}
              onMouseLeave={stopDraw}
              onTouchStart={startDraw}
              onTouchMove={draw}
              onTouchEnd={stopDraw}
            />
            <Typography
              sx={{
                color: palette.slate950,
                fontSize: '0.7rem',
                textAlign: 'center',
                pb: 0.5,
                flexShrink: 0,
              }}
            >
              draw with finger or mouse
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default Whiteboard;
