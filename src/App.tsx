import React from 'react';
import { TasksContainer } from '@features/tasks/components/TasksContainer';

function App() {
  return (
    <div className="app">
      <header>
        <h1>Task Management System</h1>
      </header>
      <main>
        <TasksContainer />
      </main>
    </div>
  );
}

export default App; 