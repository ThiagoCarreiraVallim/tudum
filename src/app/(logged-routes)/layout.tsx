import { nextAuthOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

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