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
import { db, type ComprehensionAnswer, type WritingTask } from '../db/database';
import SectionContainer from './SectionContainer';

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
  boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
};

const darkTextField = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    bgcolor: 'rgba(255,255,255,0.06)',
    color: '#fff',
    '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.4)' },
    '&.Mui-focused fieldset': { borderColor: '#64b5f6' },
  },
  '& .MuiInputLabel-root': { color: '#90a4ae' },
  '& .MuiInputLabel-root.Mui-focused': { color: '#64b5f6' },
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
  const [yearLevel, setYearLevel] = useState<2 | 3>(2);
  const [currentPage, setCurrentPage] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [comprehensionAnswers, setComprehensionAnswers] = useState<{
    [key: string]: string;
  }>({});
  const [writingResponses, setWritingResponses] = useState<{
    [key: string]: string;
  }>({});
  const [vocabSentences, setVocabSentences] = useState<{
    [key: string]: string;
  }>({});

  const [savedComprehensions, setSavedComprehensions] = useState<
    ComprehensionAnswer[]
  >([]);
  const [savedWritings, setSavedWritings] = useState<WritingTask[]>([]);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const userId = 'lucas';

  const readings = getReadingsByYear(yearLevel);
  const [writingTasks, setWritingTasks] = useState<WritingPrompt[]>(() => generateWritingPrompts(2, 4));

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

      setSavedComprehensions(comprehensions);
      setSavedWritings(writings);
    } catch (error) {
      console.error('Error loading saved data:', error);
    }
  };

  useEffect(() => {
    loadSavedData();
  }, []);

  const handleYearChange = useCallback(
    (_: React.MouseEvent<HTMLElement>, newYear: (2 | 3) | null) => {
      if (newYear) {
        setYearLevel(newYear);
        setCurrentPage(0);
        setComprehensionAnswers({});
        setVocabSentences({});
        setWritingTasks(generateWritingPrompts(newYear, 4));
      }
    },
    []
  );

  const handleNextPage = useCallback(() => {
    setCurrentPage(prev => (prev + 1) % readings.length);
  }, [readings.length]);

  const handlePreviousPage = useCallback(() => {
    setCurrentPage(
      prev => (prev - 1 + readings.length) % readings.length
    );
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
      setWritingResponses(prev => ({ ...prev, [`${yearLevel}-${taskIndex}`]: value }));
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

      const clearedAnswers = { ...comprehensionAnswers };
      currentStory.comprehensionQuestions.forEach((_, index) => {
        delete clearedAnswers[`${yearLevel}-${currentPage}-${index}`];
      });
      setComprehensionAnswers(clearedAnswers);

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

      setWritingResponses(prev => ({ ...prev, [`${yearLevel}-${taskIndex}`]: '' }));

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

  const progress = readings.length > 0 ? ((currentPage + 1) / readings.length) * 100 : 0;
  const currentStory = readings[currentPage];

  return (
    <SectionContainer name="English">
      {/* Year Level Selector */}
      <Box sx={{ mb: 3, textAlign: 'center' }}>
        <Typography variant="h6" sx={{ mb: 1, color: '#82b1ff', fontWeight: 'bold' }}>
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
              border: '2px solid rgba(255,255,255,0.2) !important',
              color: '#b0bec5',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' },
            },
          }}
        >
          <ToggleButton
            value={2}
            sx={{
              '&.Mui-selected': { bgcolor: 'rgba(66,165,245,0.2) !important', color: '#64b5f6 !important', borderColor: '#42a5f5 !important' },
            }}
          >
            ⭐ Year 2
          </ToggleButton>
          <ToggleButton
            value={3}
            sx={{
              '&.Mui-selected': { bgcolor: 'rgba(156,39,176,0.2) !important', color: '#ce93d8 !important', borderColor: '#ce93d8 !important' },
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

      <Card sx={{ ...darkCard, mb: 3, bgcolor: 'rgba(255,255,255,0.04)', border: '2px solid rgba(255,255,255,0.1)' }}>
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
              color: '#78909c',
            },
            '& .Mui-selected': {
              color: '#64b5f6 !important',
            },
            '& .MuiTabs-indicator': {
              bgcolor: '#64b5f6',
            },
          }}
        >
          <Tab label="📚 Reading" />
          <Tab label="✍️ Writing" />
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
              <Typography sx={{ color: '#64b5f6', fontWeight: 'bold', mb: 1 }}>
                📖 Story {currentPage + 1} of {readings.length}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  height: 10,
                  borderRadius: 5,
                  bgcolor: 'rgba(255,255,255,0.08)',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#64b5f6',
                    borderRadius: 5,
                  },
                }}
              />
            </Box>

            {/* Reading Card */}
            <Card sx={{ ...darkCard, mb: 3, bgcolor: 'rgba(255,255,255,0.05)', border: '2px solid rgba(66,165,245,0.3)' }}>
              <CardContent sx={{ p: 4 }}>
                <Typography
                  variant="h4"
                  sx={{
                    color: '#82b1ff',
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
                    color: '#cfd8dc',
                    fontSize: '1.15rem',
                    lineHeight: 2,
                    mb: 3,
                    fontFamily: 'Georgia, serif',
                  }}
                >
                  {currentStory.text}
                </Typography>

                {/* Vocabulary Section */}
                {currentStory.vocabulary && currentStory.vocabulary.length > 0 && (
                  <Card
                    sx={{
                      ...darkCard,
                      bgcolor: 'rgba(76,175,80,0.08)',
                      border: '2px solid rgba(76,175,80,0.3)',
                      mb: 3,
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="h6"
                        sx={{ color: '#a5d6a7', fontWeight: 'bold', mb: 2 }}
                      >
                        📝 Vocabulary Challenge
                      </Typography>
                      {currentStory.vocabulary.map((vocab, index) => (
                        <Box
                          key={index}
                          sx={{
                            mb: 3,
                            p: 2,
                            bgcolor: 'rgba(255,255,255,0.03)',
                            borderRadius: '12px',
                            border: '1px solid rgba(76,175,80,0.2)',
                          }}
                        >
                          <Typography sx={{ fontWeight: 'bold', color: '#a5d6a7', fontSize: '1.1rem' }}>
                            🔤 {vocab.word}
                          </Typography>
                          <Typography sx={{ color: '#90a4ae', mb: 1.5, fontStyle: 'italic' }}>
                            Meaning: {vocab.definition}
                          </Typography>
                          <TextField
                            fullWidth
                            size="small"
                            value={vocabSentences[`${yearLevel}-${currentPage}-vocab-${index}`] || ''}
                            onChange={e => handleVocabSentence(index, e.target.value)}
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
                    bgcolor: 'rgba(255,152,0,0.08)',
                    border: '2px solid rgba(255,152,0,0.3)',
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{ color: '#ffcc80', fontWeight: 'bold', mb: 2 }}
                    >
                      🤔 Comprehension Questions
                    </Typography>
                    {currentStory.comprehensionQuestions.map(
                      (question, index) => (
                        <Box key={index} sx={{ mb: 3 }}>
                          <Typography
                            sx={{ color: '#ffb74d', mb: 1, fontWeight: 'bold', fontSize: '1rem' }}
                          >
                            {index + 1}. {question}
                          </Typography>
                          <TextField
                            fullWidth
                            multiline
                            rows={2}
                            value={
                              comprehensionAnswers[`${yearLevel}-${currentPage}-${index}`] || ''
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
                          bgcolor: '#4caf50',
                          '&:hover': { bgcolor: '#388e3c' },
                          boxShadow: '0 4px 15px rgba(76,175,80,0.3)',
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Button
                onClick={handlePreviousPage}
                variant="contained"
                startIcon={<ArrowBackIosIcon />}
                sx={{
                  ...darkButton,
                  bgcolor: '#7b1fa2',
                  '&:hover': { bgcolor: '#6a1b9a' },
                  boxShadow: '0 4px 15px rgba(123,31,162,0.3)',
                }}
              >
                Previous Story
              </Button>

              <Typography
                variant="h6"
                sx={{ color: '#82b1ff', fontWeight: 'bold' }}
              >
                📚 Reading Collection
              </Typography>

              <Button
                onClick={handleNextPage}
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  ...darkButton,
                  bgcolor: '#e91e63',
                  '&:hover': { bgcolor: '#c2185b' },
                  boxShadow: '0 4px 15px rgba(233,30,99,0.3)',
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
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Typography
            variant="h5"
            sx={{ color: '#82b1ff', fontWeight: 'bold' }}
          >
            ✍️ Creative Writing Tasks
          </Typography>
          <Button
            variant="outlined"
            onClick={() => setWritingTasks(generateWritingPrompts(yearLevel, 4))}
            sx={{
              borderRadius: '20px',
              px: 3,
              fontWeight: 'bold',
              textTransform: 'none',
              borderColor: 'rgba(130,177,255,0.4)',
              color: '#82b1ff',
              '&:hover': { borderColor: '#82b1ff', bgcolor: 'rgba(130,177,255,0.08)' },
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
              bgcolor: 'rgba(255,255,255,0.05)',
              border: '2px solid rgba(66,165,245,0.25)',
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                <Chip
                  label={task.genre}
                  size="small"
                  sx={{ bgcolor: 'rgba(130,177,255,0.15)', color: '#82b1ff', fontWeight: 'bold', fontSize: '0.8rem' }}
                />
              </Box>
              <Typography
                variant="h6"
                sx={{ color: '#cfd8dc', fontWeight: 'bold', mb: 2, fontSize: '1.05rem', lineHeight: 1.5 }}
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
                  border: '2px solid rgba(255,255,255,0.15)',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255,255,255,0.04)',
                  color: '#e0e0e0',
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
                    bgcolor: '#1565c0',
                    '&:hover': { bgcolor: '#0d47a1' },
                    boxShadow: '0 4px 15px rgba(21,101,192,0.3)',
                  }}
                >
                  📤 Submit Writing
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </TabPanel>

      {/* History Tab */}
      <TabPanel value={activeTab} index={2}>
        <Typography
          variant="h5"
          sx={{ color: '#82b1ff', fontWeight: 'bold', mb: 3, textAlign: 'center' }}
        >
          📊 Your Learning History
        </Typography>

        {/* Comprehension History */}
        <Card sx={{ ...darkCard, mb: 3, bgcolor: 'rgba(255,255,255,0.04)', border: '2px solid rgba(66,165,245,0.25)' }}>
          <CardContent>
            <Typography
              variant="h6"
              sx={{ color: '#64b5f6', fontWeight: 'bold', mb: 2 }}
            >
              📖 Reading Comprehension ({savedComprehensions.length} submissions)
            </Typography>
            {savedComprehensions.length === 0 ? (
              <Typography sx={{ color: '#78909c', textAlign: 'center', py: 2 }}>
                No comprehension answers yet. Start reading to fill this up! 📚
              </Typography>
            ) : (
              savedComprehensions.map(item => (
                <Card
                  key={item.id}
                  sx={{ ...darkCard, mb: 2, bgcolor: 'rgba(66,165,245,0.08)', border: '1px solid rgba(66,165,245,0.2)' }}
                >
                  <CardContent sx={{ py: 2 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'start',
                        mb: 1,
                      }}
                    >
                      <Typography sx={{ fontWeight: 'bold', color: '#82b1ff' }}>
                        {item.storyTitle}
                      </Typography>
                      <Chip
                        label={new Date(item.submittedAt).toLocaleDateString()}
                        size="small"
                        sx={{ bgcolor: 'rgba(66,165,245,0.2)', color: '#90caf9' }}
                      />
                    </Box>
                    <Typography variant="body2" sx={{ color: '#90a4ae', mb: 0.5 }}>
                      Q{item.questionIndex + 1}: {item.question}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#cfd8dc' }}>
                      <strong>Answer:</strong> {item.answer}
                    </Typography>
                  </CardContent>
                </Card>
              ))
            )}
          </CardContent>
        </Card>

        {/* Writing History */}
        <Card sx={{ ...darkCard, bgcolor: 'rgba(255,255,255,0.04)', border: '2px solid rgba(76,175,80,0.25)' }}>
          <CardContent>
            <Typography
              variant="h6"
              sx={{ color: '#a5d6a7', fontWeight: 'bold', mb: 2 }}
            >
              ✍️ Writing Tasks ({savedWritings.length} submissions)
            </Typography>
            {savedWritings.length === 0 ? (
              <Typography sx={{ color: '#78909c', textAlign: 'center', py: 2 }}>
                No writing tasks yet. Time to get creative! ✍️
              </Typography>
            ) : (
              savedWritings.map(item => (
                <Card
                  key={item.id}
                  sx={{ ...darkCard, mb: 2, bgcolor: 'rgba(76,175,80,0.08)', border: '1px solid rgba(76,175,80,0.2)' }}
                >
                  <CardContent sx={{ py: 2 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'start',
                        mb: 1,
                      }}
                    >
                      <Typography sx={{ fontWeight: 'bold', color: '#a5d6a7' }}>
                        Writing Task {item.taskIndex + 1}
                      </Typography>
                      <Chip
                        label={new Date(item.submittedAt).toLocaleDateString()}
                        size="small"
                        sx={{ bgcolor: 'rgba(76,175,80,0.2)', color: '#a5d6a7' }}
                      />
                    </Box>
                    <Typography variant="body2" sx={{ color: '#90a4ae', mb: 1 }}>
                      <strong>Prompt:</strong> {item.prompt}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#cfd8dc' }}>
                      <strong>Response:</strong> {item.response}
                    </Typography>
                  </CardContent>
                </Card>
              ))
            )}
          </CardContent>
        </Card>
      </TabPanel>
    </SectionContainer>
  );
}

export default EnglishSection;
