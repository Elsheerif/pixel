import { NextResponse } from "next/server";

interface User {
    name: string;
    email: string;
}

const users: User[] = [];

export async function GET() {
    return NextResponse.json({
        message: "success",
        data: users,
    });
}

export async function POST(req: Request) {
    try {
        const body: User = await req.json();

        if (!body.name || !body.email) {
            return NextResponse.json(
                { message: "Name and email are required" },
                { status: 400 }
            );
        }

        users.push(body);

        return NextResponse.json({
            message: "success",
            data: users,
        });
    } catch (error) {
        return NextResponse.json(
            { message: "Invalid request", error },
            { status: 400 }
        );
    }
}
