import { apiServices } from "../../../../services/api";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { Session, User } from "next-auth";

// =======================
// NextAuth Configuration
// =======================
export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                    placeholder: "someone@gmail.com",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing email or password");
                }

                try {
                    const response = await apiServices.signIn(
                        credentials.email,
                        credentials.password
                    );

                    if (response?.message === "success") {
                        return {
                            id: response.user?._id,
                            name: response.user?.name,
                            email: response.user?.email,
                            role: response.user?.role ?? "user",
                            accessToken: response.token ?? null,
                        };
                    }

                    throw new Error("Invalid credentials");
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
        async jwt({
            token,
            user,
        }: {
            token: JWT;
            user?: User;
        }): Promise<JWT> {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.role = (user as any).role;
                token.accessToken = (user as any).accessToken;
            }
            return token;
        },

        async session({
            session,
            token,
        }: {
            session: Session;
            token: JWT;
        }): Promise<Session> {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.name = token.name as string;
                session.user.email = token.email as string;
                session.user.role = token.role as string;
            }
            session.accessToken = token.accessToken as string;
            return session;
        },
    },
};

// NextAuth handler
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
