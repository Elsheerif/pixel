import { NextResponse } from "next/server";

interface User {
    name: string,
    email: string


}
const users: User[] = []

export async function GET() {

    return NextResponse.json({
        name: "alsherif",
        email: "alsherif @gmail.com"
    }
    )
}

export async function POST(req: Request) {
    const body = await req.json()
    users.push(body)
    return NextResponse.json({
        message: "success",
        data: users

    })

}