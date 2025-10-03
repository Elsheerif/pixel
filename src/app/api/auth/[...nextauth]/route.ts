import { apiServices } from '../../../../services/api';
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "text", placeholder: "someone@gmail.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }
                try {
                    const response = await apiServices.signIn(credentials.email, credentials.password);
                    console.log(response);
                    if (response && response.message === 'success') {
                        return {
                            id: response.user?._id || "1",
                            name: response.user?.name || "User",
                            email: response.user?.email || credentials.email
                        };
                    } else {
                        return null;
                    }
                } catch (error) {
                    console.error('Sign in error:', error);
                    return null;
                }
            },
        }),
    ],
    pages: {
        signIn: "/auth/signin",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
