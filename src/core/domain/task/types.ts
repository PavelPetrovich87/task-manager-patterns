export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT'
}

export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  REVIEW = 'REVIEW',
  DONE = 'DONE'
}

export interface TaskId {
  value: string;
}

export interface Tag {
  id: string;
  name: string;
  color?: string;
}

export interface Task {
  id: TaskId;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: Date;
  tags?: Tag[];
  createdAt: Date;
  updatedAt: Date;
  assigneeId?: string;
  creatorId: string;
} 