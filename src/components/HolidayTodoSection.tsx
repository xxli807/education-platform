import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import {
  ArrowBack as BackIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Print as PrintIcon,
} from '@mui/icons-material';
import { db, HolidayPlan, HolidayTodoItem } from '../db/database';
import CustomDatePicker from './CustomDatePicker';
import ConfirmDeleteDialog from './ConfirmDeleteDialog';
import AlertDialog from './AlertDialog';

function HolidayTodoSection() {
  const navigate = useNavigate();
  const [plans, setPlans] = useState<HolidayPlan[]>([]);
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(() => {
    const saved = localStorage.getItem('holidaySelectedPlanId');
    return saved ? parseInt(saved) : null;
  });
  const [todoItems, setTodoItems] = useState<HolidayTodoItem[]>([]);

  // Dialog states
  const [openNewPlanDialog, setOpenNewPlanDialog] = useState(false);
  const [openNewItemDialog, setOpenNewItemDialog] = useState(false);
  const [newPlanData, setNewPlanData] = useState({ name: '', date: '' });
  const [planErrors, setPlanErrors] = useState({ name: '', date: '' });
  const [newItemData, setNewItemData] = useState({
    startTime: '',
    endTime: '',
    description: '',
  });
  const [itemErrors, setItemErrors] = useState({
    startTime: '',
    endTime: '',
    description: '',
  });

  // Dialog states
  const [deleteConfirm, setDeleteConfirm] = useState<{
    open: boolean;
    type: 'plan' | 'item' | null;
    id: number | null;
    name: string;
  }>({
    open: false,
    type: null,
    id: null,
    name: '',
  });

  const [alertDialog, setAlertDialog] = useState<{
    open: boolean;
    type: 'error' | 'success' | 'info';
    title: string;
    message: string;
  }>({
    open: false,
    type: 'info',
    title: '',
    message: '',
  });

  // Load plans on mount
  useEffect(() => {
    loadPlans();
  }, []);

  // Load todo items when selected plan changes
  useEffect(() => {
    if (selectedPlanId) {
      loadTodoItems(selectedPlanId);
    } else {
      setTodoItems([]);
    }
  }, [selectedPlanId]);

  // Persist selected plan to localStorage
  useEffect(() => {
    if (selectedPlanId) {
      localStorage.setItem('holidaySelectedPlanId', selectedPlanId.toString());
    } else {
      localStorage.removeItem('holidaySelectedPlanId');
    }
  }, [selectedPlanId]);

  const loadPlans = async () => {
    try {
      const allPlans = await db.holidayPlans
        .where('userId')
        .equals('lucas')
        .sortBy('holidayDate');
      setPlans(allPlans);
      if (allPlans.length > 0 && !selectedPlanId) {
        const firstPlanId = allPlans[0].id;
        if (firstPlanId !== undefined) {
          setSelectedPlanId(firstPlanId);
        }
      }
    } catch (error) {
      console.error('Error loading plans:', error);
    }
  };

  const loadTodoItems = async (planId: number) => {
    try {
      const items = await db.holidayTodoItems
        .where('planId')
        .equals(planId)
        .toArray();
      setTodoItems(items);
    } catch (error) {
      console.error('Error loading todo items:', error);
    }
  };

  const validatePlanForm = (): boolean => {
    const errors = { name: '', date: '' };

    if (!newPlanData.name.trim()) {
      errors.name = 'Holiday name is required';
    }
    if (!newPlanData.date.trim()) {
      errors.date = 'Date is required';
    }

    setPlanErrors(errors);
    return !errors.name && !errors.date;
  };

  const handleCreatePlan = async () => {
    if (!validatePlanForm()) {
      return;
    }

    try {
      const id = await db.holidayPlans.add({
        holidayName: newPlanData.name,
        holidayDate: newPlanData.date,
        createdAt: new Date(),
        userId: 'lucas',
      });
      setOpenNewPlanDialog(false);
      setNewPlanData({ name: '', date: '' });
      setPlanErrors({ name: '', date: '' });
      setAlertDialog({
        open: true,
        type: 'success',
        title: 'Plan Created!',
        message: `${newPlanData.name} has been added to your holiday plans.`,
      });
      await loadPlans();
      if (typeof id === 'number') {
        setSelectedPlanId(id);
      }
    } catch (error) {
      console.error('Error creating plan:', error);
      setAlertDialog({
        open: true,
        type: 'error',
        title: 'Creation Failed',
        message: 'Failed to create the holiday plan. Please try again.',
      });
    }
  };

  const validateItemForm = (): boolean => {
    const errors = {
      startTime: '',
      endTime: '',
      description: '',
    };

    if (!newItemData.startTime.trim()) {
      errors.startTime = 'Start time is required';
    }
    if (!newItemData.endTime.trim()) {
      errors.endTime = 'End time is required';
    }
    if (!newItemData.description.trim()) {
      errors.description = 'Task description is required';
    }

    setItemErrors(errors);
    return !errors.startTime && !errors.endTime && !errors.description;
  };

  const handleAddTodoItem = async () => {
    if (!selectedPlanId) {
      setAlertDialog({
        open: true,
        type: 'info',
        title: 'Select a Plan',
        message: 'Please select a holiday plan first before adding items.',
      });
      return;
    }

    if (!validateItemForm()) {
      return;
    }

    try {
      await db.holidayTodoItems.add({
        planId: selectedPlanId,
        startTime: newItemData.startTime,
        endTime: newItemData.endTime,
        description: newItemData.description,
        completed: false,
        createdAt: new Date(),
        userId: 'lucas',
      });
      setOpenNewItemDialog(false);
      setNewItemData({ startTime: '', endTime: '', description: '' });
      setItemErrors({ startTime: '', endTime: '', description: '' });
      setAlertDialog({
        open: true,
        type: 'success',
        title: 'Item Added!',
        message: `"${newItemData.description}" has been added to your todo list.`,
      });
      await loadTodoItems(selectedPlanId);
    } catch (error) {
      console.error('Error adding todo item:', error);
      setAlertDialog({
        open: true,
        type: 'error',
        title: 'Creation Failed',
        message: 'Failed to add the todo item. Please try again.',
      });
    }
  };

  const handleToggleTodoItem = async (itemId: number, completed: boolean) => {
    try {
      await db.holidayTodoItems.update(itemId, { completed: !completed });
      if (selectedPlanId) {
        await loadTodoItems(selectedPlanId);
      }
    } catch (error) {
      console.error('Error updating todo item:', error);
    }
  };

  const handleDeleteTodoItem = (itemId: number) => {
    setDeleteConfirm({
      open: true,
      type: 'item',
      id: itemId,
      name: 'todo item',
    });
  };

  const handleConfirmDeleteTodoItem = async () => {
    const itemId = deleteConfirm.id;
    if (itemId === null) return;

    try {
      await db.holidayTodoItems.delete(itemId);
      if (selectedPlanId) {
        await loadTodoItems(selectedPlanId);
      }
      setDeleteConfirm({ open: false, type: null, id: null, name: '' });
    } catch (error) {
      console.error('Error deleting todo item:', error);
      setAlertDialog({
        open: true,
        type: 'error',
        title: 'Delete Failed',
        message: 'Failed to delete the todo item. Please try again.',
      });
    }
  };

  const handleDeletePlan = (planId: number) => {
    const plan = plans.find((p) => p.id === planId);
    setDeleteConfirm({
      open: true,
      type: 'plan',
      id: planId,
      name: plan?.holidayName || 'holiday plan',
    });
  };

  const handleConfirmDeletePlan = async () => {
    const planId = deleteConfirm.id;
    if (planId === null) return;

    try {
      // Delete all todo items for this plan
      const itemsToDelete = await db.holidayTodoItems
        .where('planId')
        .equals(planId)
        .toArray();
      for (const item of itemsToDelete) {
        await db.holidayTodoItems.delete(item.id!);
      }
      // Delete the plan
      await db.holidayPlans.delete(planId);
      setSelectedPlanId(null);
      setDeleteConfirm({ open: false, type: null, id: null, name: '' });
      await loadPlans();
    } catch (error) {
      console.error('Error deleting plan:', error);
      setAlertDialog({
        open: true,
        type: 'error',
        title: 'Delete Failed',
        message: 'Failed to delete the holiday plan. Please try again.',
      });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const currentPlan = plans.find((p) => p.id === selectedPlanId);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        px: { xs: 2, sm: 4, md: 6 },
        py: 4,
        background: `
          linear-gradient(135deg, rgba(16, 20, 45, 0.92) 0%, rgba(25, 55, 95, 0.88) 50%, rgba(40, 20, 60, 0.92) 100%),
          repeating-linear-gradient(
            0deg,
            transparent,
            transparent 48px,
            rgba(100, 200, 255, 0.03) 48px,
            rgba(100, 200, 255, 0.03) 50px
          ),
          repeating-linear-gradient(
            90deg,
            transparent,
            transparent 48px,
            rgba(100, 200, 255, 0.03) 48px,
            rgba(100, 200, 255, 0.03) 50px
          )
        `,
        backgroundColor: '#0a0e1a',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 15% 20%, rgba(0, 200, 83, 0.12) 0%, transparent 40%),
            radial-gradient(circle at 85% 30%, rgba(33, 150, 243, 0.12) 0%, transparent 40%),
            radial-gradient(circle at 50% 80%, rgba(156, 39, 176, 0.1) 0%, transparent 40%)
          `,
          pointerEvents: 'none',
        },
        '@media print': {
          background: 'white !important',
          '&::before': {
            display: 'none',
          },
        },
      }}
    >
      {/* Header with back button */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 4,
          position: 'relative',
          zIndex: 1,
          '@media print': {
            mb: 2,
          },
        }}
      >
        <IconButton
          onClick={() => navigate('/')}
          sx={{
            color: '#b0bec5',
            mr: 2,
            '@media print': {
              display: 'none',
            },
          }}
        >
          <BackIcon sx={{ fontSize: 32 }} />
        </IconButton>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 900,
            background: 'linear-gradient(90deg, #ffd54f, #ff8a65, #ce93d8, #64b5f6)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: 'none',
            letterSpacing: '1px',
            '@media print': {
              WebkitTextFillColor: 'unset',
              color: '#000',
            },
          }}
        >
          Holiday Plans 🏖️
        </Typography>
      </Box>

      {/* Main content - two column layout */}
      <Grid
        container
        spacing={3}
        sx={{
          position: 'relative',
          zIndex: 1,
          '@media print': {
            spacing: 1,
          },
        }}
      >
        {/* Left panel - Plans list */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card
            sx={{
              background: 'linear-gradient(135deg, #1a1f3a 0%, #2d2a4a 100%)',
              border: '2px solid #26a69a',
              borderRadius: '15px',
              '@media print': {
                display: 'none',
              },
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ color: '#b2dfdb', mb: 2, fontWeight: 'bold' }}>
                Your Plans
              </Typography>

              {plans.length === 0 ? (
                <Typography sx={{ color: '#80cbc4', mb: 2, fontStyle: 'italic' }}>
                  No plans yet. Create one to get started!
                </Typography>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
                  {plans.map((plan) => (
                    <Box
                      key={plan.id}
                      sx={{
                        p: 1.5,
                        bgcolor: selectedPlanId === plan.id ? 'rgba(38, 166, 154, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                        border: selectedPlanId === plan.id ? '2px solid #26a69a' : '1px solid rgba(38, 166, 154, 0.3)',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        '&:hover': {
                          bgcolor: 'rgba(38, 166, 154, 0.15)',
                        },
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                      }}
                      onClick={() => setSelectedPlanId(plan.id!)}
                    >
                      <Box>
                        <Typography
                          sx={{
                            color: selectedPlanId === plan.id ? '#80cbc4' : '#b2dfdb',
                            fontWeight: 'bold',
                          }}
                        >
                          {plan.holidayName}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: '#64b5b0', display: 'block', mt: 0.5 }}
                        >
                          📅 {new Date(plan.holidayDate).toLocaleDateString()}
                        </Typography>
                      </Box>
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeletePlan(plan.id!);
                        }}
                        sx={{ color: '#ef5350' }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  ))}
                </Box>
              )}

              <Button
                fullWidth
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => {
                  setOpenNewPlanDialog(true);
                  setPlanErrors({ name: '', date: '' });
                }}
                sx={{
                  bgcolor: '#26a69a',
                  color: '#fff',
                  fontWeight: 'bold',
                  '&:hover': {
                    bgcolor: '#00897b',
                  },
                }}
              >
                New Plan
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Right panel - Todo items */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card
            sx={{
              background: 'linear-gradient(135deg, #1a1f3a 0%, #2d2a4a 100%)',
              border: '2px solid #26a69a',
              borderRadius: '15px',
            }}
          >
            <CardContent>
              {currentPlan ? (
                <>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: 2,
                      '@media print': {
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                      },
                    }}
                  >
                    <Box>
                      <Typography
                        variant="h5"
                        sx={{ color: '#b2dfdb', fontWeight: 'bold' }}
                      >
                        {currentPlan.holidayName}
                      </Typography>
                      <Typography sx={{ color: '#80cbc4', mt: 0.5 }}>
                        📅 {new Date(currentPlan.holidayDate).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        gap: 1,
                        '@media print': {
                          display: 'none',
                        },
                      }}
                    >
                      <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => {
                          setOpenNewItemDialog(true);
                          setItemErrors({ startTime: '', endTime: '', description: '' });
                        }}
                        sx={{
                          bgcolor: '#26a69a',
                          color: '#fff',
                          fontWeight: 'bold',
                          '&:hover': {
                            bgcolor: '#00897b',
                          },
                        }}
                      >
                        Add Item
                      </Button>
                      <Button
                        variant="contained"
                        startIcon={<PrintIcon />}
                        onClick={handlePrint}
                        sx={{
                          bgcolor: '#42a5f5',
                          color: '#fff',
                          fontWeight: 'bold',
                          '&:hover': {
                            bgcolor: '#1e88e5',
                          },
                        }}
                      >
                        Print
                      </Button>
                    </Box>
                  </Box>

                  {todoItems.length === 0 ? (
                    <Typography sx={{ color: '#80cbc4', mt: 3, fontStyle: 'italic', textAlign: 'center' }}>
                      No items yet. Add one to get started! ✨
                    </Typography>
                  ) : (
                    <TableContainer
                      sx={{
                        mt: 3,
                        '@media print': {
                          margin: '0 -16px -16px -16px',
                        },
                      }}
                    >
                      <Table
                        sx={{
                          '@media print': {
                            background: 'white',
                            color: 'black',
                          },
                        }}
                      >
                        <TableHead
                          sx={{
                            '@media print': {
                              background: '#f5f5f5',
                            },
                          }}
                        >
                          <TableRow>
                            <TableCell sx={{ color: '#b2dfdb', fontWeight: 'bold', width: '80px', '@media print': { color: '#000' } }}>
                              Done
                            </TableCell>
                            <TableCell sx={{ color: '#b2dfdb', fontWeight: 'bold', width: '100px', '@media print': { color: '#000' } }}>
                              Start
                            </TableCell>
                            <TableCell sx={{ color: '#b2dfdb', fontWeight: 'bold', width: '100px', '@media print': { color: '#000' } }}>
                              End
                            </TableCell>
                            <TableCell sx={{ color: '#b2dfdb', fontWeight: 'bold', '@media print': { color: '#000' } }}>
                              Task
                            </TableCell>
                            <TableCell sx={{ color: '#b2dfdb', fontWeight: 'bold', width: '60px', textAlign: 'center', '@media print': { display: 'none' } }}>
                              Delete
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {todoItems.map((item) => (
                            <TableRow
                              key={item.id}
                              sx={{
                                bgcolor: item.completed ? 'rgba(76, 175, 80, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                                transition: 'all 0.2s',
                                '&:hover': {
                                  bgcolor: 'rgba(38, 166, 154, 0.1)',
                                },
                                '@media print': {
                                  bgcolor: item.completed ? '#e8f5e9' : 'white',
                                },
                              }}
                            >
                              <TableCell sx={{ '@media print': { color: '#000' } }}>
                                <Checkbox
                                  checked={item.completed}
                                  onChange={() => handleToggleTodoItem(item.id!, item.completed)}
                                  sx={{
                                    color: '#26a69a',
                                    '&.Mui-checked': {
                                      color: '#4caf50',
                                    },
                                    '@media print': {
                                      display: 'none',
                                    },
                                  }}
                                />
                                {item.completed && (
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      display: 'none',
                                      '@media print': {
                                        display: 'inline',
                                        color: '#4caf50',
                                        fontWeight: 'bold',
                                      },
                                    }}
                                  >
                                    ✓
                                  </Typography>
                                )}
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: item.completed ? '#90a4ae' : '#80cbc4',
                                  textDecoration: item.completed ? 'line-through' : 'none',
                                  '@media print': { color: '#000' },
                                }}
                              >
                                {item.startTime}
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: item.completed ? '#90a4ae' : '#80cbc4',
                                  textDecoration: item.completed ? 'line-through' : 'none',
                                  '@media print': { color: '#000' },
                                }}
                              >
                                {item.endTime}
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: item.completed ? '#90a4ae' : '#b2dfdb',
                                  textDecoration: item.completed ? 'line-through' : 'none',
                                  '@media print': { color: '#000' },
                                }}
                              >
                                {item.description}
                              </TableCell>
                              <TableCell
                                sx={{
                                  textAlign: 'center',
                                  '@media print': { display: 'none' },
                                }}
                              >
                                <IconButton
                                  size="small"
                                  onClick={() => handleDeleteTodoItem(item.id!)}
                                  sx={{ color: '#ef5350' }}
                                >
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                </>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography sx={{ color: '#80cbc4', mb: 2 }}>
                    Create a new plan to get started! 🎉
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Dialog: Create New Plan */}
      <Dialog
        open={openNewPlanDialog}
        onClose={() => setOpenNewPlanDialog(false)}
        PaperProps={{
          sx: {
            background: 'linear-gradient(135deg, #1a1f3a 0%, #2d2a4a 100%)',
            border: '2px solid #26a69a',
          },
        }}
      >
        <DialogTitle sx={{ color: '#b2dfdb', fontWeight: 'bold', pb: 1 }}>Create New Holiday Plan</DialogTitle>
        <DialogContent sx={{ pt: 4, minWidth: '400px' }}>
          {/* Holiday Name Section */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="body2"
              sx={{
                color: '#64b5b0',
                fontSize: '0.75rem',
                fontWeight: 'bold',
                mb: 1.5,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              ✏️ HOLIDAY NAME
            </Typography>
            <TextField
              fullWidth
              value={newPlanData.name}
              onChange={(e) => {
                setNewPlanData({ ...newPlanData, name: e.target.value });
                if (planErrors.name) {
                  setPlanErrors({ ...planErrors, name: '' });
                }
              }}
              error={!!planErrors.name}
              placeholder="e.g., Summer Holidays"
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: planErrors.name ? '#ef5350' : '#80cbc4',
                  '& fieldset': {
                    borderColor: planErrors.name ? '#ef5350' : '#26a69a',
                    borderWidth: '2px',
                  },
                  '&:hover fieldset': {
                    borderColor: planErrors.name ? '#ef5350' : '#80cbc4',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: planErrors.name ? '#ef5350' : '#4dd0e1',
                  },
                },
                '& .MuiInputBase-input::placeholder': {
                  color: '#64b5b0',
                  opacity: 0.7,
                },
                '& .MuiInputLabel-root': {
                  color: planErrors.name ? '#ef5350' : '#80cbc4',
                },
              }}
            />
            {planErrors.name && (
              <Typography
                variant="caption"
                sx={{
                  color: '#ef5350',
                  display: 'block',
                  mt: 0.75,
                  fontWeight: 'bold',
                }}
              >
                {planErrors.name}
              </Typography>
            )}
          </Box>

          {/* Select Date Section */}
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="body2"
              sx={{
                color: '#64b5b0',
                fontSize: '0.75rem',
                fontWeight: 'bold',
                mb: 1.5,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              🗓️ SELECT DATE
            </Typography>
            <CustomDatePicker
              value={newPlanData.date}
              onChange={(date) => {
                setNewPlanData({ ...newPlanData, date });
                if (planErrors.date) {
                  setPlanErrors({ ...planErrors, date: '' });
                }
              }}
              error={!!planErrors.date}
            />
            {planErrors.date && (
              <Typography
                variant="caption"
                sx={{
                  color: '#ef5350',
                  display: 'block',
                  mt: 0.75,
                  fontWeight: 'bold',
                }}
              >
                {planErrors.date}
              </Typography>
            )}
          </Box>
          <Box sx={{ display: 'flex', gap: 1, mt: 3, justifyContent: 'flex-end' }}>
            <Button
              onClick={() => setOpenNewPlanDialog(false)}
              sx={{ color: '#80cbc4' }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleCreatePlan}
              sx={{
                bgcolor: '#26a69a',
                color: '#fff',
                fontWeight: 'bold',
                '&:hover': {
                  bgcolor: '#00897b',
                },
              }}
            >
              Create
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Dialog: Add New Todo Item */}
      <Dialog
        open={openNewItemDialog}
        onClose={() => setOpenNewItemDialog(false)}
        PaperProps={{
          sx: {
            background: 'linear-gradient(135deg, #1a1f3a 0%, #2d2a4a 100%)',
            border: '2px solid #26a69a',
          },
        }}
      >
        <DialogTitle sx={{ color: '#b2dfdb', fontWeight: 'bold' }}>Add Todo Item</DialogTitle>
        <DialogContent sx={{ pt: 3, minWidth: '450px' }}>
          {/* Time range section */}
          <Box sx={{ mb: 3, position: 'relative' }}>
            <Typography
              variant="caption"
              sx={{
                position: 'absolute',
                top: '-28px',
                left: '0',
                color: '#80cbc4',
                fontWeight: 'bold',
                letterSpacing: '0.5px',
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
              }}
            >
              ⏰ SCHEDULE
            </Typography>
            <Grid container spacing={2} sx={{ mt: 0 }}>
              <Grid size={{ xs: 6 }}>
                <Box sx={{ position: 'relative', pt: 2 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#64b5b0',
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                      mb: 0.5,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    START
                  </Typography>
                  <TextField
                    fullWidth
                    type="time"
                    value={newItemData.startTime}
                    onChange={(e) => {
                      setNewItemData({ ...newItemData, startTime: e.target.value });
                      if (itemErrors.startTime) {
                        setItemErrors({ ...itemErrors, startTime: '' });
                      }
                    }}
                    error={!!itemErrors.startTime}
                    inputProps={{
                      style: { padding: '10px', fontSize: '16px', textAlign: 'center' },
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: itemErrors.startTime ? '#ef5350' : '#80cbc4',
                        '& fieldset': {
                          borderColor: itemErrors.startTime ? '#ef5350' : '#26a69a',
                          borderWidth: '2px',
                        },
                        '&:hover fieldset': {
                          borderColor: itemErrors.startTime ? '#ef5350' : '#80cbc4',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: itemErrors.startTime ? '#ef5350' : '#4dd0e1',
                        },
                      },
                      '& input': {
                        '&::-webkit-calendar-picker-indicator': {
                          filter: 'invert(0.8)',
                          cursor: 'pointer',
                        },
                      },
                    }}
                  />
                  {itemErrors.startTime && (
                    <Typography
                      variant="caption"
                      sx={{
                        color: '#ef5350',
                        display: 'block',
                        mt: 0.5,
                        fontWeight: 'bold',
                      }}
                    >
                      {itemErrors.startTime}
                    </Typography>
                  )}
                </Box>
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Box sx={{ position: 'relative', pt: 2 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#64b5b0',
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                      mb: 0.5,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    END
                  </Typography>
                  <TextField
                    fullWidth
                    type="time"
                    value={newItemData.endTime}
                    onChange={(e) => {
                      setNewItemData({ ...newItemData, endTime: e.target.value });
                      if (itemErrors.endTime) {
                        setItemErrors({ ...itemErrors, endTime: '' });
                      }
                    }}
                    error={!!itemErrors.endTime}
                    inputProps={{
                      style: { padding: '10px', fontSize: '16px', textAlign: 'center' },
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: itemErrors.endTime ? '#ef5350' : '#80cbc4',
                        '& fieldset': {
                          borderColor: itemErrors.endTime ? '#ef5350' : '#26a69a',
                          borderWidth: '2px',
                        },
                        '&:hover fieldset': {
                          borderColor: itemErrors.endTime ? '#ef5350' : '#80cbc4',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: itemErrors.endTime ? '#ef5350' : '#4dd0e1',
                        },
                      },
                      '& input': {
                        '&::-webkit-calendar-picker-indicator': {
                          filter: 'invert(0.8)',
                          cursor: 'pointer',
                        },
                      },
                    }}
                  />
                  {itemErrors.endTime && (
                    <Typography
                      variant="caption"
                      sx={{
                        color: '#ef5350',
                        display: 'block',
                        mt: 0.5,
                        fontWeight: 'bold',
                      }}
                    >
                      {itemErrors.endTime}
                    </Typography>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>

          {/* Task description section */}
          <Box sx={{ position: 'relative', mb: 2 }}>
            <Typography
              variant="caption"
              sx={{
                position: 'absolute',
                top: '-24px',
                left: '0',
                color: '#80cbc4',
                fontWeight: 'bold',
                letterSpacing: '0.5px',
              }}
            >
              ✏️ TASK
            </Typography>
            <TextField
              fullWidth
              label="What will you do?"
              value={newItemData.description}
              onChange={(e) => {
                setNewItemData({ ...newItemData, description: e.target.value });
                if (itemErrors.description) {
                  setItemErrors({ ...itemErrors, description: '' });
                }
              }}
              error={!!itemErrors.description}
              placeholder="e.g., Go to the beach, Play in the park..."
              multiline
              rows={3}
              sx={{
                mt: 1,
                '& .MuiOutlinedInput-root': {
                  color: itemErrors.description ? '#ef5350' : '#80cbc4',
                  '& fieldset': {
                    borderColor: itemErrors.description ? '#ef5350' : '#26a69a',
                    borderWidth: '2px',
                  },
                  '&:hover fieldset': {
                    borderColor: itemErrors.description ? '#ef5350' : '#80cbc4',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: itemErrors.description ? '#ef5350' : '#4dd0e1',
                  },
                },
                '& .MuiInputBase-input::placeholder': {
                  color: '#64b5b0',
                  opacity: 0.7,
                },
                '& .MuiInputLabel-root': {
                  color: itemErrors.description ? '#ef5350' : '#80cbc4',
                },
              }}
            />
            {itemErrors.description && (
              <Typography
                variant="caption"
                sx={{
                  color: '#ef5350',
                  display: 'block',
                  mt: 0.5,
                  fontWeight: 'bold',
                }}
              >
                {itemErrors.description}
              </Typography>
            )}
          </Box>

          <Box sx={{ display: 'flex', gap: 1, mt: 4, justifyContent: 'flex-end' }}>
            <Button
              onClick={() => setOpenNewItemDialog(false)}
              sx={{ color: '#80cbc4' }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleAddTodoItem}
              sx={{
                bgcolor: '#26a69a',
                color: '#fff',
                fontWeight: 'bold',
                '&:hover': {
                  bgcolor: '#00897b',
                },
              }}
            >
              Add Item
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog for Deletions */}
      <ConfirmDeleteDialog
        open={deleteConfirm.open}
        description={
          deleteConfirm.type === 'plan'
            ? `Are you sure you want to delete "${deleteConfirm.name}" and all its items? This action cannot be undone.`
            : `Are you sure you want to delete this ${deleteConfirm.name}? This action cannot be undone.`
        }
        onConfirm={
          deleteConfirm.type === 'plan'
            ? handleConfirmDeletePlan
            : handleConfirmDeleteTodoItem
        }
        onCancel={() =>
          setDeleteConfirm({ open: false, type: null, id: null, name: '' })
        }
      />

      {/* Alert Dialog for Messages */}
      <AlertDialog
        open={alertDialog.open}
        type={alertDialog.type}
        title={alertDialog.title}
        message={alertDialog.message}
        onClose={() =>
          setAlertDialog({
            open: false,
            type: 'info',
            title: '',
            message: '',
          })
        }
      />
    </Box>
  );
}

export default HolidayTodoSection;
