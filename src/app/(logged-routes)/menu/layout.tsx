import TodoContextProvider from '@/context/todoContext';

export default async function MenuLayout({ children }: { children: React.ReactNode }) {

   return (
    <TodoContextProvider>
      {children}
    </TodoContextProvider>
  )
}