import React from 'react';
import { Task } from '@core/domain/task';

interface TaskListProps {
  tasks: Task[];
}

export const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <ul className="task-list">
      {tasks.map(task => (
        <li key={task.id.value}>
          <h3>{task.title}</h3>
          <div>Status: {task.status}</div>
          <div>Priority: {task.priority}</div>
        </li>
      ))}
    </ul>
  );
}; 