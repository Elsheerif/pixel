import { apiServices } from '../../../../services/api';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text', placeholder: 'someone@gmail.com' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Email and password are required');
                }

                try {
                    const response = await apiServices.signIn(credentials.email, credentials.password);
                    if (response?.message === 'success') {
                        return {
                            id: response.user._id || response.user.email, // Prefer _id if available
                            name: response.user.name,
                            email: response.user.email,
                            role: response.user.role || null,
                            token: response.token || null,
                        };
                    }
                    throw new Error('Invalid email or password');
                } catch (error) {
                    console.error('Sign-in error:', error);
                    throw new Error('Authentication failed');
                }
            },
        }),
    ],
    pages: {
        signIn: '/auth/signin',
    },
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ user, token }) {
            if (user) {
                token.accessToken = user.token || null;
                token.role = user.role || null;
            }
            return token;
        },
        async session({ session, token }) {
            if (token.role) {
                session.user.role = token.role;
            }
            if (token.accessToken) {
                session.accessToken = token.accessToken as string;
            }
            return session;
        },
    },
});

export { handler as GET, handler as POST };