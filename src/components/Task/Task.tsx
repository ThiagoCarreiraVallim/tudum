'use client';

import { useSession } from 'next-auth/react';
import { Task } from '../../types/task.type';
import CheckBox from './CheckBox';
import { useTodoContext } from '@/context/todoContext';

export default function Task(props: Task) {
  const { data: session } = useSession();
  const { todos, setTodos } = useTodoContext();

  const handleDelete = async () => {
    await fetch('/api/todos', {
      method: 'DELETE',
      body: JSON.stringify({
        _id: props._id,
        userId: session?.user?.id
      })
    });

    setTodos(todos!.filter(todo => todo._id !== props._id));
  }

  return (
    <div className='flex justify-between p-2'>
      <div className='flex '>
        <CheckBox
          _id={props._id}
          completed={props.completed}
          title={props.title}
        />
        <label htmlFor={`hs-checkbox-${props.title}`} className={`ms-3 peer-checked:text-slate-600 peer-checked:line-through ${props.completed && 'line-through'}`}>
          <div className="">
            <div className="pt-0.5">
              <h3 className={`text-wrap gap-x-1.5 font-semibold ${props.completed ? 'text-gray-400' : 'text-gray-800'}`}>
                {props.title}
              </h3>
              {
                props.type === 'complex' && <>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {props.description}
                  </p>
                  <button type="button" className="mt-1 -ms-1 p-1 inline-flex items-center gap-x-2 text-xs rounded-lg border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                    prioridade {props.priority || 0}
                  </button>
                </>
              }
            </div>
            <div>
            {
                props.type === 'complex' && <>
                  {
                    props.tags && 
                    <div className='mt-1'>
                      { 
                        props.tags.map((tag, index) => (
                          <span key={index} title={tag} className="inline-flex items-center gap-x-1.5 py-1.5 ps-3 pe-2 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-500">
                            {tag}
                            <button type="button" className="flex-shrink-0 h-4 w-4 inline-flex items-center justify-center rounded-full hover:bg-blue-200 focus:outline-none focus:bg-blue-200 focus:text-blue-500 dark:hover:bg-blue-900">
                              <span className="sr-only"></span>
                              <svg className="flex-shrink-0 h-3 w-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                            </button>
                          </span>
                        ))
                      }
                    </div>
                  }
                </>
              }
            </div>
          </div>
        </label>
      </div>
      <div className='flex-shrink'>
        <button onClick={handleDelete} type="button" className="text-base ms-2 p-1 gap-x-2 rounded-lg border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
          X
        </button>
      </div>
    </div>
  );
}