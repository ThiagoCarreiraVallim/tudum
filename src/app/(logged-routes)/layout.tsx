import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '../api/auth/[...nextauth]/helper';

export default async function LoggedLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(nextAuthOptions);

  if(!session) {
    redirect('/login');
  }

  return (
    <>
      {children}
    </>
  )
}