import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { nextAuthOptions } from '../api/auth/[...nextauth]/helper';

export default async function LoginLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(nextAuthOptions); 

  if(session) {
    redirect('/menu');
  }

  return (
    <>
      {children}
    </>
  )
}