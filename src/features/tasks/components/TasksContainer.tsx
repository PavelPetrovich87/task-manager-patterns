import React, { useState } from 'react';
import { Task, TaskPriority, TaskStatus, TaskId } from '@core/domain/task';
import { TaskList } from './TaskList';
import { CreateTaskForm } from './CreateTaskForm';

export const TasksContainer: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleCreateTask = (title: string, priority: TaskPriority) => {
    const newTask: Task = {
      id: { value: crypto.randomUUID() },
      title,
      priority,
      status: TaskStatus.TODO,
      createdAt: new Date(),
      updatedAt: new Date(),
      creatorId: 'user-1' // Hardcoded for now
    };

    setTasks(prev => [...prev, newTask]);
  };

  return (
    <div>
      <h2>Tasks</h2>
      <CreateTaskForm onSubmit={handleCreateTask} />
      <TaskList tasks={tasks} />
    </div>
  );
}; 