export interface Task {
  _id: string;
  userId: string;
  title: string;
  dueDate: Date;
  completed: boolean;
  type: 'simple' | 'complex';
  description?: string;
  subtasks?: string[];
  priority?: 'low' | 'medium' | 'high';
  tags?: string[];
  group?: string;
}