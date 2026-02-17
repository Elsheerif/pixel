import { apiServices } from "../../../../services/api";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "someone@gmail.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing email or password");
                }

                try {
                    const response = await apiServices.signIn(credentials.email, credentials.password);

                    if (response && response.message === "success") {
                        return {
                            id: response.user?._id,
                            name: response.user?.name,
                            email: response.user?.email,
                            accessToken: response.token || null,
                            role: response.user?.role || "user"
                        };
                    } else {
                        throw new Error(`API returned: ${response?.message || 'Unknown error'}`);
                    }
                } catch (error) {
                    // Extract the actual error message from the caught error
                    const errorMessage = error instanceof Error ? error.message : "Login failed. Please try again.";
                    throw new Error(errorMessage);
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
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.accessToken = (user as any).accessToken; // Store the API token in JWT
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.name = token.name as string;
                session.user.email = token.email as string;
                (session.user as any).accessToken = token.accessToken; // Add token to session
            }
            return session;
        },
    },
});

export { handler as GET, handler as POST };
