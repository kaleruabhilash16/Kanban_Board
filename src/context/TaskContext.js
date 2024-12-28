import React, { createContext, useState } from 'react';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Design homepage', description: 'Create wireframes', stage: 'ToDo' },
    { id: 2, title: 'Code login', description: 'Implement login feature', stage: 'InProgress' },
    { id: 3, title: 'Peer review code', description: 'Review feature branch', stage: 'PeerReview' },
    { id: 4, title: 'Deploy app', description: 'Deploy to production', stage: 'Done' },
  ]);

  const addTask = (newTask) => setTasks([...tasks, newTask]);
  const updateTask = (taskId, updatedStage) =>
    setTasks(tasks.map(task => (task.id === taskId ? { ...task, stage: updatedStage } : task)));

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
};
