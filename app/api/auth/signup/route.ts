import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { hash } from "bcrypt"

const prisma = new PrismaClient()

export async function POST(request: Request) {
  const { name, email, password } = await request.json()

  if (!email || !password || !name) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 })
  }

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    return NextResponse.json({ error: "User with this email already exists." }, { status: 400 })
  }

  // Hash the password
  const hashedPassword = await hash(password, 10)

  // Create the user
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    return NextResponse.json({ message: "User created successfully." }, { status: 201 })
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json({ error: "Internal server error." }, { status: 500 })
  }
}