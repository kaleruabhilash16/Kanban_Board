import React from 'react';
import KanbanBoard from './components/KanbanBoard';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Kanban Board</h1>
      <KanbanBoard />
    </div>
  );
};

export default App;
