import mongoose from 'mongoose';

export interface Todo extends mongoose.Document {
  userId: string;
  title: string;
  dueDate: string;
  completed: boolean;
  type: 'simple' | 'complex';
  description?: string;
  subtasks?: string[];
  priority?: 'low' | 'medium' | 'high';
  tags?: string[];
  group?: string;
}

// 65aee840602a99b80a138141

const TodoSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, 'Please provide a userId'],
  },
  title: {
    type: String,
    required: [true, 'Please provide a title'],
  },
  dueDate: {
    type: Date,
    required: [true, 'Please provide a due date'],
  },
  completed: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    enum: ['simple', 'complex'],
    default: 'simple',
  },
  description: {
    type: String,
    default: '',
  },
  subtasks: {
    type: [String],
    default: [],
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  },
  tags: {
    type: [String],
    default: [],
  },
  group: {
    type: String,
    default: '',
  },
});

export default mongoose.models.todos || mongoose.model<Todo>('todos', TodoSchema);