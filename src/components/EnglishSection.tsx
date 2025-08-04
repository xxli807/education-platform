import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {
  Box,
  Button,
  Card,
  CardContent,
  LinearProgress,
  Tab,
  Tabs,
  TextareaAutosize,
  TextField,
  Typography,
} from '@mui/material';
import React, { useCallback, useState } from 'react';
import {
  challengingReadings,
  englishWritingTasks,
} from '../data/englishContent';
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
    (event: React.SyntheticEvent, newValue: number) => {
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

  const progress = ((currentPage + 1) / challengingReadings.length) * 100;

  return (
    <SectionContainer name="English">
      <Card className="!mb-6">
        <Tabs value={activeTab} onChange={handleTabChange} centered>
          <Tab label="📚 Reading Adventures" />
          <Tab label="✍️ Writing Tasks" />
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
                value={comprehensionAnswers[`${currentPage}-${index}`] || ''}
                onChange={e => handleComprehensionAnswer(index, e.target.value)}
                placeholder="Write your detailed answer here..."
                className="w-full font-sans text-sm leading-relaxed p-2.5 border border-yellow-400 rounded-md bg-white resize-y outline-none box-border focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
              />
              <Button
                variant="contained"
                color="primary"
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                Submit
              </Button>
            </CardContent>
          </Card>
        ))}
      </TabPanel>
    </SectionContainer>
  );
}

export default EnglishSection;
