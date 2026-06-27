import { palette, withAlpha } from '../theme/palette';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import HistoryIcon from '@mui/icons-material/History';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  LinearProgress,
  Tab,
  Tabs,
  TextareaAutosize,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import {
  generateWritingPrompts,
  getReadingsByYear,
  type WritingPrompt,
} from '../data/englishContent';
import {
  db,
  type ComprehensionAnswer,
  type WritingTask,
  type JournalEntry,
} from '../db/database';
import SectionContainer from './SectionContainer';
import ConfirmDeleteDialog from './ConfirmDeleteDialog';
import { formatSavedDateTime } from '../utils/formatDate';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const darkCard = {
  borderRadius: '16px',
  boxShadow: `0 4px 16px ${withAlpha(palette.black, 0.4)}`,
};

const darkTextField = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    bgcolor: withAlpha(palette.white, 0.06),
    color: palette.white,
    '& fieldset': { borderColor: withAlpha(palette.white, 0.2) },
    '&:hover fieldset': { borderColor: withAlpha(palette.white, 0.4) },
    '&.Mui-focused fieldset': { borderColor: palette.blue350 },
  },
  '& .MuiInputLabel-root': { color: palette.slate400 },
  '& .MuiInputLabel-root.Mui-focused': { color: palette.blue350 },
};

const darkButton = {
  borderRadius: '25px',
  px: 4,
  py: 1.5,
  fontSize: '1rem',
  fontWeight: 'bold',
  textTransform: 'none' as const,
};

function EnglishSection() {
  const [yearLevel, setYearLevel] = useState<2 | 3>(() => {
    const saved = localStorage.getItem('englishYearLevel');
    return saved ? (JSON.parse(saved) as 2 | 3) : 2;
  });
  const [currentPage, setCurrentPage] = useState(() => {
    const saved = localStorage.getItem('englishCurrentPage');
    return saved ? parseInt(saved) : 0;
  });
  const [activeTab, setActiveTab] = useState(() => {
    const saved = localStorage.getItem('englishActiveTab');
    return saved ? parseInt(saved) : 0;
  });
  const [comprehensionAnswers, setComprehensionAnswers] = useState<{
    [key: string]: string;
  }>(() => {
    const saved = localStorage.getItem('englishComprehensionAnswers');
    return saved ? JSON.parse(saved) : {};
  });
  const [writingResponses, setWritingResponses] = useState<{
    [key: string]: string;
  }>(() => {
    const saved = localStorage.getItem('englishWritingResponses');
    return saved ? JSON.parse(saved) : {};
  });
  const [vocabSentences, setVocabSentences] = useState<{
    [key: string]: string;
  }>(() => {
    const saved = localStorage.getItem('englishVocabSentences');
    return saved ? JSON.parse(saved) : {};
  });

  const [savedComprehensions, setSavedComprehensions] = useState<
    ComprehensionAnswer[]
  >([]);
  const [savedWritings, setSavedWritings] = useState<WritingTask[]>([]);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  // Journal state
  const MOODS = ['😄', '😊', '😐', '😢', '😴', '🤩', '😠', '🤒'];
  const today = new Date().toISOString().split('T')[0];
  const [journalDate, setJournalDate] = useState(today);
  const [journalMood, setJournalMood] = useState('😊');
  const [journalContent, setJournalContent] = useState('');
  const [savedJournals, setSavedJournals] = useState<JournalEntry[]>([]);
  const [journalStatus, setJournalStatus] = useState<
    'idle' | 'saved' | 'error'
  >('idle');
  const [deleteTarget, setDeleteTarget] = useState<JournalEntry | null>(null);
  const [deleteCompGroup, setDeleteCompGroup] = useState<
    ComprehensionAnswer[] | null
  >(null);
  const [deleteWriting, setDeleteWriting] = useState<WritingTask | null>(null);

  const userId = 'lucas';

  const readings = getReadingsByYear(yearLevel);
  const [writingTasks, setWritingTasks] = useState<WritingPrompt[]>(() =>
    generateWritingPrompts(yearLevel, 4)
  );

  const loadSavedData = async () => {
    try {
      const comprehensions = await db.comprehensionAnswers
        .where('userId')
        .equals(userId)
        .reverse()
        .sortBy('submittedAt');
      const writings = await db.writingTasks
        .where('userId')
        .equals(userId)
        .reverse()
        .sortBy('submittedAt');
      const journals = await db.journalEntries
        .where('userId')
        .equals(userId)
        .reverse()
        .sortBy('date');
      setSavedComprehensions(comprehensions);
      setSavedWritings(writings);
      setSavedJournals(journals);
    } catch (error) {
      console.error('Error loading saved data:', error);
    }
  };

  useEffect(() => {
    loadSavedData();
  }, []);

  useEffect(() => {
    localStorage.setItem('englishYearLevel', JSON.stringify(yearLevel));
  }, [yearLevel]);

  useEffect(() => {
    localStorage.setItem('englishCurrentPage', currentPage.toString());
  }, [currentPage]);

  useEffect(() => {
    localStorage.setItem('englishActiveTab', activeTab.toString());
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem(
      'englishComprehensionAnswers',
      JSON.stringify(comprehensionAnswers)
    );
  }, [comprehensionAnswers]);

  useEffect(() => {
    localStorage.setItem(
      'englishWritingResponses',
      JSON.stringify(writingResponses)
    );
  }, [writingResponses]);

  useEffect(() => {
    localStorage.setItem(
      'englishVocabSentences',
      JSON.stringify(vocabSentences)
    );
  }, [vocabSentences]);

  const saveJournal = async () => {
    if (!journalContent.trim()) {
      setJournalStatus('error');
      setTimeout(() => setJournalStatus('idle'), 2000);
      return;
    }
    try {
      // Update existing entry for the same date, or add new
      const existing = await db.journalEntries
        .where('date')
        .equals(journalDate)
        .and(e => e.userId === userId)
        .first();
      if (existing?.id) {
        await db.journalEntries.update(existing.id, {
          mood: journalMood,
          content: journalContent.trim(),
          savedAt: new Date(),
        });
      } else {
        await db.journalEntries.add({
          date: journalDate,
          mood: journalMood,
          content: journalContent.trim(),
          savedAt: new Date(),
          userId,
        });
      }
      setJournalStatus('saved');
      setTimeout(() => setJournalStatus('idle'), 2500);
      loadSavedData();
    } catch {
      setJournalStatus('error');
      setTimeout(() => setJournalStatus('idle'), 2000);
    }
  };

  // When user picks a past journal entry, load it into the editor
  const loadJournalEntry = (entry: JournalEntry) => {
    setJournalDate(entry.date);
    setJournalMood(entry.mood);
    setJournalContent(entry.content);
  };

  const confirmDelete = async () => {
    if (!deleteTarget?.id) return;
    await db.journalEntries.delete(deleteTarget.id);
    setDeleteTarget(null);
    loadSavedData();
  };

  const confirmDeleteCompGroup = async () => {
    if (!deleteCompGroup) return;
    const ids = deleteCompGroup
      .map(i => i.id)
      .filter((id): id is number => id !== undefined);
    await db.comprehensionAnswers.bulkDelete(ids);
    setDeleteCompGroup(null);
    loadSavedData();
  };

  const confirmDeleteWriting = async () => {
    if (!deleteWriting?.id) return;
    await db.writingTasks.delete(deleteWriting.id);
    setDeleteWriting(null);
    loadSavedData();
  };

  const handleYearChange = useCallback(
    (_: React.MouseEvent<HTMLElement>, newYear: (2 | 3) | null) => {
      if (newYear) {
        setYearLevel(newYear);
        setCurrentPage(0);
        setComprehensionAnswers({});
        setVocabSentences({});
        setWritingTasks(generateWritingPrompts(newYear, 4));
        localStorage.removeItem('englishComprehensionAnswers');
        localStorage.removeItem('englishVocabSentences');
      }
    },
    []
  );

  const handleNextPage = useCallback(() => {
    setCurrentPage(prev => (prev + 1) % readings.length);
  }, [readings.length]);

  const handlePreviousPage = useCallback(() => {
    setCurrentPage(prev => (prev - 1 + readings.length) % readings.length);
  }, [readings.length]);

  const handleTabChange = useCallback(
    (_: React.SyntheticEvent, newValue: number) => {
      setActiveTab(newValue);
    },
    []
  );

  const handleComprehensionAnswer = useCallback(
    (questionIndex: number, value: string) => {
      const key = `${yearLevel}-${currentPage}-${questionIndex}`;
      setComprehensionAnswers(prev => ({ ...prev, [key]: value }));
    },
    [currentPage, yearLevel]
  );

  const handleWritingResponse = useCallback(
    (taskIndex: number, value: string) => {
      setWritingResponses(prev => ({
        ...prev,
        [`${yearLevel}-${taskIndex}`]: value,
      }));
    },
    [yearLevel]
  );

  const handleVocabSentence = useCallback(
    (wordIndex: number, value: string) => {
      const key = `${yearLevel}-${currentPage}-vocab-${wordIndex}`;
      setVocabSentences(prev => ({ ...prev, [key]: value }));
    },
    [currentPage, yearLevel]
  );

  const submitComprehensionAnswers = async () => {
    try {
      const currentStory = readings[currentPage];
      const answersToSave: Omit<ComprehensionAnswer, 'id'>[] = [];

      currentStory.comprehensionQuestions.forEach((question, index) => {
        const key = `${yearLevel}-${currentPage}-${index}`;
        const answer = comprehensionAnswers[key];

        if (answer && answer.trim()) {
          answersToSave.push({
            storyIndex: currentPage,
            questionIndex: index,
            question,
            answer: answer.trim(),
            storyTitle: currentStory.title,
            submittedAt: new Date(),
            userId,
          });
        }
      });

      if (answersToSave.length === 0) {
        setSubmitStatus({
          type: 'error',
          message: 'Please answer at least one question before submitting.',
        });
        return;
      }

      await db.comprehensionAnswers.bulkAdd(answersToSave);

      setSubmitStatus({
        type: 'success',
        message: `Awesome! Saved ${answersToSave.length} answers! Keep reading! 📚`,
      });

      await loadSavedData();
    } catch (error) {
      console.error('Error saving comprehension answers:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Failed to save answers. Please try again.',
      });
    }

    setTimeout(() => setSubmitStatus({ type: null, message: '' }), 3000);
  };

  const submitWritingTask = async (taskIndex: number) => {
    try {
      const response = writingResponses[`${yearLevel}-${taskIndex}`];
      if (!response || !response.trim()) {
        setSubmitStatus({
          type: 'error',
          message: 'Please write a response before submitting.',
        });
        return;
      }

      const task = writingTasks[taskIndex];
      await db.writingTasks.add({
        taskIndex,
        prompt: task.prompt,
        response: response.trim(),
        submittedAt: new Date(),
        userId,
      });

      setWritingResponses(prev => ({
        ...prev,
        [`${yearLevel}-${taskIndex}`]: '',
      }));

      setSubmitStatus({
        type: 'success',
        message: 'Great writing! Your story has been saved! ✍️🌟',
      });

      await loadSavedData();
    } catch (error) {
      console.error('Error saving writing task:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Failed to save writing task. Please try again.',
      });
    }

    setTimeout(() => setSubmitStatus({ type: null, message: '' }), 3000);
  };

  const progress =
    readings.length > 0 ? ((currentPage + 1) / readings.length) * 100 : 0;
  const currentStory = readings[currentPage];

  return (
    <SectionContainer name="English">
      {/* Year Level Selector */}
      <Box sx={{ mb: 3, textAlign: 'center' }}>
        <Typography
          variant="h6"
          sx={{ mb: 1, color: palette.indigo25, fontWeight: 'bold' }}
        >
          🎓 Choose Your Year Level
        </Typography>
        <ToggleButtonGroup
          value={yearLevel}
          exclusive
          onChange={handleYearChange}
          sx={{
            '& .MuiToggleButton-root': {
              borderRadius: '20px !important',
              px: 4,
              py: 1,
              mx: 0.5,
              fontWeight: 'bold',
              fontSize: '1rem',
              border: `2px solid ${withAlpha(palette.white, 0.2)} !important`,
              color: palette.slate200,
              '&:hover': { bgcolor: withAlpha(palette.white, 0.08) },
            },
          }}
        >
          <ToggleButton
            value={2}
            sx={{
              '&.Mui-selected': {
                bgcolor: `${withAlpha(palette.blue425, 0.2)} !important`,
                color: `${palette.blue350} !important`,
                borderColor: `${palette.blue425} !important`,
              },
            }}
          >
            ⭐ Year 2
          </ToggleButton>
          <ToggleButton
            value={3}
            sx={{
              '&.Mui-selected': {
                bgcolor: `${withAlpha(palette.purple550, 0.2)} !important`,
                color: `${palette.purple225} !important`,
                borderColor: `${palette.purple225} !important`,
              },
            }}
          >
            🌟 Year 3
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Status Alert */}
      {submitStatus.type && (
        <Alert
          severity={submitStatus.type}
          sx={{ mb: 2, borderRadius: '12px', fontSize: '1rem' }}
          onClose={() => setSubmitStatus({ type: null, message: '' })}
        >
          {submitStatus.message}
        </Alert>
      )}

      <Card
        sx={{
          ...darkCard,
          mb: 3,
          bgcolor: withAlpha(palette.white, 0.04),
          border: `2px solid ${withAlpha(palette.white, 0.1)}`,
        }}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          centered
          sx={{
            '& .MuiTab-root': {
              fontSize: '1.1rem',
              fontWeight: 'bold',
              textTransform: 'none',
              py: 2,
              color: palette.slate575,
            },
            '& .Mui-selected': {
              color: `${palette.blue350} !important`,
            },
            '& .MuiTabs-indicator': {
              bgcolor: palette.blue350,
            },
          }}
        >
          <Tab label="📚 Reading" />
          <Tab label="✍️ Writing" />
          <Tab label="📔 My Journal" />
          <Tab
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <HistoryIcon fontSize="small" />
                History
              </Box>
            }
          />
        </Tabs>
      </Card>

      {/* Reading Tab */}
      <TabPanel value={activeTab} index={0}>
        {currentStory && (
          <>
            {/* Progress Bar */}
            <Box sx={{ mb: 3 }}>
              <Typography
                sx={{ color: palette.blue350, fontWeight: 'bold', mb: 1 }}
              >
                📖 Story {currentPage + 1} of {readings.length}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  height: 10,
                  borderRadius: 5,
                  bgcolor: withAlpha(palette.white, 0.08),
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: palette.blue350,
                    borderRadius: 5,
                  },
                }}
              />
            </Box>

            {/* Reading Card */}
            <Card
              sx={{
                ...darkCard,
                mb: 3,
                bgcolor: withAlpha(palette.white, 0.05),
                border: `2px solid ${withAlpha(palette.blue425, 0.3)}`,
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography
                  variant="h4"
                  sx={{
                    color: palette.indigo25,
                    fontWeight: 'bold',
                    mb: 3,
                    textAlign: 'center',
                  }}
                >
                  {currentStory.title}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: palette.slate25,
                    fontSize: '1.15rem',
                    lineHeight: 2,
                    mb: 3,
                    fontFamily: 'Georgia, serif',
                  }}
                >
                  {currentStory.text}
                </Typography>

                {/* Vocabulary Section */}
                {currentStory.vocabulary &&
                  currentStory.vocabulary.length > 0 && (
                    <Card
                      sx={{
                        ...darkCard,
                        bgcolor: withAlpha(palette.green425, 0.08),
                        border: `2px solid ${withAlpha(palette.green425, 0.3)}`,
                        mb: 3,
                      }}
                    >
                      <CardContent>
                        <Typography
                          variant="h6"
                          sx={{
                            color: palette.green125,
                            fontWeight: 'bold',
                            mb: 2,
                          }}
                        >
                          📝 Vocabulary Challenge
                        </Typography>
                        {currentStory.vocabulary.map((vocab, index) => (
                          <Box
                            key={index}
                            sx={{
                              mb: 3,
                              p: 2,
                              bgcolor: withAlpha(palette.white, 0.03),
                              borderRadius: '12px',
                              border: `1px solid ${withAlpha(palette.green425, 0.2)}`,
                            }}
                          >
                            <Typography
                              sx={{
                                fontWeight: 'bold',
                                color: palette.green125,
                                fontSize: '1.1rem',
                              }}
                            >
                              🔤 {vocab.word}
                            </Typography>
                            <Typography
                              sx={{
                                color: palette.slate400,
                                mb: 1.5,
                                fontStyle: 'italic',
                              }}
                            >
                              Meaning: {vocab.definition}
                            </Typography>
                            <TextField
                              fullWidth
                              size="small"
                              value={
                                vocabSentences[
                                  `${yearLevel}-${currentPage}-vocab-${index}`
                                ] || ''
                              }
                              onChange={e =>
                                handleVocabSentence(index, e.target.value)
                              }
                              placeholder={`Write a sentence using the word "${vocab.word}"...`}
                              sx={darkTextField}
                            />
                          </Box>
                        ))}
                      </CardContent>
                    </Card>
                  )}

                {/* Comprehension Questions */}
                <Card
                  sx={{
                    ...darkCard,
                    bgcolor: withAlpha(palette.orange450, 0.08),
                    border: `2px solid ${withAlpha(palette.orange450, 0.3)}`,
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{
                        color: palette.orange150,
                        fontWeight: 'bold',
                        mb: 2,
                      }}
                    >
                      🤔 Comprehension Questions
                    </Typography>
                    {currentStory.comprehensionQuestions.map(
                      (question, index) => (
                        <Box key={index} sx={{ mb: 3 }}>
                          <Typography
                            sx={{
                              color: palette.orange200,
                              mb: 1,
                              fontWeight: 'bold',
                              fontSize: '1rem',
                            }}
                          >
                            {index + 1}. {question}
                          </Typography>
                          <TextField
                            fullWidth
                            multiline
                            rows={2}
                            value={
                              comprehensionAnswers[
                                `${yearLevel}-${currentPage}-${index}`
                              ] || ''
                            }
                            onChange={e =>
                              handleComprehensionAnswer(index, e.target.value)
                            }
                            placeholder="Write your answer here..."
                            variant="outlined"
                            size="small"
                            sx={darkTextField}
                          />
                        </Box>
                      )
                    )}

                    <Box sx={{ textAlign: 'center', mt: 2 }}>
                      <Button
                        onClick={submitComprehensionAnswers}
                        variant="contained"
                        sx={{
                          ...darkButton,
                          bgcolor: palette.green425,
                          '&:hover': { bgcolor: palette.green575 },
                          boxShadow: `0 4px 15px ${withAlpha(palette.green425, 0.3)}`,
                        }}
                      >
                        ✅ Submit Answers
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Button
                onClick={handlePreviousPage}
                variant="contained"
                startIcon={<ArrowBackIosIcon />}
                sx={{
                  ...darkButton,
                  bgcolor: palette.purple625,
                  '&:hover': { bgcolor: palette.purple675 },
                  boxShadow: `0 4px 15px ${withAlpha(palette.purple625, 0.3)}`,
                }}
              >
                Previous Story
              </Button>

              <Typography
                variant="h6"
                sx={{ color: palette.indigo25, fontWeight: 'bold' }}
              >
                📚 Reading Collection
              </Typography>

              <Button
                onClick={handleNextPage}
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  ...darkButton,
                  bgcolor: palette.pink950,
                  '&:hover': { bgcolor: palette.magenta950 },
                  boxShadow: `0 4px 15px ${withAlpha(palette.pink950, 0.3)}`,
                }}
              >
                Next Story
              </Button>
            </Box>
          </>
        )}
      </TabPanel>

      {/* Writing Tab */}
      <TabPanel value={activeTab} index={1}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 3,
          }}
        >
          <Typography
            variant="h5"
            sx={{ color: palette.indigo25, fontWeight: 'bold' }}
          >
            ✍️ Creative Writing Tasks
          </Typography>
          <Button
            variant="outlined"
            onClick={() =>
              setWritingTasks(generateWritingPrompts(yearLevel, 4))
            }
            sx={{
              borderRadius: '20px',
              px: 3,
              fontWeight: 'bold',
              textTransform: 'none',
              borderColor: withAlpha(palette.indigo25, 0.4),
              color: palette.indigo25,
              '&:hover': {
                borderColor: palette.indigo25,
                bgcolor: withAlpha(palette.indigo25, 0.08),
              },
            }}
          >
            🔄 New Prompts
          </Button>
        </Box>
        {writingTasks.map((task: WritingPrompt, index: number) => (
          <Card
            key={index}
            sx={{
              ...darkCard,
              mb: 3,
              bgcolor: withAlpha(palette.white, 0.05),
              border: `2px solid ${withAlpha(palette.blue425, 0.25)}`,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box
                sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}
              >
                <Chip
                  label={task.genre}
                  size="small"
                  sx={{
                    bgcolor: withAlpha(palette.indigo25, 0.15),
                    color: palette.indigo25,
                    fontWeight: 'bold',
                    fontSize: '0.8rem',
                  }}
                />
              </Box>
              <Typography
                variant="h6"
                sx={{
                  color: palette.slate25,
                  fontWeight: 'bold',
                  mb: 2,
                  fontSize: '1.05rem',
                  lineHeight: 1.5,
                }}
              >
                {task.prompt}
              </Typography>
              <TextareaAutosize
                minRows={4}
                maxRows={10}
                value={writingResponses[`${yearLevel}-${index}`] || ''}
                onChange={e => handleWritingResponse(index, e.target.value)}
                placeholder="Let your imagination flow! Write your story here..."
                style={{
                  width: '100%',
                  fontFamily: 'inherit',
                  fontSize: '1rem',
                  lineHeight: '1.8',
                  padding: '12px 16px',
                  border: `2px solid ${withAlpha(palette.white, 0.15)}`,
                  borderRadius: '12px',
                  backgroundColor: withAlpha(palette.white, 0.04),
                  color: palette.gray400,
                  resize: 'vertical',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
              <Box sx={{ mt: 2 }}>
                <Button
                  onClick={() => submitWritingTask(index)}
                  variant="contained"
                  sx={{
                    ...darkButton,
                    bgcolor: palette.blue825,
                    '&:hover': { bgcolor: palette.blue875 },
                    boxShadow: `0 4px 15px ${withAlpha(palette.blue825, 0.3)}`,
                  }}
                >
                  📤 Submit Writing
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </TabPanel>

      {/* Journal Tab */}
      <TabPanel value={activeTab} index={2}>
        <Typography
          variant="h5"
          sx={{
            color: palette.pink325,
            fontWeight: 'bold',
            mb: 3,
            textAlign: 'center',
          }}
        >
          📔 My Daily Journal
        </Typography>

        {/* Editor card */}
        <Card
          sx={{
            ...darkCard,
            mb: 3,
            bgcolor: withAlpha(palette.white, 0.05),
            border: `2px solid ${withAlpha(palette.pink325, 0.35)}`,
          }}
        >
          <CardContent sx={{ p: 3 }}>
            {/* Date + Mood row */}
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                mb: 3,
                flexWrap: 'wrap',
                alignItems: 'flex-start',
              }}
            >
              <TextField
                type="date"
                label="Date"
                value={journalDate}
                onChange={e => setJournalDate(e.target.value)}
                size="small"
                slotProps={{ inputLabel: { shrink: true } }}
                sx={{
                  flex: '0 0 auto',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    bgcolor: withAlpha(palette.white, 0.06),
                    color: palette.white,
                    colorScheme: 'dark',
                    '& fieldset': {
                      borderColor: withAlpha(palette.pink325, 0.3),
                    },
                    '&:hover fieldset': {
                      borderColor: withAlpha(palette.pink325, 0.6),
                    },
                    '&.Mui-focused fieldset': { borderColor: palette.pink325 },
                  },
                  '& .MuiInputLabel-root': { color: palette.slate400 },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: palette.pink325,
                  },
                }}
              />
              <Box>
                <Typography
                  sx={{ color: palette.slate400, fontSize: '0.82rem', mb: 0.5 }}
                >
                  How are you feeling?
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {MOODS.map(m => (
                    <Box
                      key={m}
                      onClick={() => setJournalMood(m)}
                      sx={{
                        fontSize: '1.8rem',
                        cursor: 'pointer',
                        borderRadius: '10px',
                        p: 0.5,
                        border:
                          journalMood === m
                            ? `2px solid ${palette.pink325}`
                            : '2px solid transparent',
                        bgcolor:
                          journalMood === m
                            ? withAlpha(palette.pink325, 0.15)
                            : 'transparent',
                        transition: 'all 0.15s',
                        '&:hover': { bgcolor: withAlpha(palette.pink325, 0.1) },
                      }}
                    >
                      {m}
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>

            {/* Writing area */}
            <Typography
              sx={{ color: palette.pink325, fontWeight: 'bold', mb: 1 }}
            >
              {journalMood} What happened today?
            </Typography>
            <TextareaAutosize
              minRows={6}
              maxRows={16}
              value={journalContent}
              onChange={e => setJournalContent(e.target.value)}
              placeholder="Write about your day... What did you do? Who did you see? How did you feel?"
              style={{
                width: '100%',
                fontFamily: 'inherit',
                fontSize: '1.05rem',
                lineHeight: '1.9',
                padding: '14px 16px',
                border: `2px solid ${withAlpha(palette.pink325, 0.25)}`,
                borderRadius: '12px',
                backgroundColor: withAlpha(palette.white, 0.04),
                color: palette.gray400,
                resize: 'vertical',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />

            {/* Save button + feedback */}
            <Box
              sx={{
                mt: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                flexWrap: 'wrap',
              }}
            >
              <Button
                variant="contained"
                onClick={saveJournal}
                sx={{
                  ...darkButton,
                  background: `linear-gradient(135deg, ${palette.magenta650}, ${palette.purple550})`,
                  '&:hover': {
                    background: `linear-gradient(135deg, ${palette.magenta950}, ${palette.purple625})`,
                  },
                  boxShadow: `0 4px 15px ${withAlpha(palette.magenta650, 0.35)}`,
                }}
              >
                💾 Save Journal Entry
              </Button>
              {journalStatus === 'saved' && (
                <Typography
                  sx={{ color: palette.green125, fontWeight: 'bold' }}
                >
                  ✅ Saved!
                </Typography>
              )}
              {journalStatus === 'error' && (
                <Typography sx={{ color: palette.red125, fontWeight: 'bold' }}>
                  ⚠️ Please write something first.
                </Typography>
              )}
            </Box>
          </CardContent>
        </Card>

        {/* Past entries */}
        {savedJournals.length > 0 && (
          <>
            <Typography
              variant="h6"
              sx={{ color: palette.pink325, fontWeight: 'bold', mb: 2 }}
            >
              📅 Past Entries ({savedJournals.length})
            </Typography>
            {savedJournals.map(entry => (
              <Card
                key={entry.id}
                sx={{
                  ...darkCard,
                  mb: 2,
                  bgcolor: withAlpha(palette.pink325, 0.07),
                  border: `1px solid ${withAlpha(palette.pink325, 0.25)}`,
                }}
              >
                <CardContent sx={{ py: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: 1,
                      gap: 1,
                      flexWrap: 'wrap',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography sx={{ fontSize: '1.5rem' }}>
                        {entry.mood}
                      </Typography>
                      <Typography
                        sx={{ fontWeight: 'bold', color: palette.pink325 }}
                      >
                        {new Date(entry.date + 'T12:00:00').toLocaleDateString(
                          'en-AU',
                          {
                            weekday: 'short',
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          }
                        )}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Chip
                        label="✏️ Edit"
                        size="small"
                        onClick={() => loadJournalEntry(entry)}
                        sx={{
                          bgcolor: withAlpha(palette.pink325, 0.2),
                          color: palette.pink325,
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          '&:hover': {
                            bgcolor: withAlpha(palette.pink325, 0.35),
                          },
                        }}
                      />
                      <Chip
                        label="🗑️ Delete"
                        size="small"
                        onClick={() => setDeleteTarget(entry)}
                        sx={{
                          bgcolor: withAlpha(palette.red425, 0.15),
                          color: palette.red125,
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          '&:hover': {
                            bgcolor: withAlpha(palette.red425, 0.3),
                          },
                        }}
                      />
                    </Box>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{
                      color: palette.slate200,
                      whiteSpace: 'pre-wrap',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {entry.content}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </>
        )}

        {/* Delete confirmation dialog */}
        <Dialog
          open={!!deleteTarget}
          onClose={() => setDeleteTarget(null)}
          PaperProps={{
            sx: {
              bgcolor: palette.navy575,
              border: `2px solid ${withAlpha(palette.red425, 0.5)}`,
              borderRadius: '16px',
              color: palette.gray400,
              minWidth: 300,
            },
          }}
        >
          <DialogTitle
            sx={{ color: palette.red125, fontWeight: 'bold', pb: 1 }}
          >
            🗑️ Delete Journal Entry?
          </DialogTitle>
          <DialogContent>
            <Typography sx={{ color: palette.slate200 }}>
              Are you sure you want to delete the entry from{' '}
              <strong style={{ color: palette.pink325 }}>
                {deleteTarget
                  ? new Date(
                      deleteTarget.date + 'T12:00:00'
                    ).toLocaleDateString('en-AU', {
                      weekday: 'short',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })
                  : ''}
              </strong>
              ? This cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
            <Button
              onClick={() => setDeleteTarget(null)}
              sx={{
                borderRadius: '20px',
                textTransform: 'none',
                fontWeight: 'bold',
                color: palette.slate400,
                border: `1px solid ${withAlpha(palette.slate400, 0.3)}`,
                '&:hover': { bgcolor: withAlpha(palette.slate400, 0.1) },
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={confirmDelete}
              variant="contained"
              sx={{
                borderRadius: '20px',
                textTransform: 'none',
                fontWeight: 'bold',
                bgcolor: palette.red550,
                '&:hover': { bgcolor: palette.red650 },
                boxShadow: `0 4px 12px ${withAlpha(palette.red550, 0.4)}`,
              }}
            >
              Yes, Delete
            </Button>
          </DialogActions>
        </Dialog>
      </TabPanel>

      {/* History Tab */}
      <TabPanel value={activeTab} index={3}>
        <Typography
          variant="h5"
          sx={{
            color: palette.indigo25,
            fontWeight: 'bold',
            mb: 3,
            textAlign: 'center',
          }}
        >
          📊 Your Learning History
        </Typography>

        {/* Comprehension History — grouped by story + date */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h6"
            sx={{ color: palette.blue350, fontWeight: 'bold', mb: 2 }}
          >
            📖 Reading Comprehension
          </Typography>
          {savedComprehensions.length === 0 ? (
            <Typography
              sx={{ color: palette.slate575, textAlign: 'center', py: 2 }}
            >
              No comprehension answers yet. Start reading to fill this up! 📚
            </Typography>
          ) : (
            (() => {
              // Group by storyTitle + date (day)
              const groups: {
                key: string;
                title: string;
                ts: Date | string;
                items: ComprehensionAnswer[];
              }[] = [];
              savedComprehensions.forEach(item => {
                const dateStr = new Date(item.submittedAt).toLocaleDateString(
                  'en-AU',
                  { day: 'numeric', month: 'short', year: 'numeric' }
                );
                const key = `${item.storyTitle}__${dateStr}`;
                const existing = groups.find(g => g.key === key);
                if (existing) {
                  existing.items.push(item);
                } else {
                  groups.push({
                    key,
                    title: item.storyTitle,
                    ts: item.submittedAt,
                    items: [item],
                  });
                }
              });
              return groups.map(group => (
                <Card
                  key={group.key}
                  sx={{
                    ...darkCard,
                    mb: 2,
                    bgcolor: withAlpha(palette.blue425, 0.06),
                    border: `2px solid ${withAlpha(palette.blue425, 0.2)}`,
                  }}
                >
                  <CardContent sx={{ py: 2 }}>
                    {/* Session header */}
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 1.5,
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 'bold',
                          color: palette.indigo25,
                          fontSize: '1rem',
                        }}
                      >
                        📖 {group.title}
                      </Typography>
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                      >
                        <Chip
                          label={formatSavedDateTime(group.ts)}
                          size="small"
                          sx={{
                            bgcolor: withAlpha(palette.blue425, 0.2),
                            color: palette.blue150,
                            fontWeight: 'bold',
                          }}
                        />
                        <Button
                          size="small"
                          onClick={() => setDeleteCompGroup(group.items)}
                          sx={{
                            borderRadius: '10px',
                            textTransform: 'none',
                            fontWeight: 'bold',
                            fontSize: '0.72rem',
                            color: palette.slate575,
                            border: `1px solid ${withAlpha(palette.slate575, 0.3)}`,
                            px: 1,
                            py: 0.3,
                            minWidth: 0,
                            '&:hover': {
                              bgcolor: withAlpha(palette.red425, 0.1),
                              color: palette.red125,
                              borderColor: palette.red425,
                            },
                          }}
                        >
                          🗑️ Delete
                        </Button>
                      </Box>
                    </Box>
                    {/* All Q&A pairs */}
                    <Box
                      sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
                    >
                      {group.items
                        .sort((a, b) => a.questionIndex - b.questionIndex)
                        .map(item => (
                          <Box
                            key={item.id}
                            sx={{
                              p: 1.2,
                              borderRadius: '10px',
                              bgcolor: withAlpha(palette.blue425, 0.08),
                              border: `1px solid ${withAlpha(palette.blue425, 0.15)}`,
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{
                                color: palette.slate575,
                                mb: 0.4,
                                fontSize: '0.78rem',
                                textTransform: 'uppercase',
                                letterSpacing: 0.4,
                              }}
                            >
                              Question {item.questionIndex + 1}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                color: palette.blue150,
                                mb: 0.6,
                                fontStyle: 'italic',
                              }}
                            >
                              {item.question}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ color: palette.slate25, fontWeight: 600 }}
                            >
                              💬 {item.answer}
                            </Typography>
                          </Box>
                        ))}
                    </Box>
                  </CardContent>
                </Card>
              ));
            })()
          )}
        </Box>

        {/* Writing History */}
        <Box>
          <Typography
            variant="h6"
            sx={{ color: palette.green125, fontWeight: 'bold', mb: 2 }}
          >
            ✍️ Writing Tasks
          </Typography>
          {savedWritings.length === 0 ? (
            <Typography
              sx={{ color: palette.slate575, textAlign: 'center', py: 2 }}
            >
              No writing tasks yet. Time to get creative! ✍️
            </Typography>
          ) : (
            savedWritings.map((item, idx) => (
              <Card
                key={item.id}
                sx={{
                  ...darkCard,
                  mb: 2,
                  bgcolor: withAlpha(palette.green425, 0.06),
                  border: `2px solid ${withAlpha(palette.green425, 0.2)}`,
                }}
              >
                <CardContent sx={{ py: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: 1.2,
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 'bold',
                        color: palette.green125,
                        fontSize: '0.95rem',
                      }}
                    >
                      ✍️ Writing #{savedWritings.length - idx}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Chip
                        label={formatSavedDateTime(item.submittedAt)}
                        size="small"
                        sx={{
                          bgcolor: withAlpha(palette.green425, 0.2),
                          color: palette.green125,
                          fontWeight: 'bold',
                        }}
                      />
                      <Button
                        size="small"
                        onClick={() => setDeleteWriting(item)}
                        sx={{
                          borderRadius: '10px',
                          textTransform: 'none',
                          fontWeight: 'bold',
                          fontSize: '0.72rem',
                          color: palette.slate575,
                          border: `1px solid ${withAlpha(palette.slate575, 0.3)}`,
                          px: 1,
                          py: 0.3,
                          minWidth: 0,
                          '&:hover': {
                            bgcolor: withAlpha(palette.red425, 0.1),
                            color: palette.red125,
                            borderColor: palette.red425,
                          },
                        }}
                      >
                        🗑️ Delete
                      </Button>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      p: 1.2,
                      borderRadius: '10px',
                      bgcolor: withAlpha(palette.green425, 0.08),
                      border: `1px solid ${withAlpha(palette.green425, 0.15)}`,
                      mb: 1,
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: palette.slate575,
                        mb: 0.3,
                        fontSize: '0.78rem',
                        textTransform: 'uppercase',
                        letterSpacing: 0.4,
                      }}
                    >
                      Prompt
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: palette.green250, fontStyle: 'italic' }}
                    >
                      {item.prompt}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      p: 1.2,
                      borderRadius: '10px',
                      bgcolor: withAlpha(palette.white, 0.04),
                      border: `1px solid ${withAlpha(palette.white, 0.08)}`,
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: palette.slate575,
                        mb: 0.3,
                        fontSize: '0.78rem',
                        textTransform: 'uppercase',
                        letterSpacing: 0.4,
                      }}
                    >
                      Lucas's response
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: palette.slate25, lineHeight: 1.7 }}
                    >
                      {item.response}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))
          )}
        </Box>
      </TabPanel>
      <ConfirmDeleteDialog
        open={!!deleteCompGroup}
        description={
          deleteCompGroup
            ? `Delete all ${deleteCompGroup.length} answer(s) for "${deleteCompGroup[0]?.storyTitle}"? This cannot be undone.`
            : undefined
        }
        onConfirm={confirmDeleteCompGroup}
        onCancel={() => setDeleteCompGroup(null)}
      />
      <ConfirmDeleteDialog
        open={!!deleteWriting}
        description={
          deleteWriting
            ? `Delete this writing task from ${new Date(deleteWriting.submittedAt).toLocaleDateString()}? This cannot be undone.`
            : undefined
        }
        onConfirm={confirmDeleteWriting}
        onCancel={() => setDeleteWriting(null)}
      />
    </SectionContainer>
  );
}

export default EnglishSection;
