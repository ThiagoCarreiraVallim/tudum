import NextAuth from 'next-auth';
import { nextAuthOptions } from './helper';

const handler = NextAuth(nextAuthOptions);

export { 
  handler as GET,
  handler as POST,
}