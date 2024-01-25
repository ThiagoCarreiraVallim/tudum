'use client';

import { Task } from '@/types/task.type';
import { createContext, useContext, useState } from 'react';

export interface TodoContextInterface {
  todos: Task[] | null;
  setTodos: React.Dispatch<React.SetStateAction<Task[] | null>>;
}

const TodoContext = createContext<TodoContextInterface | null>(null);

export default function TodoContextProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useState<Task[] | null>(null);

  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      { children }
    </TodoContext.Provider>
  );
}

export function useTodoContext() {
  const context = useContext(TodoContext);

  if(!context) {
    throw new Error('useTodoContext must be used within a TodoContextProvider');
  }

  return context;
}