import React from 'react';
import { useDrop } from 'react-dnd';
import TaskCard from './TaskCard';
import { Box, Typography, Paper } from '@mui/material';

const TaskColumn = ({ title, tasks, onDrop, highlightedTaskId, style }) => {
  const [, dropRef] = useDrop(() => ({
    accept: 'TASK',
    drop: (item) => onDrop(item.id),
  }));

  return (
    <Paper
      ref={dropRef}
      sx={{
        flex: 1,
        margin: '0 8px',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.15)',
        background: `linear-gradient(135deg, #f6f9fc, #e0f7fa)`,
        ...style, // Apply the dynamic style here
      }}
    >
      <Typography
        variant="h6"
        align="center"
        sx={{
          marginBottom: '16px',
          borderBottom: '2px solid rgba(0, 0, 0, 0.1)',
          paddingBottom: '10px',
          color: '#333',
          fontWeight: 'bold',
          letterSpacing: '0.5px',
        }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          height: '100%',
          overflowY: 'auto',
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#9e9e9e',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#757575',
          },
        }}
      >
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            isHighlighted={task.id === highlightedTaskId}
          />
        ))}
      </Box>
    </Paper>
  );
};

export default TaskColumn;
