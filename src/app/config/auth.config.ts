import { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    providers: [
        // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
        // while this file is also used in non-Node.js environments
    ],
    callbacks: {
        authorized({ auth }) {
            const isLoggedIn = !!auth?.user;

            if (isLoggedIn) {
                console.log('User is logged in');
                return true;
            }

            return false;
        },
    },
} satisfies NextAuthConfig;
