import { authConfig } from '@/app/config/auth.config';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';

interface User {
    id?: string;
    name?: string | null;
    password?: string | null;
    email?: string | null;
    image?: string | null;
}

async function getUser(email: string, password: string): Promise<User | undefined> {
    try {
        // Add your backend authentication logic here

        // return result from your backend authentication logic
        return { email, password };
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await getUser(email, password);

                    // Enhance you credentials login logic verification here
                    if (user && user.email && user.password) {
                        return user;
                    }

                    // Return null if user data is invalid
                    return null;
                }

                console.log('Invalid credentials');

                return null;
            },
        }),
    ],
});
