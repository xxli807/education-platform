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
  minDurationSec?: number; // default 1 min
  maxDurationSec?: number; // default 10 min
  className?: string;
  resetOnHide?: boolean; // default true
}

// Helper function to parse ISO 8601 duration (PT4M13S) to seconds
const parseDuration = (duration: string): number => {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;

  const hours = parseInt(match[1] || '0', 10);
  const minutes = parseInt(match[2] || '0', 10);
  const seconds = parseInt(match[3] || '0', 10);

  return hours * 3600 + minutes * 60 + seconds;
};

// Helper function to format seconds to readable duration
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

  // Reset internal state when hidden (for reuse in other sections)
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

      // Step 1: search for candidate videos
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

      // Step 2: fetch details to filter by duration window
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
          console.log(seconds);
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
          console.log(
            v.seconds +
              ' ' +
              v.duration +
              ' ' +
              minDurationSec +
              ' ' +
              maxDurationSec
          );
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
    <Card className={`bg-white border border-green-300 ${className}`}>
      <CardContent>
        <Typography variant="h5" className="!text-green-700 !font-bold mb-2">
          {title}
        </Typography>
        <Typography variant="body1" className="mb-3">
          {description}
        </Typography>

        <div className="flex gap-3 items-center mb-3">
          <TextField
            label={placeholder}
            variant="outlined"
            value={ytQuery}
            onChange={e => setYtQuery(e.target.value)}
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearchYouTube}
            disabled={ytLoading}
          >
            {ytLoading ? 'Searching...' : 'Search'}
          </Button>
        </div>

        {ytError && (
          <Typography variant="body2" className="!text-red-600 mb-2">
            {ytError}
          </Typography>
        )}

        {ytResults.length > 0 && !selectedVideo && (
          <div className="mt-3">
            <Typography variant="subtitle1" className="!font-semibold mb-3">
              Choose a video to watch ({ytResults.length} found):
            </Typography>
            <Grid container spacing={2}>
              {ytResults.map(video => (
                <Grid key={video.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                  <Card
                    className="cursor-pointer hover:shadow-lg transition-shadow border-2 border-transparent hover:border-blue-300"
                    onClick={() => handleVideoSelect(video)}
                  >
                    <Box className="relative">
                      <img
                        src={video.thumbnailUrl}
                        alt={video.title}
                        className="w-full h-32 object-cover"
                      />
                      <Box className="absolute bottom-1 right-1 bg-black bg-opacity-75 text-white text-xs px-1 rounded">
                        {video.duration}
                      </Box>
                    </Box>
                    <CardContent className="p-2">
                      <Typography
                        variant="body2"
                        className="!text-sm !leading-tight line-clamp-2"
                        title={video.title}
                      >
                        {video.title}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </div>
        )}

        {selectedVideo && (
          <div className="mt-3">
            <div className="flex items-center justify-between mb-2">
              <Typography variant="subtitle1" className="!font-semibold">
                {selectedVideo.title}
              </Typography>
              <Button
                variant="outlined"
                size="small"
                onClick={() => setSelectedVideo(null)}
              >
                Choose Different Video
              </Button>
            </div>
            <div className="aspect-video w-full max-w-[800px]">
              <iframe
                title={selectedVideo.title}
                className="w-full h-[360px] max-w-full"
                src={`https://www.youtube.com/embed/${selectedVideo.id}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <div className="mt-2">
              <a
                className="text-blue-600 underline"
                href={`https://www.youtube.com/watch?v=${selectedVideo.id}`}
                target="_blank"
                rel="noreferrer"
              >
                Open on YouTube
              </a>
            </div>
          </div>
        )}

        {!ytResults.length && !ytError && !ytLoading && (
          <Typography variant="body2" className="text-gray-600">
            Tip: Try topics like "kids science", "nature facts", "math tricks".
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
