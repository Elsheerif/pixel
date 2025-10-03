import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        accessToken: string;
        user: {
            role: string;
        } & DefaultSession["User"];
    }

    interface User {
        id: string;
        name: string;
        email: string;
        accessToken: string;
        role: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        name: string;
        email: string;
        accessToken: string;
        role: string;
    }
}
