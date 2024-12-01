import React, { useState } from 'react';
import { TaskPriority, TaskStatus } from '@core/domain/task';

interface CreateTaskFormProps {
  onSubmit: (title: string, priority: TaskPriority) => void;
}

export const CreateTaskForm: React.FC<CreateTaskFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<TaskPriority>(TaskPriority.MEDIUM);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(title, priority);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Task title"
        required
      />
      <select 
        value={priority}
        onChange={e => setPriority(e.target.value as TaskPriority)}
      >
        {Object.values(TaskPriority).map(p => (
          <option key={p} value={p}>{p}</option>
        ))}
      </select>
      <button type="submit">Create Task</button>
    </form>
  );
}; 