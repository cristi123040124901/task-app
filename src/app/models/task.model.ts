export type TaskPriority =
  | 'high'
  | 'medium'
  | 'low';

export interface Task {
  id: number;
  title: string;
  category: string;
  priority: TaskPriority;
  done: boolean;
  createdAt: string;
}
