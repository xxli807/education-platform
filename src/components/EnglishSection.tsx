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
  Typography,
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import {
  challengingReadings,
  englishWritingTasks,
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

function EnglishSection() {
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

  const handleNextPage = useCallback(() => {
    setCurrentPage(prev => (prev + 1) % challengingReadings.length);
  }, []);

  const handlePreviousPage = useCallback(() => {
    setCurrentPage(
      prev =>
        (prev - 1 + challengingReadings.length) % challengingReadings.length
    );
  }, []);

  const handleTabChange = useCallback(
    (_: React.SyntheticEvent, newValue: number) => {
      setActiveTab(newValue);
    },
    []
  );

  const handleComprehensionAnswer = useCallback(
    (questionIndex: number, value: string) => {
      const key = `${currentPage}-${questionIndex}`;
      setComprehensionAnswers(prev => ({ ...prev, [key]: value }));
    },
    [currentPage]
  );

  const handleWritingResponse = useCallback(
    (taskIndex: number, value: string) => {
      setWritingResponses(prev => ({ ...prev, [taskIndex]: value }));
    },
    []
  );

  const handleVocabSentence = useCallback(
    (wordIndex: number, value: string) => {
      const key = `${currentPage}-vocab-${wordIndex}`;
      setVocabSentences(prev => ({ ...prev, [key]: value }));
    },
    [currentPage]
  );

  const submitComprehensionAnswers = async () => {
    try {
      const currentStory = challengingReadings[currentPage];
      const answersToSave: Omit<ComprehensionAnswer, 'id'>[] = [];

      currentStory.comprehensionQuestions.forEach((question, index) => {
        const key = `${currentPage}-${index}`;
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
        delete clearedAnswers[`${currentPage}-${index}`];
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
      const response = writingResponses[taskIndex];
      if (!response || !response.trim()) {
        setSubmitStatus({
          type: 'error',
          message: 'Please write a response before submitting.',
        });
        return;
      }

      const task = englishWritingTasks[taskIndex];
      await db.writingTasks.add({
        taskIndex,
        prompt: task.prompt,
        response: response.trim(),
        submittedAt: new Date(),
        userId,
      });

      setWritingResponses(prev => ({ ...prev, [taskIndex]: '' }));

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

  const progress = ((currentPage + 1) / challengingReadings.length) * 100;
  const currentStory = challengingReadings[currentPage];

  const cardStyle = {
    borderRadius: '16px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  };

  const buttonStyle = {
    borderRadius: '25px',
    px: 4,
    py: 1.5,
    fontSize: '1rem',
    fontWeight: 'bold',
    textTransform: 'none' as const,
  };

  return (
    <SectionContainer name="English">
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

      <Card sx={{ ...cardStyle, mb: 3 }}>
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
            },
            '& .Mui-selected': {
              color: '#1565c0 !important',
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
        {/* Progress Bar */}
        <Box sx={{ mb: 3 }}>
          <Typography sx={{ color: '#1565c0', fontWeight: 'bold', mb: 1 }}>
            📖 Story {currentPage + 1} of {challengingReadings.length}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 10,
              borderRadius: 5,
              bgcolor: '#bbdefb',
              '& .MuiLinearProgress-bar': {
                backgroundColor: '#1565c0',
                borderRadius: 5,
              },
            }}
          />
        </Box>

        {/* Reading Card */}
        <Card sx={{ ...cardStyle, mb: 3, border: '2px solid #90caf9', bgcolor: '#fff' }}>
          <CardContent sx={{ p: 4 }}>
            <Typography
              variant="h4"
              sx={{
                color: '#1565c0',
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
                color: '#333',
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
                  ...cardStyle,
                  bgcolor: '#e8f5e9',
                  border: '2px solid #81c784',
                  mb: 3,
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ color: '#2e7d32', fontWeight: 'bold', mb: 2 }}
                  >
                    📝 Vocabulary Challenge
                  </Typography>
                  {currentStory.vocabulary.map((vocab, index) => (
                    <Box
                      key={index}
                      sx={{
                        mb: 3,
                        p: 2,
                        bgcolor: '#f1f8e9',
                        borderRadius: '12px',
                        border: '1px solid #c8e6c9',
                      }}
                    >
                      <Typography sx={{ fontWeight: 'bold', color: '#1b5e20', fontSize: '1.1rem' }}>
                        🔤 {vocab.word}
                      </Typography>
                      <Typography sx={{ color: '#555', mb: 1.5, fontStyle: 'italic' }}>
                        Meaning: {vocab.definition}
                      </Typography>
                      <TextField
                        fullWidth
                        size="small"
                        value={vocabSentences[`${currentPage}-vocab-${index}`] || ''}
                        onChange={e => handleVocabSentence(index, e.target.value)}
                        placeholder={`Write a sentence using the word "${vocab.word}"...`}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                            bgcolor: '#fff',
                          },
                        }}
                      />
                    </Box>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Comprehension Questions */}
            <Card
              sx={{
                ...cardStyle,
                bgcolor: '#fff8e1',
                border: '2px solid #ffca28',
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{ color: '#f57f17', fontWeight: 'bold', mb: 2 }}
                >
                  🤔 Comprehension Questions
                </Typography>
                {currentStory.comprehensionQuestions.map(
                  (question, index) => (
                    <Box key={index} sx={{ mb: 3 }}>
                      <Typography
                        sx={{ color: '#e65100', mb: 1, fontWeight: 'bold', fontSize: '1rem' }}
                      >
                        {index + 1}. {question}
                      </Typography>
                      <TextField
                        fullWidth
                        multiline
                        rows={2}
                        value={
                          comprehensionAnswers[`${currentPage}-${index}`] || ''
                        }
                        onChange={e =>
                          handleComprehensionAnswer(index, e.target.value)
                        }
                        placeholder="Write your answer here..."
                        variant="outlined"
                        size="small"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                            bgcolor: '#fffde7',
                          },
                        }}
                      />
                    </Box>
                  )
                )}

                <Box sx={{ textAlign: 'center', mt: 2 }}>
                  <Button
                    onClick={submitComprehensionAnswers}
                    variant="contained"
                    sx={{
                      ...buttonStyle,
                      bgcolor: '#4caf50',
                      '&:hover': { bgcolor: '#388e3c' },
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
              ...buttonStyle,
              bgcolor: '#7b1fa2',
              '&:hover': { bgcolor: '#6a1b9a' },
            }}
          >
            Previous Story
          </Button>

          <Typography
            variant="h6"
            sx={{ color: '#1565c0', fontWeight: 'bold' }}
          >
            📚 Reading Collection
          </Typography>

          <Button
            onClick={handleNextPage}
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            sx={{
              ...buttonStyle,
              bgcolor: '#e91e63',
              '&:hover': { bgcolor: '#c2185b' },
            }}
          >
            Next Story
          </Button>
        </Box>
      </TabPanel>

      {/* Writing Tab */}
      <TabPanel value={activeTab} index={1}>
        <Typography
          variant="h5"
          sx={{ color: '#1565c0', fontWeight: 'bold', mb: 3, textAlign: 'center' }}
        >
          ✍️ Creative Writing Tasks
        </Typography>
        {englishWritingTasks.map((task, index) => (
          <Card
            key={index}
            sx={{
              ...cardStyle,
              mb: 3,
              bgcolor: '#e3f2fd',
              border: '2px solid #90caf9',
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="h6"
                sx={{ color: '#1565c0', fontWeight: 'bold', mb: 2, fontSize: '1.1rem' }}
              >
                ✏️ {task.prompt}
              </Typography>
              <TextareaAutosize
                minRows={4}
                maxRows={10}
                value={writingResponses[index] || ''}
                onChange={e => handleWritingResponse(index, e.target.value)}
                placeholder="Let your imagination flow! Write your story here..."
                style={{
                  width: '100%',
                  fontFamily: 'inherit',
                  fontSize: '1rem',
                  lineHeight: '1.8',
                  padding: '12px 16px',
                  border: '2px solid #90caf9',
                  borderRadius: '12px',
                  backgroundColor: '#fff',
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
                    ...buttonStyle,
                    bgcolor: '#1565c0',
                    '&:hover': { bgcolor: '#0d47a1' },
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
          sx={{ color: '#1565c0', fontWeight: 'bold', mb: 3, textAlign: 'center' }}
        >
          📊 Your Learning History
        </Typography>

        {/* Comprehension History */}
        <Card sx={{ ...cardStyle, mb: 3, border: '2px solid #90caf9' }}>
          <CardContent>
            <Typography
              variant="h6"
              sx={{ color: '#1565c0', fontWeight: 'bold', mb: 2 }}
            >
              📖 Reading Comprehension ({savedComprehensions.length} submissions)
            </Typography>
            {savedComprehensions.length === 0 ? (
              <Typography sx={{ color: '#999', textAlign: 'center', py: 2 }}>
                No comprehension answers yet. Start reading to fill this up! 📚
              </Typography>
            ) : (
              savedComprehensions.map(item => (
                <Card
                  key={item.id}
                  sx={{ ...cardStyle, mb: 2, bgcolor: '#e3f2fd' }}
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
                      <Typography sx={{ fontWeight: 'bold', color: '#1565c0' }}>
                        {item.storyTitle}
                      </Typography>
                      <Chip
                        label={new Date(item.submittedAt).toLocaleDateString()}
                        size="small"
                        sx={{ bgcolor: '#bbdefb' }}
                      />
                    </Box>
                    <Typography variant="body2" sx={{ color: '#555', mb: 0.5 }}>
                      Q{item.questionIndex + 1}: {item.question}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#333' }}>
                      <strong>Answer:</strong> {item.answer}
                    </Typography>
                  </CardContent>
                </Card>
              ))
            )}
          </CardContent>
        </Card>

        {/* Writing History */}
        <Card sx={{ ...cardStyle, border: '2px solid #81c784' }}>
          <CardContent>
            <Typography
              variant="h6"
              sx={{ color: '#2e7d32', fontWeight: 'bold', mb: 2 }}
            >
              ✍️ Writing Tasks ({savedWritings.length} submissions)
            </Typography>
            {savedWritings.length === 0 ? (
              <Typography sx={{ color: '#999', textAlign: 'center', py: 2 }}>
                No writing tasks yet. Time to get creative! ✍️
              </Typography>
            ) : (
              savedWritings.map(item => (
                <Card
                  key={item.id}
                  sx={{ ...cardStyle, mb: 2, bgcolor: '#e8f5e9' }}
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
                      <Typography sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
                        Writing Task {item.taskIndex + 1}
                      </Typography>
                      <Chip
                        label={new Date(item.submittedAt).toLocaleDateString()}
                        size="small"
                        sx={{ bgcolor: '#c8e6c9' }}
                      />
                    </Box>
                    <Typography variant="body2" sx={{ color: '#555', mb: 1 }}>
                      <strong>Prompt:</strong> {item.prompt}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#333' }}>
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
