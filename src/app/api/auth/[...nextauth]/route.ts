import dbConnect from '@/data/dbConnect';
import User from '@/data/models/User';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

const nextAuthOptions = {
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: "email", type: "text", placeholder: "email" },
        password: {  label: "priorityassword", type: "password" }
      },
      async authorize(credentials, _req) {
        await dbConnect();

        const loginUser = await User.findOne({ email: credentials?.email, password: credentials?.password });
    
        if (loginUser) {
          return loginUser;
        }
        
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/login'
  },
  callbacks: {
    jwt: async ({ token, user }: any) => {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.labels = user.labels;
        token.groups = user.groups;
      }
      return token;
    },
    session: async ({ session, token }: any) => {
      session.user = token;
      return session;
    }
  }
};

const handler = NextAuth(nextAuthOptions);

export { 
  handler as GET,
  handler as POST,
  nextAuthOptions,
}