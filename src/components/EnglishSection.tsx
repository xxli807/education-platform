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

  const [savedComprehensions, setSavedComprehensions] = useState<
    ComprehensionAnswer[]
  >([]);
  const [savedWritings, setSavedWritings] = useState<WritingTask[]>([]);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const userId = 'lucas'; // Current user

  // Load saved data on component mount
  useEffect(() => {
    loadSavedData();
  }, []);

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

      // Clear current answers
      const clearedAnswers = { ...comprehensionAnswers };
      currentStory.comprehensionQuestions.forEach((_, index) => {
        delete clearedAnswers[`${currentPage}-${index}`];
      });
      setComprehensionAnswers(clearedAnswers);

      setSubmitStatus({
        type: 'success',
        message: `Successfully saved ${answersToSave.length} comprehension answers!`,
      });

      // Reload saved data
      await loadSavedData();
    } catch (error) {
      console.error('Error saving comprehension answers:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Failed to save answers. Please try again.',
      });
    }

    // Clear status after 3 seconds
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

      // Clear the response
      setWritingResponses(prev => ({ ...prev, [taskIndex]: '' }));

      setSubmitStatus({
        type: 'success',
        message: 'Writing task submitted successfully!',
      });

      // Reload saved data
      await loadSavedData();
    } catch (error) {
      console.error('Error saving writing task:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Failed to save writing task. Please try again.',
      });
    }

    // Clear status after 3 seconds
    setTimeout(() => setSubmitStatus({ type: null, message: '' }), 3000);
  };

  const progress = ((currentPage + 1) / challengingReadings.length) * 100;

  return (
    <SectionContainer name="English">
      {/* Status Alert */}
      {submitStatus.type && (
        <Alert
          severity={submitStatus.type}
          className="mb-4"
          onClose={() => setSubmitStatus({ type: null, message: '' })}
        >
          {submitStatus.message}
        </Alert>
      )}

      <Card className="!mb-6">
        <Tabs value={activeTab} onChange={handleTabChange} centered>
          <Tab label="📚 Reading" />
          <Tab label="✍️ Writing" />
          <Tab
            label={
              <Box className="flex items-center gap-1">
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
        <Box className="mb-6">
          <Typography variant="body2" className="text-blue-600 mb-2">
            Story {currentPage + 1} of {challengingReadings.length}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={progress}
            className="!h-2 !bg-blue-100"
            sx={{ '& .MuiLinearProgress-bar': { backgroundColor: '#2563eb' } }}
          />
        </Box>

        {/* Reading Card */}
        <Card className="!bg-white !shadow-xl !rounded-2xl !mb-6">
          <CardContent className="!p-8">
            <Typography
              variant="h4"
              className="text-blue-700 font-bold !mb-6 text-center"
            >
              {challengingReadings[currentPage].title}
            </Typography>

            <Typography
              variant="body1"
              className="text-gray-800 leading-relaxed !text-lg !leading-8 !mb-6"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              {challengingReadings[currentPage].text}
            </Typography>

            {/* Comprehension Questions */}
            <Card className="!bg-yellow-50 !mt-6">
              <CardContent>
                <Typography
                  variant="h6"
                  className="text-yellow-800 font-bold !mb-4"
                >
                  🤔 Comprehension Questions
                </Typography>
                {challengingReadings[currentPage].comprehensionQuestions.map(
                  (question, index) => (
                    <div key={index} className="!mb-4">
                      <Typography className="text-yellow-700 !mb-2 font-medium">
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
                        slotProps={{
                          input: {
                            className: 'bg-blue-50',
                          },
                        }}
                      />
                    </div>
                  )
                )}

                {/* Submit Button for Comprehension */}
                <Box className="mt-4 text-center">
                  <Button
                    onClick={submitComprehensionAnswers}
                    variant="contained"
                    className="!bg-green-500 hover:!bg-green-600 !text-white"
                  >
                    Submit Comprehension Answers
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <Box className="flex justify-between items-center">
          <Button
            onClick={handlePreviousPage}
            variant="contained"
            startIcon={<ArrowBackIosIcon />}
            className="!bg-purple-500 hover:!bg-purple-600 !text-white !px-6 !py-3"
          >
            Previous Story
          </Button>

          <Typography variant="h6" className="text-blue-700 font-semibold">
            📚 Advanced Reading Collection
          </Typography>

          <Button
            onClick={handleNextPage}
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            className="!bg-pink-500 hover:!bg-pink-600 !text-white !px-6 !py-3"
          >
            Next Story
          </Button>
        </Box>
      </TabPanel>

      {/* Writing Tab */}
      <TabPanel value={activeTab} index={1}>
        <Typography variant="h5" className="text-blue-600 mb-4">
          Writing Tasks
        </Typography>
        {englishWritingTasks.map((task, index) => (
          <Card key={index} className="mb-4 bg-white">
            <CardContent>
              <Typography variant="h6" className="text-blue-600 mb-2">
                {task.prompt}
              </Typography>
              <TextareaAutosize
                minRows={3}
                maxRows={8}
                value={writingResponses[index] || ''}
                onChange={e => handleWritingResponse(index, e.target.value)}
                placeholder="Write your detailed answer here..."
                className="w-full font-sans text-sm leading-relaxed p-2.5 border border-yellow-400 rounded-md bg-white resize-y outline-none box-border focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
              />
              <Box className="mt-3">
                <Button
                  onClick={() => submitWritingTask(index)}
                  variant="contained"
                  className="!bg-blue-500 hover:!bg-blue-600 !text-white"
                >
                  Submit Writing Task
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </TabPanel>

      {/* History Tab */}
      <TabPanel value={activeTab} index={2}>
        <Typography variant="h5" className="text-blue-600 mb-4">
          📚 Your Learning History
        </Typography>

        {/* Comprehension History */}
        <Card className="mb-6">
          <CardContent>
            <Typography variant="h6" className="text-blue-600 mb-3">
              📖 Reading Comprehension ({savedComprehensions.length}{' '}
              submissions)
            </Typography>
            {savedComprehensions.length === 0 ? (
              <Typography variant="body2" className="text-gray-500">
                No comprehension answers submitted yet.
              </Typography>
            ) : (
              savedComprehensions.map(item => (
                <Card key={item.id} className="mb-3 bg-blue-50">
                  <CardContent className="py-3">
                    <Box className="flex justify-between items-start mb-2">
                      <Typography
                        variant="subtitle1"
                        className="font-semibold text-blue-700"
                      >
                        {item.storyTitle}
                      </Typography>
                      <Chip
                        label={new Date(item.submittedAt).toLocaleDateString()}
                        size="small"
                        className="bg-blue-200"
                      />
                    </Box>
                    <Typography variant="body2" className="text-gray-600 mb-1">
                      Q{item.questionIndex + 1}: {item.question}
                    </Typography>
                    <Typography variant="body2" className="text-gray-800">
                      <strong>Answer:</strong> {item.answer}
                    </Typography>
                  </CardContent>
                </Card>
              ))
            )}
          </CardContent>
        </Card>

        {/* Writing History */}
        <Card>
          <CardContent>
            <Typography variant="h6" className="text-blue-600 mb-3">
              ✍️ Writing Tasks ({savedWritings.length} submissions)
            </Typography>
            {savedWritings.length === 0 ? (
              <Typography variant="body2" className="text-gray-500">
                No writing tasks submitted yet.
              </Typography>
            ) : (
              savedWritings.map(item => (
                <Card key={item.id} className="mb-3 bg-green-50">
                  <CardContent className="py-3">
                    <Box className="flex justify-between items-start mb-2">
                      <Typography
                        variant="subtitle1"
                        className="font-semibold text-green-700"
                      >
                        Writing Task {item.taskIndex + 1}
                      </Typography>
                      <Chip
                        label={new Date(item.submittedAt).toLocaleDateString()}
                        size="small"
                        className="bg-green-200"
                      />
                    </Box>
                    <Typography variant="body2" className="text-gray-600 mb-2">
                      <strong>Prompt:</strong> {item.prompt}
                    </Typography>
                    <Typography variant="body2" className="text-gray-800">
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
