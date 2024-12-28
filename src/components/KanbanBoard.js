import React, { useState, useEffect } from 'react';
import TaskColumn from './TaskColumn';
import { Box, Fab, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Snackbar, IconButton, Slide } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Green tick icon
import { useDrop } from 'react-dnd';

const KanbanBoard = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('kanbanTasks');
    return savedTasks ? JSON.parse(savedTasks) : [
      { id: 1, title: 'Task 1', description: 'Plan the project', status: 'To Do' },
      { id: 2, title: 'Task 2', description: 'Code the feature', status: 'In Progress' },
      { id: 3, title: 'Task 3', description: 'Write tests', status: 'Peer Review' },
      { id: 4, title: 'Task 4', description: 'Deploy to production', status: 'Done' },
    ];
  });

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedTaskId, setHighlightedTaskId] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', type: '' });

  const columns = ['To Do', 'In Progress', 'Peer Review', 'Done'];

  const columnColors = {
    'To Do': '#fce4ec', // Light pink
    'In Progress': '#e3f2fd', // Light blue
    'Peer Review': '#fff3e0', // Light orange
    'Done': '#e8f5e9', // Light green
  };

  useEffect(() => {
    localStorage.setItem('kanbanTasks', JSON.stringify(tasks));
  }, [tasks]);

  const moveTask = (id, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
    setSnackbar({ open: true, message: `Task moved to ${newStatus}`, type: 'success' });
  };

  const addTask = () => {
    if (!newTask.title || !newTask.description) {
      alert('Please fill out all fields.');
      return;
    }
    setTasks((prevTasks) => [
      ...prevTasks,
      { id: Date.now(), title: newTask.title, description: newTask.description, status: 'To Do' },
    ]);
    setNewTask({ title: '', description: '' });
    setDialogOpen(false);
    setSnackbar({ open: true, message: 'Task Created!', type: 'success' });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const task = tasks.find((task) => task.title.toLowerCase().includes(searchQuery.toLowerCase()));
    if (task) {
      setHighlightedTaskId(task.id);
    } else {
      setHighlightedTaskId(null);
    }
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    setSnackbar({ open: true, message: 'Task Deleted!', type: 'error' });
  };

  const [, dropRef] = useDrop(() => ({
    accept: 'TASK',
    drop: (item) => {
      deleteTask(item.id);
    },
  }));

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const TransitionFromRight = (props) => {
    return <Slide {...props} direction="left" />;
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        p={2}
        sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', position: 'relative' }}
      >
        {columns.map((column) => (
          <TaskColumn
            key={column}
            title={column}
            tasks={tasks.filter((task) => task.status === column)}
            onDrop={(id) => moveTask(id, column)}
            highlightedTaskId={highlightedTaskId}
            style={{ backgroundColor: columnColors[column] }}
          />
        ))}
      </Box>

      {/* Search Bar */}
      <Box
        component="form"
        onSubmit={handleSearchSubmit}
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <TextField
          value={searchQuery}
          onChange={handleSearchChange}
          label="Search Task"
          variant="outlined"
          size="small"
        />
      </Box>

      {/* Floating Button */}
      <Fab
        color="primary"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
        }}
        onClick={() => setDialogOpen(true)}
      >
        <AddIcon />
      </Fab>

      {/* Task Creation Dialog */}
      <Dialog open={isDialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Create New Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Task Title"
            fullWidth
            variant="outlined"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Task Description"
            fullWidth
            variant="outlined"
            multiline
            rows={3}
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={addTask} color="primary">
            Add Task
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Area with Delete Icon */}
      <Box
        ref={dropRef}
        sx={{
          position: 'fixed',
          bottom: 16,
          left: 16,
          backgroundColor: '#ff3b30',
          padding: '16px',
          borderRadius: '8px',
          color: 'white',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <DeleteIcon sx={{ marginRight: '8px' }} />
        Drop to Delete
      </Box>

      {/* Snackbar for Notifications with Sliding Effect and Color Change */}
      <Snackbar
        open={snackbar.open}
        message={
          <Box display="flex" alignItems="center">
            <CheckCircleIcon sx={{ color: 'green', marginRight: '8px' }} />
            {snackbar.message}
          </Box>
        }
        autoHideDuration={1000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        TransitionComponent={TransitionFromRight}
        sx={{
          '& .MuiSnackbarContent-root': {
            backgroundColor: snackbar.type === 'error' ? '#f44336' : '#4caf50',
          },
        }}
      />
    </>
  );
};

export default KanbanBoard;
