'use client';

import { useTodoContext } from '@/context/todoContext';
import { Task } from '@/types/task.type';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function NewTaskForm() {
  const { todos, setTodos } = useTodoContext();
  const { data } = useSession();

  const [task, setTask] = useState<Omit<Task, '_id'>>({
    userId: data?.user.id!,
    title: '',
    dueDate: new Date(),
    description: '',
    completed: false,
    priority: 'medium',
    tags: [],
    type: 'simple'
  });

  const [loading, setLoading] = useState<boolean>(false)

  function handleTaskTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTask({
      ...task,
      title: event.target.value
    })
  }

  async function handleNewTask() {
    setLoading(true)
    console.log(task);
    const res = await fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    });
    const data = await res.json();

    const newTodos = todos ? [...todos, data] : [data];
    setTodos(newTodos);
    setLoading(false)
  }

  return (
    <>
      <input onChange={handleTaskTitleChange} type="text" id="hs-search-box-with-loading-4" name="hs-search-box-with-loading-4" className={`py-3 px-4 block w-full border-gray-200 shadow-sm rounded-s-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600`} placeholder="Nova tarefa" />
      <button onClick={handleNewTask}  type="button" className={`w-14 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-e-md border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 disabled:bg-gray-600`}>
        {
          loading ?
          <span className={`animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-white rounded-full`} role="status" aria-label="loading">
            <span className={`sr-only`}>Loading...</span>
          </span>
          : <>+</>
        }
      </button>
    </>
  );
}