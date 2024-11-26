import { authConfig } from '@/app/config/auth.config';
import NextAuth from 'next-auth';

// Read more: https://github.com/vercel/next-learn/tree/main/dashboard/final-example
export default NextAuth(authConfig).auth;

// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
