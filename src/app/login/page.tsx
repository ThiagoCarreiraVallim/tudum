'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { SyntheticEvent, useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    })

    if(result?.error) {
      console.log(result.error);
      window.alert('Erro ao fazer login');
      return;
    }
  
    router.push('/menu');
  }

  return (
    <div className='flex justify-center content-center h-screen'>
      <div className={`flex flex-col items-center p-12 pt-28  lg:p-28 content-center bg-slate-300 lg:w-3/6 h-3/6 self-center rounded-xl`}>
        <h2 className={`font-semibold text-gray-800 text-3xl mb-4`}>Bem vindo ao Tudum</h2>
        <form onSubmit={handleSubmit} className='w-72 lg:w-96'>
          <div className="relative">
            <input onChange={(e) => setEmail(e.target.value)} type="email" name='email' className="peer py-3 pe-0 ps-8 block w-full bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 text-sm focus:border-t-transparent focus:border-x-transparent focus:border-b-blue-500 focus:ring-0 disabled:opacity-50 disabled:pointer-events-none dark:border-b-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 dark:focus:border-b-gray-600" placeholder="Email" />
            <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-2 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
              <svg className="flex-shrink-0 w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
          </div>

          <div className="relative">
            <input onChange={(e) => setPassword(e.target.value)} type="password" name='password' className="peer py-3 pe-0 ps-8 block w-full bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 text-sm focus:border-t-transparent focus:border-x-transparent focus:border-b-blue-500 focus:ring-0 disabled:opacity-50 disabled:pointer-events-none dark:border-b-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 dark:focus:border-b-gray-600" placeholder="Senha" />
            <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-2 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
              <svg className="flex-shrink-0 w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z"/><circle cx="16.5" cy="7.5" r=".5"/></svg>
            </div>
          </div>
          <button type="submit" className={`w-full py-3 px-4 mt-5 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-800 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600`} >Login</button>
        </form>  
      </div>
    </div>
  )
}
