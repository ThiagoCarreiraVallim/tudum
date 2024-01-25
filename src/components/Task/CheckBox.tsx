'use client';

import { useTodoContext } from '@/context/todoContext';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

type CheckBoxProps = {
  completed: boolean;
  title: string;
  _id: string;
}

export default function CheckBox({ completed, title, _id }: CheckBoxProps) {
  const { data: session } = useSession();
  const { todos, setTodos } = useTodoContext();
  const [checked, setChecked] = useState(completed);

  const handleCheck = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    const todoState = todos!.find(todo => todo._id === _id);
    todoState!.completed = e.target.checked;

    await fetch(`/api/todos`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todoState)
    });

    const updatedTodos = todos!.map(todo => {
      if(todo._id === _id) {
        return todoState!;
      }
      return todo;
    });

    setTodos(updatedTodos);
  }

  return (
    <div className='flex items-center h-7'>
      <input 
        onChange={handleCheck}
        checked={checked}
        id={`hs-checkbox-${title}`} 
        name='hs-checkbox' 
        type='checkbox' 
        className={`w-4 h-4 m-4 border-gray-200 rounded text-green-500 focus:ring-green-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-green-500 dark:checked:border-green-500 dark:focus:ring-offset-green-500`}
        aria-describedby={`hs-checkbox-${title}-description`} />
    </div>
  )
}