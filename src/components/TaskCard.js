import React from 'react';
import { useDrag } from 'react-dnd';
import { Box } from '@mui/material';

const TaskCard = ({ task, isHighlighted }) => {
  const [, dragRef] = useDrag(() => ({
    type: 'TASK',
    item: { id: task.id },
  }));

  return (
    <Box
      ref={dragRef}
      sx={{
        backgroundColor: isHighlighted ? '#ff5722' : '#ffeb3b',
        color: '#000',
        padding: '16px',
        marginBottom: '8px',
        borderRadius: '8px',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
        cursor: 'grab',
        '&:hover': {
          backgroundColor: isHighlighted ? '#e64a19' : '#fdd835',
        },
      }}
    >
      <strong>{task.title}</strong>
      <p style={{ margin: 0 }}>{task.description}</p>
    </Box>
  );
};

export default TaskCard;
