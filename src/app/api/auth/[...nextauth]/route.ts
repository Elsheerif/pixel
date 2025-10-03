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
                        };
                    } else {
                        throw new Error("Invalid credentials");
                    }
                } catch (error) {
                    console.error("Sign in error:", error);
                    throw new Error("Login failed. Please try again.");
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
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.name = token.name as string;
                session.user.email = token.email as string;
            }
            return session;
        },
    },
});

export { handler as GET, handler as POST };
