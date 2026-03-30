import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';

type YTVideo = {
  id: string;
  title: string;
  thumbnailUrl: string;
  duration: string;
  seconds: number;
};

export interface YouTubeRewardProps {
  visible: boolean;
  title?: string;
  description?: string;
  placeholder?: string;
  minDurationSec?: number;
  maxDurationSec?: number;
  className?: string;
  resetOnHide?: boolean;
}

const parseDuration = (duration: string): number => {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;

  const hours = parseInt(match[1] || '0', 10);
  const minutes = parseInt(match[2] || '0', 10);
  const seconds = parseInt(match[3] || '0', 10);

  return hours * 3600 + minutes * 60 + seconds;
};

const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export default function YouTubeReward({
  visible,
  title = 'Reward unlocked! 🎉',
  description = 'Search for a ~5 minute YouTube video to watch.',
  placeholder = 'Search keywords (e.g., animal facts, space)',
  minDurationSec = 1 * 60,
  maxDurationSec = 10 * 60,
  className = '',
  resetOnHide = true,
}: YouTubeRewardProps) {
  const [ytQuery, setYtQuery] = useState('');
  const [ytLoading, setYtLoading] = useState(false);
  const [ytError, setYtError] = useState<string | null>(null);
  const [ytResults, setYtResults] = useState<YTVideo[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<YTVideo | null>(null);

  useEffect(() => {
    if (!visible && resetOnHide) {
      setYtQuery('');
      setYtLoading(false);
      setYtError(null);
      setYtResults([]);
      setSelectedVideo(null);
    }
  }, [visible, resetOnHide]);

  const handleVideoSelect = (video: YTVideo) => {
    setSelectedVideo(video);
  };

  const handleSearchYouTube = useCallback(async () => {
    try {
      setYtLoading(true);
      setYtError(null);
      setYtResults([]);
      setSelectedVideo(null);

      const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

      if (!apiKey) {
        setYtError('Missing YouTube API key. Set VITE_YOUTUBE_API_KEY (Vite)');
        setYtLoading(false);
        return;
      }

      if (!ytQuery.trim()) {
        setYtError('Please enter a search keyword.');
        setYtLoading(false);
        return;
      }

      const searchUrl = new URL('https://www.googleapis.com/youtube/v3/search');
      searchUrl.searchParams.set('part', 'snippet');
      searchUrl.searchParams.set('type', 'video');
      searchUrl.searchParams.set('maxResults', '15');
      searchUrl.searchParams.set('q', ytQuery.trim());
      searchUrl.searchParams.set('key', apiKey);

      const searchRes = await fetch(searchUrl.toString());
      if (!searchRes.ok) throw new Error('Failed to search YouTube.');
      const searchJson = await searchRes.json();

      const ids: string[] = (searchJson.items || [])
        .map((it: any) => it?.id?.videoId)
        .filter(Boolean);

      if (!ids.length) {
        setYtError('No results found. Try a different keyword.');
        setYtLoading(false);
        return;
      }

      const videosUrl = new URL('https://www.googleapis.com/youtube/v3/videos');
      videosUrl.searchParams.set('part', 'contentDetails,snippet');
      videosUrl.searchParams.set('id', ids.join(','));
      videosUrl.searchParams.set('key', apiKey);

      const videosRes = await fetch(videosUrl.toString());
      if (!videosRes.ok) throw new Error('Failed to load video details.');
      const videosJson = await videosRes.json();

      const candidates: YTVideo[] = (videosJson.items || [])
        .map((v: any) => {
          const seconds = parseDuration(v?.contentDetails?.duration || '');
          return {
            id: v?.id,
            title: v?.snippet?.title || 'Untitled',
            thumbnailUrl:
              v?.snippet?.thumbnails?.medium?.url ||
              v?.snippet?.thumbnails?.default?.url ||
              '',
            duration: formatDuration(seconds),
            seconds,
          };
        })
        .filter((v: YTVideo) => {
          return v.seconds >= minDurationSec && v.seconds <= maxDurationSec;
        })
        .sort(
          (a: YTVideo, b: YTVideo) =>
            Math.abs(a.seconds - (minDurationSec + maxDurationSec) / 2) -
            Math.abs(b.seconds - (minDurationSec + maxDurationSec) / 2)
        );

      if (!candidates.length) {
        setYtError(
          'Could not find a video in the requested duration. Try different keywords.'
        );
        setYtLoading(false);
        return;
      }

      setYtResults(candidates);
    } catch (err: any) {
      setYtError(
        err?.message || 'Something went wrong while searching YouTube.'
      );
    } finally {
      setYtLoading(false);
    }
  }, [ytQuery, minDurationSec, maxDurationSec]);

  if (!visible) return null;

  return (
    <Card
      className={className}
      sx={{
        borderRadius: '16px',
        bgcolor: 'rgba(76,175,80,0.08)',
        border: '2px solid rgba(76,175,80,0.3)',
        boxShadow: '0 4px 20px rgba(76,175,80,0.15)',
      }}
    >
      <CardContent>
        <Typography variant="h5" sx={{ color: '#a5d6a7', fontWeight: 'bold', mb: 1 }}>
          {title}
        </Typography>
        <Typography variant="body1" sx={{ color: '#90a4ae', mb: 2 }}>
          {description}
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
          <TextField
            label={placeholder}
            variant="outlined"
            value={ytQuery}
            onChange={e => setYtQuery(e.target.value)}
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                bgcolor: 'rgba(255,255,255,0.06)',
                color: '#fff',
                '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.4)' },
                '&.Mui-focused fieldset': { borderColor: '#66bb6a' },
              },
              '& .MuiInputLabel-root': { color: '#90a4ae' },
              '& .MuiInputLabel-root.Mui-focused': { color: '#66bb6a' },
            }}
          />
          <Button
            variant="contained"
            onClick={handleSearchYouTube}
            disabled={ytLoading}
            sx={{
              borderRadius: '20px',
              px: 3,
              py: 1.5,
              fontWeight: 'bold',
              bgcolor: '#4caf50',
              '&:hover': { bgcolor: '#388e3c' },
              textTransform: 'none',
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 12px rgba(76,175,80,0.3)',
            }}
          >
            {ytLoading ? 'Searching...' : '🔍 Search'}
          </Button>
        </Box>

        {ytError && (
          <Typography sx={{ color: '#ef9a9a', mb: 2 }}>
            {ytError}
          </Typography>
        )}

        {ytResults.length > 0 && !selectedVideo && (
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: 'bold', color: '#a5d6a7', mb: 2 }}>
              Choose a video to watch ({ytResults.length} found):
            </Typography>
            <Grid container spacing={2}>
              {ytResults.map(video => (
                <Grid key={video.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                  <Card
                    onClick={() => handleVideoSelect(video)}
                    sx={{
                      cursor: 'pointer',
                      borderRadius: '12px',
                      bgcolor: 'rgba(255,255,255,0.05)',
                      border: '2px solid transparent',
                      transition: 'all 0.2s',
                      '&:hover': {
                        border: '2px solid #64b5f6',
                        boxShadow: '0 4px 16px rgba(66,165,245,0.2)',
                        transform: 'scale(1.02)',
                      },
                    }}
                  >
                    <Box sx={{ position: 'relative' }}>
                      <img
                        src={video.thumbnailUrl}
                        alt={video.title}
                        style={{ width: '100%', height: '128px', objectFit: 'cover', borderRadius: '12px 12px 0 0' }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 4,
                          right: 4,
                          bgcolor: 'rgba(0,0,0,0.8)',
                          color: '#fff',
                          fontSize: '0.75rem',
                          px: 1,
                          borderRadius: '4px',
                        }}
                      >
                        {video.duration}
                      </Box>
                    </Box>
                    <CardContent sx={{ p: 1.5 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#cfd8dc',
                          fontSize: '0.85rem',
                          lineHeight: 1.3,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                        title={video.title}
                      >
                        {video.title}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {selectedVideo && (
          <Box sx={{ mt: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography sx={{ fontWeight: 'bold', color: '#a5d6a7' }}>
                {selectedVideo.title}
              </Typography>
              <Button
                variant="outlined"
                size="small"
                onClick={() => setSelectedVideo(null)}
                sx={{
                  borderRadius: '16px',
                  borderColor: 'rgba(255,255,255,0.2)',
                  color: '#b0bec5',
                  '&:hover': { borderColor: '#64b5f6', color: '#64b5f6' },
                }}
              >
                Choose Different Video
              </Button>
            </Box>
            <Box sx={{ aspectRatio: '16/9', maxWidth: '800px' }}>
              <iframe
                title={selectedVideo.title}
                style={{ width: '100%', height: '360px', maxWidth: '100%', borderRadius: '12px', border: 'none' }}
                src={`https://www.youtube.com/embed/${selectedVideo.id}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </Box>
            <Box sx={{ mt: 1 }}>
              <a
                style={{ color: '#64b5f6', textDecoration: 'underline' }}
                href={`https://www.youtube.com/watch?v=${selectedVideo.id}`}
                target="_blank"
                rel="noreferrer"
              >
                Open on YouTube
              </a>
            </Box>
          </Box>
        )}

        {!ytResults.length && !ytError && !ytLoading && (
          <Typography sx={{ color: '#78909c' }}>
            Tip: Try topics like "kids science", "nature facts", "math tricks".
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
