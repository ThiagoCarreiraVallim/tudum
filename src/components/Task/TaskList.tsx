'use client';

import { useTodoContext } from '@/context/todoContext';
import { useEffect } from 'react';
import Task from './Task';
import { useSession } from 'next-auth/react';

export default function TaskList() {
  const { todos, setTodos } = useTodoContext();
  const { data: session } = useSession();

  useEffect(() => {
    async function getTodos() {
      const todos = await fetch(`/api/todos?id=${session?.user?.id}`);
      const todosJson = await todos.json();

      setTodos(todosJson);
    }
    if(!todos && session) {
      getTodos();
    }
  }, [todos, setTodos, session]);

  return (
    <div className="flex-col items-center jus first-line:space-y-3 columns-2xl">
        { todos &&
          todos.map((todo, index) => (
            <Task
              _id={todo._id}
              key={index}
              userId={todo.userId}
              title={todo.title}
              dueDate={todo.dueDate}
              description={todo.description}
              completed={todo.completed}
              priority={todo.priority}
              tags={todo.tags}
              type={todo.type}
            />
          ))
        }
      </div>
  );
}