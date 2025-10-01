import { apiServices } from '../../../../services/api';
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "text", placeholder: "someone@gmail.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied

                credentials?.email
                credentials?.password

                const response = await apiServices.signIn(credentials?.email ?? "", credentials?.password ?? "")
                console.log(response);
                

                // Any object returned here will be saved in `user` property of the JWT
                return { id: "1", name: "J Smith", email: "jsmith@example.com" }


                // Return null if user data could not be retrieved
                return null
            },
        }),
    ],
    pages: {
        signIn: "/auth/signin", // Optional: custom sign-in page
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
